import { ChildProcess, spawn } from "child_process";
import * as path from "path";
import * as vscode from "vscode";

import { resolvePBinary } from "../../miscTools";
import { Messages } from "./messages";
import { PDiagnostic, parsePDiagnostics } from "./pDiagnostics";

interface Run {
  dir: string;
  child?: ChildProcess;
  cancelled: boolean;
}

// The file in the active editor: part of a P project, a P file outside any
// project, or anything else.
export type ActiveEditor =
  | { kind: "project"; file: string }
  | { kind: "orphan"; file: string }
  | { kind: "other" };

interface ProjectResult {
  diagnostics: Map<string, vscode.Diagnostic[]>;
  failed: boolean;
}

// Runs `p compile` in the background and reports the result as editor
// diagnostics and a status bar item, instead of in a terminal. The full
// compiler output goes to the "P Compiler" output channel, which the status
// bar item shows and hides.
//
// One compile runs at a time. Requested projects wait in a queue; a request
// for the project being compiled restarts it. Every project keeps the errors
// of its last compile, so compiling one leaves the errors of the others.
export default class BackgroundCompiler implements vscode.Disposable {
  private readonly output = vscode.window.createOutputChannel("P Compiler");
  private readonly collection = vscode.languages.createDiagnosticCollection("p");
  private readonly status = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );
  private readonly results = new Map<string, ProjectResult>();
  private queue: string[] = [];
  private current: Run | undefined;
  private pMissing = false;
  private editor: ActiveEditor = { kind: "other" };
  // The P file outside any project reported by the last line of the output.
  private reportedOrphan: string | undefined;

  constructor(toggleOutputCommand: string) {
    this.status.name = "P Compiler";
    this.status.command = toggleOutputCommand;
    this.updateStatus();
  }

  showOutput(): void {
    this.output.show(true);
  }

  // VS Code cannot say whether an output channel is visible, but a visible one
  // is among the visible text editors.
  toggleOutput(): void {
    const visible = vscode.window.visibleTextEditors.some(
      (e) => e.document.uri.scheme === "output" && e.document.uri.path.includes(this.output.name)
    );
    if (visible) {
      this.output.hide();
    } else {
      this.output.show(true);
    }
  }

  compile(projectDirs: string[]): void {
    for (const dir of projectDirs) {
      if (this.current?.dir === dir) {
        this.cancelCurrent();
        this.queue = [dir, ...this.queue.filter((d) => d !== dir)];
      } else if (!this.queue.includes(dir)) {
        this.queue.push(dir);
      }
    }
    void this.pump();
  }

  dispose(): void {
    this.queue = [];
    this.cancelCurrent();
    this.output.dispose();
    this.collection.dispose();
    this.status.dispose();
  }

  private async pump(): Promise<void> {
    if (this.current || this.queue.length === 0) {
      this.updateStatus();
      return;
    }
    const run: Run = { dir: this.queue.shift() as string, cancelled: false };
    this.current = run;
    this.updateStatus();
    await this.run(run);
    if (this.current === run) {
      this.current = undefined;
    }
    await this.pump();
  }

  private cancelCurrent(): void {
    if (this.current) {
      this.current.cancelled = true;
      this.current.child?.kill();
      this.write(`[${path.basename(this.current.dir)}] cancelled\n`);
      this.current = undefined;
    }
  }

  private async run(run: Run): Promise<void> {
    const name = path.basename(run.dir);
    const binary = await resolvePBinary();
    this.pMissing = !binary;
    if (!binary) {
      this.write(`${Messages.Installation.noP}\n`);
      return;
    }
    if (run.cancelled) {
      return;
    }

    this.write(`[${name}] p compile (${run.dir}) at ${new Date().toLocaleTimeString()}\n`);
    let text = "";
    const child = spawn(binary, ["compile"], { cwd: run.dir });
    run.child = child;
    const onData = (chunk: Buffer) => {
      text += chunk.toString();
      this.write(chunk.toString());
    };
    child.stdout?.on("data", onData);
    child.stderr?.on("data", onData);
    const exitCode = await new Promise<number | null>((resolve) => {
      child.on("error", (err) => {
        this.write(`${err}\n`);
        resolve(null);
      });
      child.on("close", resolve);
    });
    if (run.cancelled) {
      return;
    }

    const found = parsePDiagnostics(text);
    const diagnostics = await toVsDiagnostics(found, run.dir);
    if (run.cancelled) {
      return;
    }
    this.results.set(run.dir, { diagnostics, failed: exitCode !== 0 && found.length === 0 });
    this.publish();
  }

  // Merges the errors of every project. A project included by another is
  // compiled as part of both, so identical errors are reported once.
  private publish(): void {
    const merged = new Map<string, Map<string, vscode.Diagnostic>>();
    for (const result of this.results.values()) {
      for (const [uri, list] of result.diagnostics) {
        const forFile = merged.get(uri) ?? new Map<string, vscode.Diagnostic>();
        for (const d of list) {
          forFile.set(`${d.range.start.line}:${d.range.start.character}:${d.message}`, d);
        }
        merged.set(uri, forFile);
      }
    }
    this.collection.clear();
    for (const [uri, forFile] of merged) {
      this.collection.set(vscode.Uri.parse(uri), [...forFile.values()]);
    }
  }

  setActiveEditor(editor: ActiveEditor): void {
    this.editor = editor;
    // Nothing else in the output explains why such a file is not compiled.
    if (editor.kind === "orphan" && editor.file !== this.reportedOrphan) {
      this.write(`${Messages.CompilationStatus.NotInProject(editor.file)}\n`);
      this.reportedOrphan = editor.file;
    }
    this.updateStatus();
  }

  // Every write goes through here, so the orphan report is known to be the
  // last line only until something else is written.
  private write(text: string): void {
    this.reportedOrphan = undefined;
    this.output.append(text);
  }

  private updateStatus(): void {
    // Show the item only for P files and files in a P project.
    if (this.editor.kind === "other") {
      this.status.hide();
      return;
    }

    const summaries = [...this.results].map(([dir, r]) => {
      const count = [...r.diagnostics.values()].reduce((n, l) => n + l.length, 0);
      const result = r.failed ? "failed" : count === 0 ? "ok" : `${count} error${count === 1 ? "" : "s"}`;
      return `${path.basename(dir)}: ${result}`;
    });
    let errors = 0;
    this.collection.forEach((_uri, list) => (errors += list.length));
    const anyFailed = [...this.results.values()].some((r) => r.failed);

    if (this.pMissing) {
      this.status.text = "$(warning) P";
      this.status.tooltip = Messages.Installation.noP;
    } else if (this.editor.kind === "orphan") {
      const file = path.basename(this.editor.file);
      this.status.text = "$(warning) P";
      this.status.tooltip = `P: ${Messages.CompilationStatus.NotInProject(file)}`;
    } else if (this.current) {
      const queued = this.queue.length > 0 ? `, ${this.queue.length} queued` : "";
      this.status.text = "$(sync~spin) P";
      this.status.tooltip = `P: compiling ${path.basename(this.current.dir)}${queued}…`;
    } else if (errors > 0 || anyFailed) {
      this.status.text = errors > 0 ? `$(error) P ${errors}` : "$(error) P";
      this.status.tooltip = ["P", ...summaries].join("\n") + "\n\nClick for compiler output";
    } else if (summaries.length > 0) {
      this.status.text = "$(check) P";
      this.status.tooltip = ["P", ...summaries].join("\n");
    } else {
      this.status.text = "$(question) P";
      this.status.tooltip = "P: not compiled yet";
    }
    this.status.show();
  }
}

async function toVsDiagnostics(
  found: PDiagnostic[],
  cwd: string
): Promise<Map<string, vscode.Diagnostic[]>> {
  const byFile = new Map<string, vscode.Diagnostic[]>();
  for (const d of found) {
    const uri = await resolveFile(d, cwd);
    const range = await wordRangeAt(uri, new vscode.Position(d.line, d.character));
    const diagnostic = new vscode.Diagnostic(range, d.message, vscode.DiagnosticSeverity.Error);
    diagnostic.source = "p";
    const key = uri.toString();
    byFile.set(key, [...(byFile.get(key) ?? []), diagnostic]);
  }
  return byFile;
}

// Type errors carry a path relative to the compile's working directory, which
// may point into an included project (`../Other/PSrc/A.p`). Parse errors only
// name the file, so look it up, preferring the project being compiled.
async function resolveFile(d: PDiagnostic, cwd: string): Promise<vscode.Uri> {
  if (d.kind === "type") {
    return vscode.Uri.file(path.resolve(cwd, d.file));
  }
  const matches = await vscode.workspace.findFiles(`**/${d.file}`);
  const inProject = matches.find((m) => m.fsPath.startsWith(cwd + path.sep));
  return inProject ?? matches[0] ?? vscode.Uri.file(path.join(cwd, d.file));
}

// Underline the whole token rather than a single character.
async function wordRangeAt(uri: vscode.Uri, position: vscode.Position): Promise<vscode.Range> {
  try {
    const document = await vscode.workspace.openTextDocument(uri);
    const range = document.getWordRangeAtPosition(position);
    if (range) {
      return range;
    }
  } catch {
    // Fall through to a single-character range.
  }
  return new vscode.Range(position, position.translate(0, 1));
}

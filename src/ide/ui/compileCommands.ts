import * as path from "path";
import * as vscode from "vscode";
import * as messages from "./messages";

import { ConfigurationConstants } from "../../constants";
import { checkPInstalled, searchDirectory } from "../../miscTools";
import { PCommands } from "../../commands";
import BackgroundCompiler, { ActiveEditor } from "./backgroundCompiler";
import { PProject, affectedProjectDirs, owningProjectDir } from "./pProjects";
import TestingEditor from "./testinginEditor";
import { PDocumentFilter } from "../tools/vscode";

// Compiles the active P project in the background on save and on request.
// The `p-vscode: Compile` task is still provided for tasks.json and Run Task.
export default class CompileCommands {
  // Directory of the project picked in the quick pick, or the first one.
  static currCwd = "";
  // All discovered P projects (one quick-pick entry per .pproj).
  static projects: vscode.QuickPickItem[] = [];
  static options: vscode.QuickPickOptions = {
    title: "Choose the project to compile...",
    canPickMany: false,
    onDidSelectItem: changeCompilationCommand,
  };

  public static async createAndRegister(
    context: vscode.ExtensionContext
  ): Promise<CompileCommands> {
    compiler = new BackgroundCompiler(toggleCompilerOutputCommand);
    await generateProjects();
    createCompileTask();

    // Watching the file system rather than editor saves also picks up
    // changes made outside the editor, such as a git checkout.
    const watcher = vscode.workspace.createFileSystemWatcher("**/*.{p,pproj}");
    const onChange = (uri: vscode.Uri) => scheduleCompile(uri.fsPath);
    const onCreateOrDelete = async (uri: vscode.Uri) => {
      if (uri.fsPath.endsWith(".pproj")) {
        await generateProjects();
      }
      scheduleCompile(uri.fsPath);
    };

    context.subscriptions.push(
      compiler,
      vscode.commands.registerCommand("peasy.showProjectFiles", () => showFiles()),
      vscode.commands.registerCommand("peasy.compile", () => compileActive()),
      vscode.commands.registerCommand(showCompilerOutputCommand, () =>
        compiler?.showOutput()
      ),
      // For the status bar item only, so not in package.json.
      vscode.commands.registerCommand(toggleCompilerOutputCommand, () =>
        compiler?.toggleOutput()
      ),
      watcher,
      watcher.onDidChange(onChange),
      watcher.onDidCreate(onCreateOrDelete),
      watcher.onDidDelete(onCreateOrDelete),
      vscode.window.onDidChangeActiveTextEditor((editor) => {
        updateStatusFile(editor);
        const [file] = activeFile(editor);
        if (file) {
          void compileIfStale(file);
        }
      }),
      {
        dispose: () => clearTimeout(changeDebounce),
      }
    );

    // VS Code restores open editors before activation; treat the active one
    // as just opened.
    const [file] = activeFile();
    if (file) {
      await compileIfStale(file);
    }
    return new CompileCommands();
  }
}

const showCompilerOutputCommand = "peasy.showCompilerOutput";
const toggleCompilerOutputCommand = "peasy.toggleCompilerOutput";
let compiler: BackgroundCompiler | undefined;
let changeDebounce: NodeJS.Timeout | undefined;
let changedFiles: string[] = [];
let pendingMarks: Promise<void>[] = [];

interface CompileSettings {
  onChange: boolean;
  onOpen: boolean;
  includingProjects: boolean;
}

// Read on every use, so changes apply without reloading.
function compileSettings(): CompileSettings {
  const config = vscode.workspace.getConfiguration(ConfigurationConstants.SectionName);
  const keys = ConfigurationConstants.Compile;
  return {
    onChange: config.get<boolean>(keys.OnChange, true),
    onOpen: config.get<boolean>(keys.OnOpen, true),
    includingProjects: config.get<boolean>(keys.IncludingProjects, true),
  };
}

function activeFile(editor = vscode.window.activeTextEditor): string[] {
  const uri = editor?.document.uri;
  return uri?.scheme === "file" ? [uri.fsPath] : [];
}

// Compiles every project affected by `files`: the projects containing them and
// the projects including those.
async function compile(files: string[]): Promise<void> {
  if (!compiler) {
    return;
  }
  const { includingProjects } = compileSettings();
  requestCompile(await affectedProjectDirs(files, knownProjects(), includingProjects));
}

// Compiles the active file's projects. A P file outside any project gets a
// message instead; any other editor compiles the selected project.
async function compileActive(): Promise<void> {
  if (CompileCommands.projects.length === 0) {
    showNoProjects();
    return;
  }
  const active = classifyEditor();
  switch (active.kind) {
    case "project":
      return compile([active.file]);
    case "orphan":
      vscode.window.showErrorMessage(
        messages.Messages.CompilationStatus.NotInProject(path.basename(active.file))
      );
      return;
    case "other":
      requestCompile([CompileCommands.currCwd]);
  }
}

// Projects compiled, or queued to compile, since their sources last changed.
const freshProjects = new Set<string>();

function requestCompile(dirs: string[]): void {
  dirs.forEach((dir) => freshProjects.add(dir));
  compiler?.compile(dirs);
}

// Compiles the project of a file being opened, unless it is up to date.
async function compileIfStale(file: string): Promise<void> {
  if (!compileSettings().onOpen || !file.endsWith(".p")) {
    return;
  }
  const dirs = await affectedProjectDirs([file], knownProjects(), false);
  const stale = dirs.filter((dir) => !freshProjects.has(dir));
  if (stale.length > 0) {
    requestCompile(stale);
  }
}

function knownProjects(): PProject[] {
  return CompileCommands.projects.map((p) => ({
    dir: p.description ?? "",
    pprojPath: path.join(p.description ?? "", p.label),
  }));
}

// A change makes its project stale, and every project including it, whether or
// not they are recompiled right away.
async function markStale(file: string): Promise<void> {
  for (const dir of await affectedProjectDirs([file], knownProjects())) {
    freshProjects.delete(dir);
  }
}

// "Save All" or a git checkout changes many files at once; coalesce them into
// one round of compiles.
function scheduleCompile(file: string): void {
  const marked = markStale(file);
  if (!compileSettings().onChange) {
    return;
  }
  changedFiles.push(file);
  pendingMarks.push(marked);
  clearTimeout(changeDebounce);
  changeDebounce = setTimeout(() => {
    const files = changedFiles;
    const marks = pendingMarks;
    changedFiles = [];
    pendingMarks = [];
    // Mark projects stale before the compile marks them fresh again.
    void Promise.all(marks).then(() => compile(files));
  }, 300);
}

// Lets the user pick the project to compile, or says there is none.
async function showFiles() {
  await generateProjects();
  if (CompileCommands.projects.length === 0) {
    showNoProjects();
  } else {
    const selection = await vscode.window.showQuickPick(
      CompileCommands.projects,
      CompileCommands.options
    );
    if (selection) {
      requestCompile([CompileCommands.currCwd]);
    }
  }
}

// Change the active project WHEN the user selects a different item.
async function changeCompilationCommand(item: vscode.QuickPickItem) {
  const directory = item.description ?? "";
  CompileCommands.currCwd = directory;
  await TestingEditor.updateTestCasesList(directory || "**");
}

// Creates the compile task provider. The task itself uses ShellExecution with
// an explicit `cwd`, so we never interpolate paths into a shell string.
function createCompileTask() {
  const type = PCommands.RunTask;

  vscode.tasks.registerTaskProvider(type, {
    async provideTasks() {
      const p_installed = await checkPInstalled();
      if (!p_installed) {
        vscode.window.showErrorMessage(messages.Messages.Installation.noP);
        const msg = `echo "${messages.Messages.Installation.noP}"`;
        return [
          new vscode.Task(
            { type },
            vscode.TaskScope.Workspace,
            "Run_Report",
            "p-vscode",
            new vscode.ShellExecution(msg)
          ),
        ];
      }

      const cwd = CompileCommands.currCwd || undefined;
      const compileExecution = new vscode.ShellExecution("p", ["compile"], { cwd });
      const problemMatchers = ["$Parse", "$Type"];

      return [
        new vscode.Task(
          { type },
          vscode.TaskScope.Workspace,
          "Compile",
          "p-vscode",
          compileExecution,
          problemMatchers
        ),
      ];
    },
    resolveTask(task: vscode.Task) {
      return task;
    },
  });
}

// Only for commands the user runs. Activation and background compiles stay
// quiet in a workspace without a P project.
function showNoProjects(): void {
  const { CompilationStatus } = messages.Messages;
  vscode.window.showErrorMessage(
    vscode.workspace.workspaceFolders ? CompilationStatus.NoPprojFile : CompilationStatus.NoDirectory
  );
}

// Finds the P projects in the workspace. The first one is active until
// another is picked.
async function generateProjects() {
  const files = (await searchDirectory(path.join("**", "*.pproj"))) ?? [];
  CompileCommands.projects = files.map((f) => ({
    label: path.basename(f.fsPath),
    description: path.dirname(f.fsPath),
  }));
  CompileCommands.currCwd = CompileCommands.projects[0]?.description ?? "";
  updateStatusFile();
}

// Tells the status bar item what the active editor shows. Focusing an output
// channel, such as the compiler output, makes it the active editor; leave the
// item as it is.
function updateStatusFile(editor = vscode.window.activeTextEditor): void {
  if (editor?.document.uri.scheme === "output") {
    return;
  }
  compiler?.setActiveEditor(classifyEditor(editor));
}

function classifyEditor(editor = vscode.window.activeTextEditor): ActiveEditor {
  const [file] = activeFile(editor);
  if (file === undefined) {
    return { kind: "other" };
  }
  if (owningProjectDir(file, knownProjects()) !== undefined) {
    return { kind: "project", file };
  }
  if (editor && vscode.languages.match(PDocumentFilter, editor.document) > 0) {
    return { kind: "orphan", file };
  }
  return { kind: "other" };
}

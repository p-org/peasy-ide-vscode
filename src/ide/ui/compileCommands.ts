import * as path from "path";
import * as vscode from "vscode";
import * as messages from "./messages";

import { checkPInstalled, searchDirectory } from "../../miscTools";
import { PCommands } from "../../commands";
import TestingEditor from "./testinginEditor";

// Runs `p compile` in a task. The working directory is set via ShellExecution's
// `cwd` option rather than baked into the command string, so it works on every
// shell (cmd.exe, PowerShell, bash, zsh) and tolerates paths containing spaces.
export default class CompileCommands {
  // Current project's pproj file name + directory containing the pproj.
  static currProject: [string, string] = ["", ""];
  // Working directory for the active p compile task.
  static currCwd = "";
  // Directory where Stately code is generated for the active project.
  static currStatelyDir = "";
  // File path to surface to the user when the Stately task finishes.
  static pendingStatelyMessage: string | undefined;
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
    await generateProjects();
    createCompileTask();

    context.subscriptions.push(
      vscode.commands.registerCommand("peasy.showProjectFiles", () => showFiles()),
      vscode.commands.registerCommand("peasy.compile", () => runCompileTask()),
      vscode.workspace.onDidDeleteFiles(() => generateProjects()),
      vscode.workspace.onDidCreateFiles(() => generateProjects()),
      // Trigger the compile task on saving P files only
      vscode.workspace.onDidSaveTextDocument(async (e) => {
        if (e.fileName.endsWith(".p")) {
          await runCompileTask();
        }
      }),
      // When the Stately visualization task finishes, surface the path to the
      // generated file via the VS Code UI rather than via a shell `echo`.
      vscode.tasks.onDidEndTask((e) => {
        if (
          e.execution.task.name === "Stately" &&
          CompileCommands.pendingStatelyMessage
        ) {
          vscode.window.showInformationMessage(
            messages.Messages.CompilationStatus.Visualization +
              CompileCommands.pendingStatelyMessage
          );
          CompileCommands.pendingStatelyMessage = undefined;
        }
      })
    );

    return new CompileCommands();
  }
}

async function runCompileTask(): Promise<void> {
  for (const t of await vscode.tasks.fetchTasks({ type: PCommands.RunTask })) {
    if (t.name === "Compile") {
      await vscode.tasks.executeTask(t);
      return;
    }
  }
}

/*
Shows message if there is no need to select a project.
Shows quick pick if there are multiple projects to compile.
*/
async function showFiles() {
  await generateProjects();
  if (CompileCommands.projects.length <= 0) {
    vscode.window.showInformationMessage(
      "There is no alternative P project to select because there is only one P project in the repository."
    );
  } else {
    const selection = await vscode.window.showQuickPick(
      CompileCommands.projects,
      CompileCommands.options
    );
    if (selection) {
      await runCompileTask();
    }
  }
}

// Change the active project WHEN the user selects a different item.
async function changeCompilationCommand(item: vscode.QuickPickItem) {
  const directory = item.description ?? "";
  CompileCommands.currCwd = directory;
  CompileCommands.currProject = [item.label, directory];
  CompileCommands.currStatelyDir = path.join(directory, "PGenerated", "Stately");
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
      const projectName = CompileCommands.currProject[0].replace(".pproj", "");
      const statelyFile = projectName
        ? path.join(CompileCommands.currStatelyDir, `${projectName}.ts`)
        : CompileCommands.currStatelyDir;

      const compileExecution = new vscode.ShellExecution("p", ["compile"], { cwd });
      const statelyExecution = new vscode.ShellExecution(
        "p",
        ["compile", "--mode", "stately"],
        { cwd }
      );
      const problemMatchers = ["$Parse", "$Type"];

      // Surface the path to the generated visualization file via the VS Code
      // UI rather than appending `&& echo ...` to a shell string, which would
      // not be portable to Windows PowerShell 5.1.
      if (statelyFile) {
        CompileCommands.pendingStatelyMessage = statelyFile;
      }

      return [
        new vscode.Task(
          { type },
          vscode.TaskScope.Workspace,
          "Compile",
          "p-vscode",
          compileExecution,
          problemMatchers
        ),
        new vscode.Task(
          { type },
          vscode.TaskScope.Workspace,
          "Stately",
          "p-vscode",
          statelyExecution
        ),
        // Kept for compatibility with the old name used by RelatedErrorView.
        new vscode.Task(
          { type },
          vscode.TaskScope.Workspace,
          "Run_Report",
          "p-vscode",
          statelyExecution,
          problemMatchers
        ),
      ];
    },
    resolveTask(task: vscode.Task) {
      return task;
    },
  });
}

/*
Choose file to compile.
Case 1: No pproj file -> Error window
Case 2: One pproj file -> single project
Case 3: Multiple pproj files -> quick pick shows many lines
*/
async function generateProjects() {
  const files = await searchDirectory(path.join("**", "*.pproj"));
  if (files == null) {
    vscode.window.showErrorMessage(
      messages.Messages.CompilationStatus.NoDirectory
    );
    return;
  }
  if (files.length === 0) {
    vscode.window.showErrorMessage(
      messages.Messages.CompilationStatus.NoPprojFile
    );
    return;
  }

  if (files.length === 1) {
    const first = files[0];
    const fileName = path.parse(first.fsPath).base;
    const directory = path.dirname(first.fsPath);

    CompileCommands.projects = [{ label: fileName, description: directory }];
    CompileCommands.currCwd = directory;
    CompileCommands.currProject = [fileName, directory];
    CompileCommands.currStatelyDir = path.join(directory, "PGenerated", "Stately");
    return;
  }

  CompileCommands.projects = files.map((f) => {
    const fileName = path.parse(f.fsPath).base;
    return { label: fileName, description: path.dirname(f.fsPath) };
  });

  const first = CompileCommands.projects[0];
  CompileCommands.currCwd = first.description ?? "";
  CompileCommands.currProject = [first.label, first.description ?? ""];
  CompileCommands.currStatelyDir = path.join(
    first.description ?? "",
    "PGenerated",
    "Stately"
  );
}

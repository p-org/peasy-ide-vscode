import * as os from "os";
import * as path from "path";
import * as vscode from "vscode";
import * as messages from "./messages";

import { ExtensionConstants } from "../../constants";
import { checkPInstalled, searchDirectory } from "../../miscTools";
import { PCommands } from "../../commands";
import TestingEditor from "./testinginEditor";

// const OutputPathArg = '--output';
//This class runs commands in the terminal based on Compile Command (example: F5 = "p compile")

export default class CompileCommands {
  //Current Command that f5 and save will generate.
  static command: string = "p compile";
  static currProject: [string, string] = ["", ""];
  //All the current P Projects
  static projects: vscode.QuickPickItem[] = [];
  static options: vscode.QuickPickOptions = {
    title: "Choose the project to compile...",
    canPickMany: false,
    onDidSelectItem: changeCompilationCommand,
  };

  public static createAndRegister(
    context: vscode.ExtensionContext
  ): CompileCommands {
    generateProjects();
    createCompileTask();

    vscode.commands.registerCommand("workbench.files", async () => showFiles());

    context.subscriptions.push(
      vscode.workspace.onDidDeleteFiles((e) => generateProjects()),
      vscode.workspace.onDidCreateFiles((e) => generateProjects()),
      // Trigger the compile task on saving P files only
      vscode.workspace.onDidSaveTextDocument(async (e) => {
        if(e.fileName.endsWith(".p")){
          for (var t of await vscode.tasks.fetchTasks()) {
            if (t.name === "Compile") {
              vscode.tasks.executeTask(t);
            }
          }
        }
      })
    );

    return new CompileCommands();
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
    var selection = vscode.window.showQuickPick(
      CompileCommands.projects,
      CompileCommands.options
    );
    selection.then(async (value) => {
      for (var t of await vscode.tasks.fetchTasks()) {
        if (t.name === "Compile") {
          vscode.tasks.executeTask(t);
          return;
        }
      }
    });
  }
}
//Change the command WHEN the user selects a different item.
async function changeCompilationCommand(item: vscode.QuickPickItem) {
  CompileCommands.command = "cd " + item.description + " ; p compile";
  CompileCommands.currProject = [
    item.label,
    item.description + "PGenerated/Stately/",
  ];
  await TestingEditor.updateTestCasesList(item.description ?? "**");
}

// Runs p compile in the terminal.
async function createCompileTask() {
  //Check if P is installed on computer
  const p_installed = await checkPInstalled();
  var type = PCommands.RunTask;
  if (!p_installed) {
    vscode.window.showErrorMessage(messages.Messages.Installation.noP);

    vscode.tasks.registerTaskProvider(type, {
      async provideTasks(token?: vscode.CancellationToken) {
        var msg =
          'echo "' + messages.Messages.Installation.noP + '"';
        var execution = new vscode.ShellExecution(msg);

        //var problemMatchers = ["$Parse", "$Type"];
        //matches errors
        return [
          new vscode.Task(
            { type: type },
            vscode.TaskScope.Workspace,
            "Run_Report",
            "p-vscode",
            execution
            //problemMatchers
          ),
        ];
      },
      resolveTask(task: vscode.Task, token?: vscode.CancellationToken) {
        return task;
      },
    });
  } else {
    //normal p compile task

    vscode.tasks.registerTaskProvider(type, {
      async provideTasks(token?: vscode.CancellationToken) {
        var msg = CompileCommands.command;
        //the command

        var compile_execution = new vscode.ShellExecution(msg);
        var stately_execution = new vscode.ShellExecution(
          msg +
            " --mode stately" +
            '; echo "' +
            messages.Messages.CompilationStatus.Visualization +
            CompileCommands.currProject[1] +
            CompileCommands.currProject[0].replace(".pproj", "") +
            ".ts" +
            '"'
        );
        var problemMatchers = ["$Parse", "$Type"];
        //matches errors
        return [
          new vscode.Task(
            { type: type },
            vscode.TaskScope.Workspace,
            "Compile",
            "p-vscode",
            compile_execution,
            problemMatchers
          ),

          new vscode.Task(
            { type: type },
            vscode.TaskScope.Workspace,
            "Stately",
            "p-vscode",
            stately_execution
            //problemMatchers
          ),
        ];
      },
      resolveTask(task: vscode.Task, token?: vscode.CancellationToken) {
        return task;
      },
    });
  }
}

/*
Choose file to compile.
Case 1: No pproj file -> Error window
Case 2: One pproj file -> command: 'p compile' & quick pick shows single line 
Case 3: Multiple pproj file -> 'p compile -pp ....' & quick pick shows many lines.
*/

/*
This is run WHEN:
-The extension is first activated. 
-File Deletion
-File Creation
*/

//IDEA: only update the files being deleted or created, instead of running this everytime.
async function generateProjects() {
  var files = await searchDirectory(path.join("**", "*.pproj"));
  if (files == null) {
    //No directory to speak of.
    vscode.window.showErrorMessage(
      messages.Messages.CompilationStatus.NoDirectory
    );
    return;
  } else if (files.length == 0) {
    //No pproj files anywhere in the program.
    vscode.window.showErrorMessage(
      messages.Messages.CompilationStatus.NoPprojFile
    );
    return;
  } else {
    //If there is only a single pproj file: Set the command and a single project.
    if (files.length == 1 && files.at(0) != undefined) {
      var fileName = path.parse(files.at(0)?.fsPath!).base;

      if (fileName != undefined) {
        var directory = files.at(0)?.path.replace(fileName, "");
        CompileCommands.projects = [
          { label: fileName, description: directory },
        ];
        CompileCommands.command = "cd " + directory + " ; p compile";

        if (directory != undefined) {
          CompileCommands.currProject = [
            fileName,
            directory + "PGenerated/Stately/",
          ];
        }
      }

      return;
    } else {
      CompileCommands.projects = [];
      for (var f of files) {
        //Add all the file pproj files to the options for the user to choose from.
        var fileName = path.parse(f.fsPath).base;
        if (fileName != undefined) {
          var item: vscode.QuickPickItem = {
            label: fileName,
            description: f.fsPath.replace(fileName, ""),
          };
          CompileCommands.projects.push(item);
        }
      }

      //Set the compile command to the first P project discovered.
      CompileCommands.command =
        "cd " + CompileCommands.projects.at(0)?.description + " ; p compile";
      if (CompileCommands.projects.at(0) != undefined) {
        CompileCommands.currProject = [
          CompileCommands.projects.at(0)?.label || "",
          CompileCommands.projects.at(0)?.description + "PGenerated/Stately/",
        ];
      }
    }
  }
}

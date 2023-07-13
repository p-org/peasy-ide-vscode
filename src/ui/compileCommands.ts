import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';
import * as messages from './messages';


import { ExtensionConstants } from '../constants';
import { searchDirectory } from '../miscTools';
import { PCommands } from '../commands';


// const OutputPathArg = '--output';
//This class runs commands in the terminal based on Compile Command (example: F5 = "p compile")

export default class CompileCommands {
  //Current Command that f5 and save will generate.
  static command: string = 'p compile';
  //All the current P Projects
  static projects: vscode.QuickPickItem[] = [];
  static options: vscode.QuickPickOptions = {title:"Choose the project to compile...", canPickMany:false, onDidSelectItem:changeCompilationCommand};
  
  public static createAndRegister(context:vscode.ExtensionContext): CompileCommands {
    generateProjects();
    createCompileTask();
    vscode.commands.registerCommand('workbench.files', async() => vscode.window.showQuickPick(CompileCommands.projects, this.options))

    context.subscriptions.push(
      vscode.workspace.onDidDeleteFiles(e => generateProjects()),
      vscode.workspace.onDidCreateFiles(e => generateProjects())
    )

    return new CompileCommands();
  }
}

//Change the command WHEN the user selects a different item. 
async function changeCompilationCommand(item: vscode.QuickPickItem) {
  CompileCommands.command = "p compile -pp " + item.description;
}


// Runs p compile in the terminal.
async function createCompileTask() {
  var type = PCommands.RunTask;
  vscode.tasks.registerTaskProvider(type, 
  {
    async provideTasks(token?: vscode.CancellationToken) 
    {
      var msg = CompileCommands.command;
      var execution = new vscode.ShellExecution(msg);
      var problemMatchers = ["$Parse", "$Type"];
      return [
          new vscode.Task({type: type}, vscode.TaskScope.Workspace,
          "Run_Report", "p-vscode", execution, problemMatchers)
      ];
    },
    resolveTask(task: vscode.Task, token?: vscode.CancellationToken) {
        return task;
    }
  });
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
  var files = await searchDirectory("*.pproj");
  if (files == null) {  //No directory to speak of.
    vscode.window.showErrorMessage(messages.Messages.CompilationStatus.NoDirectory);
    return;
  }
  else if (files.length == 0) {                 
    //Top-level of program doesn't have P project files.
    files = await searchDirectory("**/*.pproj")
    if (files == null) {
      vscode.window.showErrorMessage(messages.Messages.CompilationStatus.NoDirectory);
      return;
      
    }
    else if (files.length == 0) { //No pproj files anywhere in the program.
      vscode.window.showErrorMessage(messages.Messages.CompilationStatus.NoPprojFile);
      return;
    }
    //We just want to CHECK if the current compile command has been set yet. 
    else if (files.length == 1 && files.at(0)!=undefined) {
      var projectName = files.at(0)?.fsPath.split('/').at(-1);
      CompileCommands.command = "p compile -pp " + files.at(0)?.path;
      if (projectName != undefined) {
        CompileCommands.projects = [({label:projectName, description: files.at(0)?.fsPath})]
      }
      
      return;
    }
    else {
      CompileCommands.projects = [];
      for (var f of files) {
        //Add all the file pproj files to the options for the user to choose from. 
        var fileName = f.fsPath.split('/').at(-1);
        if (fileName != undefined) {
          var item:vscode.QuickPickItem = {label:fileName, description:f.fsPath};
          CompileCommands.projects.push(item);
        }
      }

      //Set the compile command to the first P project discovered.
      CompileCommands.command = "p compile -pp " + CompileCommands.projects.at(0)?.description;

    }

  }
}





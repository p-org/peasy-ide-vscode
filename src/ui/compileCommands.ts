import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';


import { PCommands, VSCodeCommands} from '../commands';


//Class is DEPRECATED right now. Only keeping in case it becomes useful.
// const OutputPathArg = '--output';
//This class runs commands in the terminal based on Compile Command (example: F5 = "p compile")

export default class CompileCommands {
  public static createAndRegister(): CompileCommands {
    createTask();

    return new CompileCommands();
  }
}

// Runs p compile in the terminal.
async function createTask() {
  var type = "Tasks";
  vscode.tasks.registerTaskProvider(type, {
    provideTasks(token?: vscode.CancellationToken) {
        var execution = new vscode.ShellExecution("p compile");
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




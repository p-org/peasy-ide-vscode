import * as os from 'os';
import * as path from 'path';

import { window, commands} from 'vscode';
import { PCommands, VSCodeCommands} from '../commands';



// const OutputPathArg = '--output';
//This class runs commands in the terminal based on Compile Command (example: F5 = "p compile")
export default class CompileCommands {
  public static createAndRegister(): CompileCommands {
    // installer.context.subscriptions.push(
    //   commands.registerCommand(PCommands.RUN, () => buildOrRun(installer, false, true))
    // );
    commands.registerCommand(PCommands.RUN, () => buildOrRun(false, true));
    return new CompileCommands();
  }
}

async function buildOrRun(useCustomArgs: boolean, run: boolean): Promise<boolean> {
  const document = window.activeTextEditor?.document;
  if(document == null) {
    return false;
  }
  if(document.isUntitled) {
    commands.executeCommand(VSCodeCommands.SAVEAS);
    return false;
  }
  if(!await document.save()) {
    return false;
  }
  const compilerCommand = "p compile";
  if(compilerCommand == null) {
    return false;
  }
  runCommandInTerminal(compilerCommand);
  return true;
}

function runCommandInTerminal(command: string): void {
  const terminal = window.activeTerminal ?? window.createTerminal();
  terminal.show();
  terminal.sendText(command);
}


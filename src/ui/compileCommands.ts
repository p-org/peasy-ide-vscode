import * as os from 'os';
import * as path from 'path';

import { window, commands} from 'vscode';
import { PCommands, VSCodeCommands} from '../commands';



// const OutputPathArg = '--output';
//This class runs commands in the terminal based on Compile Command (example: F5 = "p compile")
export default class CompileCommands {
  public static createAndRegister(): CompileCommands {
    commands.registerCommand(PCommands.RUN, () => compile(false, true));
    return new CompileCommands();
  }
}

// Runs p compile in the terminal.
async function compile(useCustomArgs: boolean, run: boolean): Promise<boolean> {
  const compilerCommand = "p compile";
  if(compilerCommand == null) {
    return false;
  }
  runCommandInTerminal(compilerCommand);
  return true;
}

//Runs the current command in the terminal, outside of the "Errors Task" terminal.
function runCommandInTerminal(command: string): void {
  let terminal = window.activeTerminal ?? window.createTerminal();
  const activeTerminalName = window.activeTerminal?.name;
  if (terminal.name == "Errors") {
    for (let i = 0; i<window.terminals.length; i++) {
      if (window.terminals.at(i)?.name != 'Errors') {
        terminal = window.terminals.at(i) ?? window.createTerminal();
        break;
      }
    }
  }
  terminal.show();
  terminal.sendText(command);
}


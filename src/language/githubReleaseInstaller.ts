import { ExtensionContext, FileSystemError, OutputChannel, Uri, window, workspace } from 'vscode';
import { LanguageServerConstants } from '../constants';
import * as os from 'os';
import fetch from 'cross-fetch';
import * as fs from 'fs';
import { promisify } from 'util';
import { Utils } from 'vscode-uri';
const mkdirAsync = promisify(fs.mkdir);
import { Executable } from 'vscode-languageclient/node';
import { getDotnetExecutablePath } from '../dotnet';
import { PInstaller } from './PInstallation';


export class GitHubReleaseInstaller {
  public constructor(
    public readonly context: ExtensionContext,
    public readonly statusOutput: OutputChannel
  ) {}

  public async getExecutable(server: boolean, newArgs: string[]): Promise<Executable | undefined> {
    const { path: dotnetExecutable } = await getDotnetExecutablePath();
    newArgs.unshift('server');
    const standaloneServerpath = "/Users/esthersu/P/PLanguageServer/bin/Debug/net7.0/PLanguageServer.dll";
    return { command: dotnetExecutable, args: [ standaloneServerpath, ...newArgs ] };
  }



  public async cleanInstallDir(installPath: Uri): Promise<void> {
    this.writeStatus(`deleting previous P installation at ${installPath.fsPath}`);
    try {
      await workspace.fs.delete(
        installPath,
        {
          recursive: true,
          useTrash: false
        }
      );
    } catch(error: unknown) {
      if(!(error instanceof FileSystemError) || error.code !== 'FileNotFound') {
        throw error;
      }
    }
  }





  




  private writeStatus(message: string): void {
    this.statusOutput.appendLine(message);
  }
}

class ProgressReporter {
  private lastTenth = -1;

  public constructor(private readonly statusOutput: OutputChannel) {}

  public updateDownloadProgress(progress: { percent: number, transferred: number }) {
    if(progress.transferred > 0) {
      // The transferred byte count has to be checked since got reports percent=1 at the beginning.
      this.update(progress.percent);
    }
  }

  public update(percent: number) {
    const tenth = Math.round(percent * 10);
    if(tenth > this.lastTenth) {
      this.statusOutput.append(`${tenth * 10}%`);
      if(tenth === 10) {
        this.statusOutput.appendLine('');
      } else {
        this.statusOutput.append('...');
      }
      this.lastTenth = tenth;
    }
  }
}

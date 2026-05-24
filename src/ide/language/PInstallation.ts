import { ExtensionContext, OutputChannel } from 'vscode';
import { Executable } from 'vscode-languageclient/node';

import { GitHubReleaseInstaller } from './githubReleaseInstaller';

export class PInstaller {
  public constructor(
    public readonly context: ExtensionContext,
    public readonly statusOutput: OutputChannel
  ) {}

  public async getCliExecutable(server: boolean, newArgs: string[]): Promise<Executable> {
    const executable = await new GitHubReleaseInstaller(
      this.context,
      this.statusOutput
    ).getExecutable(server, newArgs);
    if (executable) {
      return executable;
    }
    throw new Error(
      'Could not resolve a P language server. Configure "p-vscode.languageServer.cliPath" in settings.'
    );
  }
}

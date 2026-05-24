import { ExtensionContext, FileSystemError, OutputChannel, Uri, workspace } from 'vscode';
import { Executable } from 'vscode-languageclient/node';
import { getDotnetExecutablePath } from '../../dotnet';
import Configuration from '../../configuration';
import { ConfigurationConstants } from '../../constants';

export class GitHubReleaseInstaller {
  public constructor(
    public readonly context: ExtensionContext,
    public readonly statusOutput: OutputChannel
  ) {}

  public async getExecutable(server: boolean, newArgs: string[]): Promise<Executable | undefined> {
    const { path: dotnetExecutable } = await getDotnetExecutablePath();

    const configuredServerPath = Configuration.get<string>(
      ConfigurationConstants.LanguageServer.CliPath,
      ''
    ).trim();
    if (configuredServerPath.length === 0) {
      this.writeStatus(
        'No P language server path configured. Set "p-vscode.languageServer.cliPath" in settings to enable LSP features.'
      );
      return undefined;
    }

    return { command: dotnetExecutable, args: [configuredServerPath, ...newArgs] };
  }

  public async cleanInstallDir(installPath: Uri): Promise<void> {
    this.writeStatus(`deleting previous P installation at ${installPath.fsPath}`);
    try {
      await workspace.fs.delete(installPath, {
        recursive: true,
        useTrash: false,
      });
    } catch (error: unknown) {
      if (!(error instanceof FileSystemError) || error.code !== 'FileNotFound') {
        throw error;
      }
    }
  }

  private writeStatus(message: string): void {
    this.statusOutput.appendLine(message);
  }
}

import { Diagnostic, Uri } from 'vscode';
import { HandleDiagnosticsSignature, LanguageClient, LanguageClientOptions, ServerOptions, TextDocumentPositionParams } from 'vscode-languageclient/node';
import { PDocumentFilter } from '../tools/vscode'
import { PInstaller } from './PInstallation';
import Configuration from '../../configuration';
import { ConfigurationConstants,LanguageConstants } from '../../constants';
import * as os from 'os';


const LanguageServerName = 'P_Language_Server';

function getLanguageServerLaunchArgsNew(): string[] {

  const launchArgs = Configuration.get<string[]>(ConfigurationConstants.LanguageServer.LaunchArgs);
  return [
    ...launchArgs
  ];
}

type DiagnosticListener = (uri: Uri, diagnostics: Diagnostic[]) => void;
export class PLanguageClient extends LanguageClient {

  private constructor(id: string, name: string, serverOptions: ServerOptions, clientOptions: LanguageClientOptions,
    private readonly diagnosticsListeners: DiagnosticListener[], forceDebug?: boolean) {
      
    super(id, name, serverOptions, clientOptions, forceDebug);
    this.diagnosticsListeners = diagnosticsListeners;
  }
        
  public static async create(installer: PInstaller): Promise<PLanguageClient> {
    const exec = await installer.getCliExecutable(true, getLanguageServerLaunchArgsNew());
    console.log("P Language Client");
    console.log(`Language server: ${JSON.stringify(exec)}`);
    const serverOptions: ServerOptions = {
      run: exec,
      debug: exec
    };
    const diagnosticsListeners: ((uri: Uri, diagnostics: Diagnostic[]) => void)[] = [];
    const clientOptions: LanguageClientOptions = {
      documentSelector: [ PDocumentFilter ],
      diagnosticCollectionName: LanguageConstants.LanguageServerId,
      middleware: {
        handleDiagnostics: (uri: Uri, diagnostics: Diagnostic[], next: HandleDiagnosticsSignature) => {
          for(const handler of diagnosticsListeners) {
            handler(uri, diagnostics);                
          }
          next(uri, diagnostics);
        }
      }
    };

    return new PLanguageClient(LanguageConstants.LanguageServerId, LanguageConstants.LanguageServerId, serverOptions, clientOptions, diagnosticsListeners);
  }

  // write a onpublishdiagnostics function
  public onPublishDiagnostics(callback: (uri: Uri, diagnostics: Diagnostic[]) => void): void {
    this.diagnosticsListeners.push(callback);
  }
  
}
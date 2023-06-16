/* eslint-disable max-depth */
import { ExtensionContext, OutputChannel, env, Uri, window } from 'vscode';
import { ConfigurationConstants } from '../constants';
import Configuration from '../configuration';
import { Executable } from 'vscode-languageclient/node';
import { CustomPathInstaller } from './customPathInstaller';
import * as os from 'os';

import { GitHubReleaseInstaller } from './githubReleaseInstaller';


export class PInstaller {

    private readonly customPathInstaller: CustomPathInstaller;

    public constructor(
        public readonly context: ExtensionContext, 
        public readonly statusOutput: OutputChannel
    ) {
        this.customPathInstaller = new CustomPathInstaller(this.context, this.statusOutput);
    }
    
    public async getCliExecutable(server: boolean, newArgs: string[]): Promise<Executable> {

    
        const githubExecutable = await new GitHubReleaseInstaller(this.context, this.statusOutput).getExecutable(server, newArgs);
        if(githubExecutable) {
          return githubExecutable;
        }
    
    
        throw new Error('Could not install a P language server.');
      }

}
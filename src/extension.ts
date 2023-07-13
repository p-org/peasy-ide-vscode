// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import createAndRegisterPIntegration from './ui/pIntegration';
import { PLanguageClient } from './language/PLanguageClient';
import { window } from 'vscode';
import { ExtensionConstants } from './constants';
import { PInstaller } from './language/PInstallation';
import { stat } from 'fs';
import { VSCodeCommands } from './commands';
import { WorkspaceFolder } from 'vscode-languageclient';

let extensionRuntime: ExtensionRuntime | undefined;
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext): Promise<void> {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "P\'s Extension" is live!');


	const statusOutput = window.createOutputChannel(ExtensionConstants.ChannelName);
	context.subscriptions.push(statusOutput);
	extensionRuntime = new ExtensionRuntime(context, statusOutput);
	await extensionRuntime.initialize();
}

// This method is called when your extension is deactivated
export function deactivate() {}




class ExtensionRuntime {
	private client?: PLanguageClient;
	private readonly installer: PInstaller;
	public constructor(
		private readonly context: vscode.ExtensionContext,
		private readonly statusOutput: vscode.OutputChannel) 
	{
		this.installer = new PInstaller(context, statusOutput);
	}

	public async initialize(): Promise<void> {
		//Initialize Runtime
		//await this.startClientAndWaitforVersion();
		createAndRegisterPIntegration(this.installer);
		this.statusOutput.appendLine('P is ready');
	}

	public async startClientAndWaitforVersion() {
		this.client = this.client ?? await PLanguageClient.create(this.installer);
		this.client.start();
		
	}

	public async dispose(): Promise<void> {
		await this.client?.stop();
	  }
}
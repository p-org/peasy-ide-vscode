// The module 'vscode' contains the VS Code extensibility API
import * as vscode from "vscode";
import { window } from "vscode";

import createAndRegisterPIntegration from "./ide/ui/pIntegration";
import { PLanguageClient } from "./ide/language/PLanguageClient";
import { PInstaller } from "./ide/language/PInstallation";
import { ExtensionConstants } from "./constants";

let extensionRuntime: ExtensionRuntime | undefined;

export async function activate(
  context: vscode.ExtensionContext
): Promise<void> {
  const statusOutput = window.createOutputChannel(
    ExtensionConstants.ChannelName
  );
  context.subscriptions.push(statusOutput);

  extensionRuntime = new ExtensionRuntime(context, statusOutput);
  await extensionRuntime.initialize();
}

export async function deactivate(): Promise<void> {
  await extensionRuntime?.dispose();
  extensionRuntime = undefined;
}

class ExtensionRuntime {
  private client?: PLanguageClient;
  private readonly installer: PInstaller;

  public constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly statusOutput: vscode.OutputChannel
  ) {
    this.installer = new PInstaller(context, statusOutput);
  }

  public async initialize(): Promise<void> {
    await createAndRegisterPIntegration(this.installer);
    this.statusOutput.appendLine("P is ready");
  }

  public async startClientAndWaitforVersion(): Promise<void> {
    this.client = this.client ?? (await PLanguageClient.create(this.installer));
    await this.client.start();
  }

  public async dispose(): Promise<void> {
    try {
      await this.client?.stop();
    } catch {
      // ignore — best-effort cleanup on deactivate
    }
  }
}

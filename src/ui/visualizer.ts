import * as vscode from 'vscode';
import { PeasyVizPanel } from '../web/PeasyVizPanel';

//This class creates a web visualizer.
export default class Visualizer {
    public static createAndRegister(context: vscode.ExtensionContext) {
        context.subscriptions.push(
            vscode.commands.registerCommand("peasy-visualizer.run", () => {PeasyVizPanel.createOrShow(context.extensionUri);}));
    }
}
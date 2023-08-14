import * as vscode from "vscode";
import shivizScripts from "./constants/shivizScripts";
import { IShiVizScriptsUri } from "./types/shiviz";
import shivizSourceHtml from "../shivizSourceHtml";
import visualizerErrorHtml from "../visualizerErrorHtml";

export class PeasyVizPanel {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: PeasyVizPanel | undefined;

  public static readonly viewType = "hello-world";

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    if (PeasyVizPanel.currentPanel) {
      PeasyVizPanel.currentPanel._panel.reveal(column);
      PeasyVizPanel.currentPanel._update();
      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      PeasyVizPanel.viewType,
      "Peasy Visualizer",
      column || vscode.ViewColumn.One,
      {
        // Enable javascript in the webview
        enableScripts: true,

        // And restrict the webview to only loading content from our extension's `media` directory.
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, "media"),
          vscode.Uri.joinPath(extensionUri, "out/compiled"),
        ],
      }
    );

    PeasyVizPanel.currentPanel = new PeasyVizPanel(panel, extensionUri);
  }

  public static kill() {
    PeasyVizPanel.currentPanel?.dispose();
    PeasyVizPanel.currentPanel = undefined;
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    PeasyVizPanel.currentPanel = new PeasyVizPanel(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    // Set the webview's initial html content
    this._update();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // // Handle messages from the webview
    // this._panel.webview.onDidReceiveMessage(
    //   (message) => {
    //     switch (message.command) {
    //       case "alert":
    //         vscode.window.showErrorMessage(message.text);
    //         return;
    //     }
    //   },
    //   null,
    //   this._disposables
    // );
  }

  public dispose() {
    PeasyVizPanel.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private async _update() {
    const webview = this._panel.webview;

    this._panel.webview.html = await this._getHtmlForWebview(webview);
    webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "onInfo": {
          if (!data.value) {
            return;
          }
          vscode.window.showInformationMessage(data.value);
          break;
        }
        case "onError": {
          if (!data.value) {
            return;
          }
          vscode.window.showErrorMessage(data.value);
          break;
        }
      }
    });
  }

  private async _getHtmlForWebview(webview: vscode.Webview) {
    /**********************************
     * * Get vscode style scripts URI *
     **********************************/
    const stylesResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media/styles", "reset.css")
    );
    const stylesMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media/styles", "vscode.css")
    );
    const vscodeStylesUri = {
      stylesResetUri,
      stylesMainUri,
    };

    /****************************
     * * Get ShiViz scripts URI *
     ****************************/
    let shivizScriptsUriMap: IShiVizScriptsUri = {};
    for (let shivizScriptGroup in shivizScripts) {
      const { folderPath, files } = shivizScripts[shivizScriptGroup];
      for (let f = 0; f < files.length; f++) {
        const scriptName = files[f];
        shivizScriptsUriMap[scriptName] = webview.asWebviewUri(
          vscode.Uri.joinPath(
            this._extensionUri,
            folderPath,
            `${scriptName}.js`
          )
        );
      }
    }

    /*************************
     * * Get ShiViz css URI *
     *************************/
    const shivizStylesUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this._extensionUri,
        "media/styles/shiviz",
        "style.css"
      )
    );

    /******************************************************************
     * * Let user select json error trace and render appropriate HTML *
     ******************************************************************/
    // Find users opened workspaces
    const workspaces = vscode.workspace.workspaceFolders;

    // Variable holding the error traces
    let errorTraces: any[] = [];

    // If no workspace is found, show warning
    if (workspaces === undefined || workspaces.length <= 0) {
      await vscode.window.showWarningMessage("No workspace found.");
      return "";
    }
    // Get applicable json error trace filename
    else {
      // Get PCheckerOutput directory
      const rootDir = workspaces[0].uri.path;
      const pCheckerOutputDirUri = vscode.Uri.file(`${rootDir}/PCheckerOutput`);

      // Check if user has generated a PCheckerOutput, if not, show warning 
      try {
        vscode.workspace.fs.readDirectory(pCheckerOutputDirUri);
      } catch (error) {
        await vscode.window.showWarningMessage(
          "No P checker output folder found!"
        );
        return "";
      }

      // options for users to select files
      const openDialogOptions: vscode.OpenDialogOptions = {
        canSelectFiles: true,
        canSelectMany: true,
        defaultUri: pCheckerOutputDirUri,
        openLabel: "Open JSON",
        filters: {
          "Error Traces": ["json"],
        },
      };

      // Prompt to open the file window and wait for user to select JSON files
      const files = await vscode.window.showOpenDialog(openDialogOptions);

      // If no files selected, prompt warning message
      if (files?.length === 0) {
        await vscode.window.showInformationMessage(
          "No JSON error trace(s) selected!"
        );
        return "";
      }

      // Read files selected and convert to actual JSON
      for (const file of files || []) {
        const errorTraceJsonLogsUint8Array: Uint8Array =
          await vscode.workspace.fs.readFile(file);
        const errorTrace: any[] = JSON.parse(
          new TextDecoder().decode(errorTraceJsonLogsUint8Array)
        );
        errorTraces.push(errorTrace);
      }
    }

    // If just one error trace log, just make the errorTraces the one error trace selected
    if (errorTraces.length === 1) {
      errorTraces = errorTraces[0];
    }

    // Read and convert the chosen file into string and render the visualizer html
    return shivizSourceHtml(
      shivizScriptsUriMap,
      {
        ...vscodeStylesUri,
        shivizStylesUri,
      },
      JSON.stringify(errorTraces)
    );
  }
}

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

    /******************************************************
     * * Check if file exists and render appropriate HTML *
     ******************************************************/
    let visualizableErrorTraces: string[] = [];
    let bugOutputDirPathname: string = "";
    const workspaces = vscode.workspace.workspaceFolders;
    // If no workspace is found, show error html template with error message
    if (workspaces === undefined || workspaces.length <= 0) {
      await vscode.window.showWarningMessage("No workspace found.");
      return "";
    }
    // Get applicable json error trace filename
    else {
      const rootDir = workspaces[0].uri.path;
      bugOutputDirPathname = `${rootDir}/PCheckerOutput/BugFinding`;
      try {
        const dirFiles = await vscode.workspace.fs.readDirectory(
          vscode.Uri.file(bugOutputDirPathname)
        );
        for (let f = 0; f < dirFiles.length; f++) {
          const filename = dirFiles[f][0];
          const match = filename.match(/\./g);
          // Valid json error trace filenames contain 2 periods and ends with ".trace.json"
          if (match && match.length === 2 && filename.endsWith(".trace.json")) {
            visualizableErrorTraces.push(
              filename.replace(/\.trace\.json$/, "")
            );
          }
        }
      } catch (error) {
        await vscode.window.showWarningMessage(`${error}`);
        return "";
      }
    }

    // If there is no valid json error trace filenames, show error html template with error message
    if (visualizableErrorTraces.length === 0) {
      await vscode.window.showWarningMessage("No json error traces found.");
      return "";
    }

    // If there is valid json error trace filenames, prompt user to choose which one to visualize
    const errorTraceSelected = await vscode.window.showInformationMessage(
      "Which file do you want to visualize?",
      ...visualizableErrorTraces
    );
    // Read and convert the chosen file into string and render the visualizer html
    const errorTraceJsonLogsUint8Array: Uint8Array =
      await vscode.workspace.fs.readFile(
        vscode.Uri.file(
          `${bugOutputDirPathname}/${errorTraceSelected}.trace.json`
        )
      );
    const errorTraceJsonLogsString: string = new TextDecoder().decode(
      errorTraceJsonLogsUint8Array
    );
    return shivizSourceHtml(
      shivizScriptsUriMap,
      {
        ...vscodeStylesUri,
        shivizStylesUri,
      },
      errorTraceJsonLogsString
    );
  }
}

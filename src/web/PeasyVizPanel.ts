import * as vscode from "vscode";
// import { getNonce } from "./getNounce";
import shivizScripts from "./constants/shivizScripts";
import { IShiVizScriptsUri } from "./types/shiviz";
import shivizSourceHtml from "../shivizSourceHtml";

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
        // case "report": {
        //   const message = await vscode.window.showInputBox({
        //     placeHolder: "why are you reporting this user?",
        //   });
        //   if (message) {
        //     await mutationNoErr(`/report`, { message, ...data.value });
        //     webview.postMessage({
        //       command: "report-done",
        //       data,
        //     });
        //     vscode.window.showInformationMessage("Thank you for reporting!");
        //   }
        //   break;
        // }
        // case "set-window-info": {
        //   const { displayName, flair } = data.value;
        //   this._panel.title = displayName;
        //   if (flair in flairMap) {
        //     const both = vscode.Uri.parse(
        //       `https://flair.benawad.com/` +
        //         flairMap[flair as keyof typeof flairMap]
        //     );
        //     this._panel.iconPath = {
        //       light: both,
        //       dark: both,
        //     };
        //   }
        //   break;
        // }
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
        // case "tokens": {
        //   await Util.globalState.update(accessTokenKey, data.accessToken);
        //   await Util.globalState.update(refreshTokenKey, data.refreshToken);
        //   break;
        // }
      }
    });
  }

  private async _getHtmlForWebview(webview: vscode.Webview) {
    // And the uri we use to load this script in the webview
    // const scriptUri = webview.asWebviewUri(
    //   vscode.Uri.joinPath(this._extensionUri, "media", "main.js")
    // );

    // Uri to load styles into webview
    const stylesResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media/styles", "reset.css")
    );
    const stylesMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media/styles", "vscode.css")
    );
    // const cssUri = webview.asWebviewUri(
    //   vscode.Uri.joinPath(this._extensionUri, "out", "compiled/swiper.css")
    // );

    // console.log(stylesMainUri);

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

    /**************************
     * * Check if file exists *
     **************************/
    // const workspaces = vscode.workspace.workspaceFolders;
    // if (workspaces === undefined || workspaces.length <= 0) {
    //   console.log("No workspace found!");
    // } else {
    //   let errorTraceLogPathname: string = "";
    //   const rootDir = workspaces[0].uri.path;
    //   const dirFiles = await vscode.workspace.fs.readDirectory(
    //     vscode.Uri.file(`${rootDir}/PCheckerOutput/BugFinding`)
    //   );
    //   for (let f = 0; f < dirFiles.length; f++) {
    //     const filename = dirFiles[f][0];
    //     const match = filename.match(/\./g);
    //     if (match && match.length === 1 && filename.endsWith(".txt")) {
    //       errorTraceLogPathname = `${rootDir}/PCheckerOutput/BugFinding/${filename}`;
    //       console.log("here");
    //     }
    //   }
    //   const errorTraceLogUint8Array = await vscode.workspace.fs.readFile(
    //     vscode.Uri.file(errorTraceLogPathname)
    //   );
    //   const errorTraceLog = new TextDecoder().decode(errorTraceLogUint8Array);
    // }

    // Use a nonce to only allow specific scripts to be run
    // const nonce = getNonce();

    // return `<!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <!--
    //             Use a content security policy to only allow loading images from https or from our extension directory,
    //             and only allow scripts that have a specific nonce.
    //         -->
    //         <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <link href="${stylesResetUri}" rel="stylesheet">
    //         <link href="${stylesMainUri}" rel="stylesheet">
    //         <script nonce="${nonce}">
    //         </script>
    //         <style type="text/css">
    //           .anchor-tag {
    //             color: lightblue;
    //             text-decoration: none;
    //           }
    //         </style>
    //     </head>
    //     <body>
    //         <h1>Hello World</h1>
    //         <input />
    //         <button>Hello </button>
    //         <a href="http://en.wikipedia.org/wiki/Directed_acyclic_graph" class="anchor-tag">Testing Anchor Tag</a>
    //     </body>
    //     <script src="${scriptUri}" nonce="${nonce}"></script>
    //     </html>`;

    return shivizSourceHtml(shivizScriptsUriMap, {
      shivizStylesUri,
      stylesResetUri,
      stylesMainUri,
    });
  }
}

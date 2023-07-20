import * as vscode from "vscode";

export interface IShiVizScriptInfo {
  folderPath: string;
  files: string[];
}

export interface IShiVizScripts {
  [key: string]: IShiVizScriptInfo;
}

export interface IShiVizScriptsUri {
  [key: string]: vscode.Uri;
}

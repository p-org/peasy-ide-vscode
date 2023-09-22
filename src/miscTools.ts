import * as vscode from "vscode";

//Searches the current file directory for a specific pattern string and returns all files that match the pattern
export async function searchDirectory(pattern: string) {
  var files = null;
  if (vscode.workspace.workspaceFolders !== undefined) {
    const folder = vscode.workspace.workspaceFolders[0].uri;
    let filePattern: vscode.RelativePattern = new vscode.RelativePattern(
      folder,
      pattern
    );
    var excludeFolders: Array<string> = vscode.workspace.getConfiguration("p-vscode").get("pcompile.exclude") || ["**/Build/*", "**/build/**"];
    let excludeFilePattern = excludeFolders.length > 1 ? "{" + excludeFolders.join(',') + "}" : excludeFolders.join('');
    files = await vscode.workspace.findFiles(filePattern, excludeFilePattern);
  }
  return files;
}

//Check if P is installed by searching in .dotnet/tools directory
export async function checkPInstalled(): Promise<boolean> {
  try {
    const homedir = require('os').homedir();
    var filePath = homedir + "/.dotnet/tools";
    
    var uri: vscode.Uri = vscode.Uri.file(filePath);
    var files: [string, vscode.FileType][] =
      await vscode.workspace.fs.readDirectory(uri);
    //turn arrays into JSON to check if the P executable exists inside of the file directory
    var jsonFiles = JSON.stringify(files);
    var jsonPFile = JSON.stringify(["p", vscode.FileType.File]);
    if (jsonFiles.indexOf(jsonPFile) !== -1) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }

  return false;
}

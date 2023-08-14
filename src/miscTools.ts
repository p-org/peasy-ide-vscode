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
    files = await vscode.workspace.findFiles(filePattern);
  }
  return files;
}

//Check if P is installed by searching in .dotnet/tools directory
export async function checkPInstalled(): Promise<boolean> {
  var workspaceFile = await vscode.workspace.workspaceFolders
    ?.at(0)
    ?.uri.fsPath.split("/")
    .filter((obj) => {
      return obj !== "";
    });
  if (workspaceFile?.at(0) !== undefined && workspaceFile.at(1) !== undefined) {
    var filePath = workspaceFile[0] + "/" + workspaceFile[1] + "/.dotnet/tools";
    var uri: vscode.Uri = vscode.Uri.file(filePath);
    try {
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
  }

  return false;
}

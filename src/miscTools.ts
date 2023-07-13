import * as vscode from 'vscode';

//Searches the current file directory for a specific pattern string and returns all files that match the pattern
export async function searchDirectory(pattern: string) {
    var files = null;
    if (vscode.workspace.workspaceFolders !== undefined) 
    {
        const folder = vscode.workspace.workspaceFolders[0].uri
        let filePattern: vscode.RelativePattern = new vscode.RelativePattern(folder,pattern )
        files = await vscode.workspace.findFiles(filePattern)
    }
    return files;

}
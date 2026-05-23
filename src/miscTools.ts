import * as vscode from "vscode";
import * as path from "path";
import * as which from "which";

import { ConfigurationConstants } from "./constants";

// Searches the current workspace for files matching a glob pattern and returns
// the matching URIs. Honours the user's `p-vscode.pcompile.exclude` setting.
export async function searchDirectory(pattern: string) {
  if (vscode.workspace.workspaceFolders === undefined) {
    return null;
  }
  const folder = vscode.workspace.workspaceFolders[0].uri;
  pattern = pattern.replace(folder.fsPath, "");
  const filePattern = new vscode.RelativePattern(folder.fsPath, pattern);

  const excludeFolders: Array<string> =
    vscode.workspace
      .getConfiguration(ConfigurationConstants.SectionName)
      .get<string[]>(ConfigurationConstants.Compile.Exclude) ?? [
      "**/Build/*",
      "**/build/**",
    ];
  const excludeFilePattern =
    excludeFolders.length > 1
      ? "{" + excludeFolders.join(",") + "}"
      : excludeFolders.join("");

  return await vscode.workspace.findFiles(filePattern, excludeFilePattern);
}

// Check if `p` is installed by resolving it on PATH. Works the same on Linux,
// macOS and Windows without going through a user shell.
export async function checkPInstalled(): Promise<boolean> {
  try {
    await which("p");
    return true;
  } catch {
    return false;
  }
}

// Convenience: resolve the absolute path to the `p` binary, or undefined.
export async function resolvePBinary(): Promise<string | undefined> {
  try {
    return await which("p");
  } catch {
    return undefined;
  }
}

// Re-export `path.join` style helpers if downstream callers want them.
export const joinPath = path.join;

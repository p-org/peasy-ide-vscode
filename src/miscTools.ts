import * as vscode from "vscode";
import * as os from "os";
import * as path from "path";
import which = require("which");

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

// PATH entries such as `~/.dotnet/tools` (written verbatim by the macOS dotnet
// installer into /etc/paths.d) are expanded by interactive shells but not by
// `which` or `child_process.spawn`, so expand a leading `~` ourselves.
export function expandedSearchPath(): string {
  const home = os.homedir();
  return (process.env["PATH"] ?? "")
    .split(path.delimiter)
    .map((entry) =>
      entry === "~" || entry.startsWith("~/") ? home + entry.slice(1) : entry
    )
    .join(path.delimiter);
}

export async function resolveExecutable(name: string): Promise<string | undefined> {
  try {
    return await which(name, { path: expandedSearchPath() });
  } catch {
    return undefined;
  }
}

export async function resolvePBinary(): Promise<string | undefined> {
  return resolveExecutable("p");
}

// Re-export `path.join` style helpers if downstream callers want them.
export const joinPath = path.join;

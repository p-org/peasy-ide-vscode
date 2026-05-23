import * as vscode from "vscode";

// Triggers the "Run_Report" task when P sources change so that diagnostics
// stay up to date. The watchers are created during activation and disposed
// via the extension's subscriptions list.
export default class RelatedErrorView {
  private static instance: RelatedErrorView | undefined;

  // Debounce so we don't kick off a fresh compile on every keystroke.
  private static refreshTimer: NodeJS.Timeout | undefined;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static createAndRegister(
    context: vscode.ExtensionContext
  ): RelatedErrorView {
    if (RelatedErrorView.instance) {
      return RelatedErrorView.instance;
    }
    RelatedErrorView.instance = new RelatedErrorView();

    const watcherP = vscode.workspace.createFileSystemWatcher(
      "**/*.p",
      false,
      false,
      false
    );
    const watcherPproj = vscode.workspace.createFileSystemWatcher(
      "**/*.pproj",
      false,
      false,
      false
    );

    const trigger = () => RelatedErrorView.scheduleRefresh();
    context.subscriptions.push(
      watcherP,
      watcherPproj,
      watcherP.onDidChange(trigger),
      watcherPproj.onDidChange(trigger),
      // Cancel any pending debounced refresh on deactivation so we don't
      // execute a task after the extension has torn down.
      {
        dispose: () => {
          if (RelatedErrorView.refreshTimer) {
            clearTimeout(RelatedErrorView.refreshTimer);
            RelatedErrorView.refreshTimer = undefined;
          }
        },
      }
    );

    // Initial refresh so existing workspaces get diagnostics on activation
    // without requiring a file change first.
    RelatedErrorView.scheduleRefresh();

    return RelatedErrorView.instance;
  }

  private static scheduleRefresh(): void {
    if (RelatedErrorView.refreshTimer) {
      clearTimeout(RelatedErrorView.refreshTimer);
    }
    RelatedErrorView.refreshTimer = setTimeout(() => {
      RelatedErrorView.refreshTimer = undefined;
      void RelatedErrorView.refreshRelatedErrors();
    }, 500);
  }

  public static async refreshRelatedErrors(): Promise<void> {
    for (const t of await vscode.tasks.fetchTasks({ type: "Run_Report" })) {
      if (t.name === "Run_Report") {
        await vscode.tasks.executeTask(t);
        return;
      }
    }
  }
}

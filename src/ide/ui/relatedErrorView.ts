import * as vscode from 'vscode';
import { PLanguageClient } from '../language/PLanguageClient';


//This class helps create error messages when you hover over error squiggles. 

const RelatedErrorDecoration: vscode.DecorationRenderOptions = {
    // Normal error: #F14C4C
    // Normal warning: #CCA700
    // The color below is the average of the two
    dark: {
      textDecoration: 'underline wavy #000000 1px'
    },
    // Normal error: #E83120
    // Normal warning: #BF8803
    // The color below is the average of the two
    light: {
      textDecoration: 'underline wavy #000000 1px'
    }
  };

  interface IRelatedErrorView {
    ranges: Range[];
  }

export default class RelatedErrorView {
    private readonly relatedViewByDocument = new Map<string, IRelatedErrorView>();
    static watcherP: any = vscode.workspace.createFileSystemWatcher("**/*.p", false, false, false);;
    static watcher_pproj: any = vscode.workspace.createFileSystemWatcher("**/*.pproj", false, false, false);;
    
    private constructor() {
    }
    private static instance: RelatedErrorView;

    public static createAndRegister(context: vscode.ExtensionContext): RelatedErrorView {
        RelatedErrorView.instance = new RelatedErrorView();
        
        context.subscriptions.push(
            //adds errors
            this.watcherP.onDidChange(async () => await RelatedErrorView.refreshRelatedErrors()),
            this.watcher_pproj.onDidChange(async () => await RelatedErrorView.refreshRelatedErrors()),
            RelatedErrorView.instance
        );
        RelatedErrorView.refreshRelatedErrors();
        return RelatedErrorView.instance;
    }


    public static async refreshRelatedErrors(): Promise<void> {
      for (var t of await vscode.tasks.fetchTasks()) {
        if (t.name === "Run_Report") {
          var exec: vscode.TaskExecution = await vscode.tasks.executeTask(t);

        }
      }
    }

    public clearRelatedErrors(documentPath: string): void {
        this.relatedViewByDocument.delete(documentPath);
    }

    public dispose(): void {
      //not sure what to place here
    }
}
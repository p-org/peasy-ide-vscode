import * as vscode from 'vscode';
import { PLanguageClient } from '../language/PLanguageClient';
import { getVsDocumentPath } from '../tools/vscode';

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
    private readonly errorDecoration = vscode.window.createTextEditorDecorationType(RelatedErrorDecoration);
    private readonly relatedViewByDocument = new Map<string, IRelatedErrorView>();

    private constructor() {}
    private static instance: RelatedErrorView;

    public static createAndRegister(context: vscode.ExtensionContext): RelatedErrorView {
        RelatedErrorView.instance = new RelatedErrorView();
        
        context.subscriptions.push(
            //adds errors
            vscode.window.onDidChangeActiveTextEditor(editor => RelatedErrorView.instance.refreshRelatedErrors()),
            RelatedErrorView.instance
        );
        RelatedErrorView.instance.updateRelatedErrors();
        return RelatedErrorView.instance;
    }

    public updateRelatedErrors(): void {
      var scope: any;
      if (vscode.workspace.workspaceFolders === undefined) {
        scope = vscode.TaskScope.Workspace;
      }
      else {
        scope = vscode.workspace.workspaceFolders[0];
      }
      var t: vscode.Task = new vscode.Task (
        {type: 'shell'}, // this is the same type as in tasks.json
        scope , // The workspace folder
        'Errors', // how you name the task
        'MyTask', // Shows up as MyTask: name 
        new vscode.ShellExecution("p compile"),
        ["Type", "Parse"] // list of problem matchers (can use $gcc or other pre-built matchers, or the ones defined in package.json)
      );
      t.presentationOptions.echo = false;
      t.presentationOptions.focus = true;
      t.presentationOptions.reveal = vscode.TaskRevealKind.Never;
      var tasks: Array<vscode.Task> = [];
      tasks.push(t);
      vscode.tasks.registerTaskProvider('Errors', {
        provideTasks: () => {
          return tasks;
        },
        resolveTask(_task: vscode.Task): vscode.Task | undefined {
          // as far as I can see from the documentation this just needs to return undefined.
          return undefined;
        }
      });
      this.refreshRelatedErrors();
    }

    public async refreshRelatedErrors(): Promise<void> {
      for (var t of await vscode.tasks.fetchTasks()) {
        if (t.name === "Errors") {
          vscode.tasks.executeTask(t);
          vscode.tasks.onDidEndTask
        }
      }
      console.log("No Errors Task");
    }

    public clearRelatedErrors(documentPath: string): void {
        this.relatedViewByDocument.delete(documentPath);
    }

    public dispose(): void {
    this.errorDecoration.dispose();
    }
}
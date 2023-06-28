import * as vscode from 'vscode';
import { ExtensionConstants } from '../constants';
export default class TestingEditor {
    static instance: TestingEditor;
    static controller = vscode.tests.createTestController('pTestController', 'P Tests');
    static testRe = /test/g;
  

    public static async createAndRegister(context: vscode.ExtensionContext) : Promise<TestingEditor> {
        context.subscriptions.push(TestingEditor.controller);
        var content =  vscode.window.activeTextEditor?.document.getText()
        if (content !== undefined) {
            updateFromContents(TestingEditor.controller, content );
        }
        context.subscriptions.push(
            // vscode.workspace.onDidOpenTextDocument(() => updateNodeFromDocument(vscode.window.activeTextEditor?.document))
        )
        return TestingEditor.instance;
    }

}

function updateFromContents(controller: vscode.TestController, content: string) {
    parsePTestFile(content, {
        onTest: (name, range) => {
            const tCase = controller.createTestItem(range.start.line.toString(), name, vscode.Uri.file("/Users/esthersu/P-esther/Tutorial/4_FailureDetector/PTst/TestScript.p"));
            tCase.range = range;
            controller.items.add(tCase);
        }
    })
    if (controller.items.size>0) {
        const runProfile = controller.createRunProfile(
            'Run',
            vscode.TestRunProfileKind.Run,
            (request, token) => {runHandler(request, token);}
        )
    }
}

function parsePTestFile(text: string, 
    events: {
        onTest(name: string, range: vscode.Range): void
        }) 
{
    const lines = text.split('\n');

    for (let lineNo = 0; lineNo < lines.length; lineNo++) {
        const line = lines[lineNo];
        const test = TestingEditor.testRe.exec(line);
        if (test) {
            const range = new vscode.Range(new vscode.Position(lineNo, 0), new vscode.Position(lineNo, 0));
            const words = line.split(' ');
            events.onTest(words[1], range);
            continue;
        }

    }
}

async function runHandler (request: vscode.TestRunRequest, token: vscode.CancellationToken)
 {
    const run = TestingEditor.controller.createTestRun(request);
    const queue: vscode.TestItem[] = [];


    if (request.include) {
        request.include.forEach(test => queue.push(test));
    }

    while (queue.length >0) {
        const test = queue.pop()!;
        run.started(test);
        await runPTestCase(test);
        run.passed(test);
    }
    run.end();
}

//Runs a test case of P.
async function runPTestCase(tc: vscode.TestItem) {
    let terminal = vscode.window.activeTerminal ?? vscode.window.createTerminal();
    if (terminal.name == ExtensionConstants.RunTask) {
        for (let i = 0; i<vscode.window.terminals.length; i++) {
          if (vscode.window.terminals.at(i)?.name != ExtensionConstants.RunTask) {
            terminal = vscode.window.terminals.at(i) ?? vscode.window.createTerminal();
            break;
          }
        }
      }
    terminal.show();
    const command = "p check -tc " + tc.label + " -i 1000";
    terminal.sendText(command);
}


function updateNodeFromDocument(e: vscode.TextDocument) {
    if (e.uri.scheme !== 'file') {
        return;
    }
    if (!e.uri.path.endsWith('.p')) {
        return;
    }
    const file = getFile(e.uri);
}


//If the Testing File already exists, return the file. If it doesn't, add it to the TestController and then return the file. 
function getFile(uri: vscode.Uri) {
    const existing = TestingEditor.controller.items.get(uri.toString());
	if (existing) {
		return existing;
	}
    const file = TestingEditor.controller.createTestItem(uri.toString(), uri.path.split('/').pop()!, uri);
    TestingEditor.controller.items.add(file);
    file.canResolveChildren = true;
    return file;
}





export class TestFile {


    parsePTestFile(text: string, events: {
            onTest(name: string, range: vscode.Range): void
            }) 
    {
        const lines = text.split('\n');
    
        for (let lineNo = 0; lineNo < lines.length; lineNo++) {
            const line = lines[lineNo];
            const test = TestingEditor.testRe.exec(line);
            if (test) {
                const range = new vscode.Range(new vscode.Position(lineNo, 0), new vscode.Position(lineNo, 0));
                const words = line.split(' ');
                events.onTest(words[1], range);
                continue;
            }
    
        }
    }
}

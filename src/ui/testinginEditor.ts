import * as vscode from 'vscode';
import { ExtensionConstants, TestResults } from '../constants';
const fs = require('fs');

export default class TestingEditor {
    static instance: TestingEditor;
    static controller = vscode.tests.createTestController('pTestController', 'P Tests');
    static testRe = /^\s*test/g;
  

    public static async createAndRegister(context: vscode.ExtensionContext) : Promise<TestingEditor> {
        context.subscriptions.push(TestingEditor.controller);
        // var content =  vscode.window.activeTextEditor?.document.getText()
        // var uri = vscode.window.activeTextEditor?.document.uri
        // if (content !== undefined && uri !== undefined) {
        //     updateFromContents(TestingEditor.controller, content, uri);
        // }
        context.subscriptions.push(
            vscode.workspace.onDidChangeTextDocument(e => updateNodeFromDocument(e.document)),
            vscode.workspace.onDidOpenTextDocument(e => updateNodeFromDocument(e) )
        )

        for (const document of vscode.workspace.textDocuments) {
            updateNodeFromDocument(document);
            
        }
        return TestingEditor.instance;
    }

}

function updateFromContents(controller: vscode.TestController, content: string, uri: vscode.Uri, item: vscode.TestItem) {
    parsePTestFile(content, {
        onTest: (name, range) => {
            const tCase = controller.createTestItem(range.start.line.toString(), name, uri);
            tCase.range = range;
            item.children.add(tCase);
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

//Parses a P test file, looking for 'Test Items'
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
            const words = line.split('test ')[1].split(" ");
            events.onTest(words[0], range);
            continue;
        }

    }
}

//Handles running a Test Run Request
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
        await handlePTestCase(run, test);
        
    }
    run.end();
    const dog = 2
}

//If the Test Item is a file: run its children. Else: Run the test case.
async function handlePTestCase(run: vscode.TestRun, tc: vscode.TestItem) {
    if (tc.parent == undefined) {
        tc.children.forEach(item => runPTestCase(run, item))
    }
    else {
        runPTestCase(run, tc);
    }
}

//Always runs a single P Test Case.
async function runPTestCase(run: vscode.TestRun, tc: vscode.TestItem) {
    var result = TestResults.Error;
    let terminal = vscode.window.activeTerminal ?? vscode.window.createTerminal();
    if (terminal.name == ExtensionConstants.RunTask) {
        for (let i = 0; i<vscode.window.terminals.length; i++) {
          if (vscode.window.terminals.at(i)?.name != ExtensionConstants.RunTask) {
            terminal = vscode.window.terminals.at(i) ?? vscode.window.createTerminal();
            break;
          }
        }
        if (terminal.name == ExtensionConstants.RunTask) {
            terminal = vscode.window.createTerminal();
        }
      }
    //Sends P Check command through the terminal
    terminal.show();
    const outputDirectory = "PCheckerOutput/" + tc.label
    var outputFile = outputDirectory + "/check.log";
    if (vscode.workspace.workspaceFolders !== undefined) {
        const outputName = vscode.workspace.workspaceFolders[0].uri.path + "/" +  outputFile;
        if (!fs.existsSync(outputName)) {
            fs.writeFile(outputName, '', function (err: any) {
                if (err) throw err;
            })
        }
    }
    const command = "p check -tc " + tc.label + " -o " + outputDirectory + " -i 1000 |& tee " + outputFile;
    terminal.sendText(command);

    if (vscode.workspace.workspaceFolders !== undefined) {
        const outputName = vscode.workspace.workspaceFolders[0].uri.path + "/" +  outputFile;
        const contents = (await vscode.workspace.openTextDocument(vscode.Uri.file(outputName))).getText();
        if (contents.includes("Found 0 bugs")) {
            result= TestResults.Pass;
        }
        else if (contents.includes("found a bug")) {
            result= TestResults.Fail;
        }
    }
    
    switch (result) {
        case TestResults.Pass: {
            run.passed(tc);
            break;
        }
        case TestResults.Fail: {
            var msg =  new vscode.TestMessage("Failure after P Check Command")
            run.failed(tc, msg);
            break;
        }
        case TestResults.Error: {
            run.errored;
        }
    }
    return;
}


function updateNodeFromDocument(e: vscode.TextDocument) {
    const name = e.fileName.split("/").at(-1);
    if (name ==undefined || !name.startsWith("Test")) {
        return;
    }
    if (e.uri.scheme !== 'file') {
        return;
    }
    if (!e.uri.path.endsWith('.p')) {
        return;
    }
    const file = getFile(e.uri);
    updateFromContents(TestingEditor.controller, e.getText(), e.uri, file); 
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
                const words = line.split('\s+');
                events.onTest(words[1], range);
                continue;
            }
    
        }
    }
}

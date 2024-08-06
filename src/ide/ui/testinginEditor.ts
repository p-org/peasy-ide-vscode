import * as vscode from "vscode";
import {
  TestResults,
} from "../../constants";
import * as messages from "./messages";
import { checkPInstalled, searchDirectory } from "../../miscTools";
import * as child_process from "child_process";
import * as path from "path";

export default class TestingEditor {
  static instance: TestingEditor;
  static controller = vscode.tests.createTestController(
    "pTestController",
    "P Tests"
  );
  static testRe = /^\s*test\s/g;
 
  public static async createAndRegister(
    context: vscode.ExtensionContext
  ): Promise<TestingEditor> {
    context.subscriptions.push(TestingEditor.controller);
    context.subscriptions.push(
      /*
            CHANGE Text Document => Update the parsing of a Test File
            DELETE or CREATE a Text Document => Update parsing of Test File

            */
      vscode.workspace.onDidChangeTextDocument((e) =>
        updateNodeFromDocument(e.document)
      ),
      vscode.workspace.onWillDeleteFiles((e) =>
        e.files.forEach(async (fileUri) => {
          updateNodeFromDocument(
            await vscode.workspace.openTextDocument(fileUri)
          );
        })
      ),
      vscode.workspace.onDidCreateFiles((e) =>
        e.files.forEach(async (fileUri) => {
          updateNodeFromDocument(
            await vscode.workspace.openTextDocument(fileUri)
          );
        })
      )
    );

    //Looks through the entire test folder to discover where is the test file and where the tests are.
    var files = await searchDirectory(path.join("**", "*.p"));
    if (files != null) {
      for (var i = 0; i < files.length; i++) {
        var x = files.at(i);
        if (x !== undefined) {
          updateNodeFromDocument(await vscode.workspace.openTextDocument(x));
        }
      }
    }
    return TestingEditor.instance;
  }


  public static async updateTestCasesList(currProject: string): Promise<void> {
    
    // Delete all the test items in the testing panel
    TestingEditor.controller.items.forEach((item) => TestingEditor.controller.items.delete(item.id));

    if (vscode.workspace.workspaceFolders !== undefined) {
      const folder = vscode.workspace.workspaceFolders[0].uri;
            currProject = currProject.replace(folder.fsPath, "**");
      // Create relative path pattern to the workspace
      var files = await searchDirectory(path.join(currProject, "**", "*.p"));

      // Create test items for selected p project in the testing panel
      if (files != null) {
                for (var i = 0; i < files.length; i++) {
          var x = files.at(i);
          if (x !== undefined) {
            updateNodeFromDocument(await vscode.workspace.openTextDocument(x));
          }
        }
      }
    }
  }
}

function updateFromContents(
  controller: vscode.TestController,
  content: string,
  uri: vscode.Uri,
  item: vscode.TestItem
) {
  //If the document has already been parsed, remove all the current children to re-parse.
  if (item.children.size > 0) {
    item.children.forEach((child) => item.children.delete(child.id));
  }

  parsePTestFile(content, {
    onTest: (name, range) => {
      var uniqueID = range.start.line.toString() + uri;
      const tCase = controller.createTestItem(uniqueID, name, uri);
      tCase.range = range;
      item.children.add(tCase);
    },
  });  

  if (item.children.size == 0) {
    controller.items.delete(item.id);
  } else {
    const runProfile = controller.createRunProfile(
      "Run",
      vscode.TestRunProfileKind.Run,
      (request, token) => {
        runHandler(request, token);
      }
    );
  }
}

//Parses a P test file, looking for 'Test Items'
function parsePTestFile(
  text: string,
  events: {
    onTest(name: string, range: vscode.Range): void;
  }
) {
    const lines = text.split("\n");

    for (let lineNo = 0; lineNo < lines.length; lineNo++) {
      const line = lines[lineNo];
      const test = TestingEditor.testRe.exec(line);
      if (test) {
        const range = new vscode.Range(
          new vscode.Position(lineNo, 0),
          new vscode.Position(lineNo, line.length)
        );
        const words = line.split("test ")[1].split(/ |[^A-Za-z_0-9]/);
        events.onTest(words[0], range);
        continue;
      }
    }
}

//Handles running a Test Run Request
async function runHandler(
  request: vscode.TestRunRequest,
  token: vscode.CancellationToken
) {
  const run = TestingEditor.controller.createTestRun(request);
  const queue: vscode.TestItem[] = [];

  // Add all the test cases to the queue
  if (request.include) {
    request.include.forEach((test) => {
      if (test.parent == undefined) {
        test.children.forEach(test => {
          queue.push(test);
          run.enqueued(test);
        });
      } else {
        queue.push(test);
        run.enqueued(test);
      }
    });
  }

  // Create output channel to print the test case run live log
  let tcOutput = vscode.window.createOutputChannel("Test Case Output");
  tcOutput.show();

  runPTestcaseIfQueueNotEmpty(run, queue, tcOutput, token);
}

// Run a p testcase if there are test cases to run, else end the run if there are no test case items or user requested a cancellation
function runPTestcaseIfQueueNotEmpty(run: vscode.TestRun, queue: vscode.TestItem[], tcOutput: vscode.OutputChannel, token: vscode.CancellationToken) {
  if(queue.length > 0) {
    const test = queue.pop()!;
    if(!token.isCancellationRequested) {
      runPTestCase(run, test, tcOutput, queue, token);
    } else {
      cancelTestcaseRun(run, test, false, queue, tcOutput);
    }
  } else {
    run.end(); 
  }
}

//Always runs a SINGLE P Test Case.
function runPTestCase(run: vscode.TestRun, tc: vscode.TestItem, tcOutput: vscode.OutputChannel, queue: vscode.TestItem[], token: vscode.CancellationToken) {
  run.started(tc);
  //Sends P Check command through the terminal
  var projectDirectory = tc.uri?.fsPath !== undefined ? path.parse(path.parse(tc.uri?.fsPath).dir).dir : "";

  if (vscode.workspace.workspaceFolders !== undefined) {
    runCheckCommand(
      run,
      tc,
      tcOutput,
      projectDirectory ?? "",
      queue,
      token
    );
  }
  return;
}

//Check the output of the test.
function checkResult(
  run: vscode.TestRun,
  tc: vscode.TestItem,
  contents: string
) {
  var result = TestResults.Error;
  if (contents.includes("Found 0 bugs")) {
    result = TestResults.Pass;
  } else if (contents.includes("found a bug")) {
    result = TestResults.Fail;
  }
  switch (result) {
    case TestResults.Pass: {
      run.passed(tc);
      break;
    }
    case TestResults.Fail: {
      var msg = new vscode.TestMessage("Failure after P Check Command");
      msg.location = new vscode.Location(tc.uri!, tc.range!);
      run.failed(tc, msg);
      break;
    }
    case TestResults.Error: {
      var msg = new vscode.TestMessage("Test Errored in Running");
      run.errored(tc, msg);
    }
  }
}

//Runs p check in a child process and returns the stdout or result.
function runCheckCommand(
  run: vscode.TestRun,
  tc: vscode.TestItem,
  tcOutput: vscode.OutputChannel,
  projectDirectory: string,
  queue: vscode.TestItem[],
  token: vscode.CancellationToken
) {
  //number of p checker schedules that are run

  const numSchedules: string =
    vscode.workspace.getConfiguration("p-vscode").get("schedules") ?? "1000";
  var additionalArgs: string =
    vscode.workspace.getConfiguration("p-vscode").get("additionalArgs") ?? "";
  //The p check command depends on if the terminal is bash or zsh.
  var command;
  if (!checkPInstalled()) {
    tcOutput.appendLine(messages.Messages.Installation.noP);
    run.end();
    return;
  } else {
    command = "p check -tc " + tc.label;
    if (additionalArgs != "") {
      // Remove the test case argument from the additionalargs param if exists
      additionalArgs = additionalArgs.replace(/(^| )(-tc|--test-case) (\w+)/, "");
      command += " " + additionalArgs;
    }

    // If user provides schedule option in both schedules and additionalArgs, consider the value provided in the additionalArgs param
    if (!/(^| )(-s|--schedules) (\w+)/.test(additionalArgs)) {
      command += " -s " + numSchedules; 
    }
  }

  // Prints in the output channel
  tcOutput.appendLine("\n\nExecuting command : " + command + "\n");
  
  //Runs command in separate shell that finds the test contents
  try {
    let testCaseProcess = child_process.spawn(command, {shell: true, cwd: projectDirectory});

    const testCaseProcessLog: string[] = [];

    testCaseProcess.stdout.on('data', (chunk) => {
      // Collect the log lines and print in the output channel
      var line = chunk.toString().trim();
      line && tcOutput.appendLine(line);
      testCaseProcessLog.push(line);

      // If user requested to cancel the run in the middle of execution, cancel the testcase run and kill the command process
      if(token.isCancellationRequested) {
        testCaseProcess.kill();
        cancelTestcaseRun(run, tc, true, queue, tcOutput);
      }
    });

    testCaseProcess.stderr.on('data', (chunk) => {
      // Collect the log lines and print in the output channel
      var line = chunk.toString().trim();
      line && tcOutput.appendLine(line);
      testCaseProcessLog.push(line);

      // If user requested to cancel the run in the middle of execution, cancel the testcase run and kill the command process
      if(token.isCancellationRequested) {
        testCaseProcess.kill();
        cancelTestcaseRun(run, tc, true, queue, tcOutput);
      }
    });

    // Once command is done executing, set the test case status and run the next p test case
    testCaseProcess.on('close', (code, signal) => {
      checkResult(run, tc, testCaseProcessLog.join(' '));
      runPTestcaseIfQueueNotEmpty(run, queue, tcOutput, token);
    });
  } catch (e) {
    var msg = new vscode.TestMessage("Test Errored in Running");
    run.errored(tc, msg);
    tcOutput.appendLine("Unexpected Error encountered while executing command: " + command);
    runPTestcaseIfQueueNotEmpty(run, queue, tcOutput, token);
  }
}

function cancelTestcaseRun(run: vscode.TestRun, test: vscode.TestItem, isTestRunning: boolean, queue: vscode.TestItem[], tcOutput: vscode.OutputChannel) {
  
  tcOutput.appendLine("\n\nCancelled the test case run!");

  var msg = new vscode.TestMessage("Test Case Run Cancelled");
  if(isTestRunning)
    run.errored(test, msg);
  queue.forEach((test) => run.errored(test, msg));
  queue = [];
  run.end();
}

function updateNodeFromDocument(e: vscode.TextDocument) {

  const filename = path.parse(e.fileName).base;
  if (filename == undefined) {
    return;
  }
  if (e.uri.scheme !== "file") {
    return;
  }
  if (!e.uri.path.endsWith(".p")) {
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
  const file = TestingEditor.controller.createTestItem(
    uri.toString(),
    uri.path,
    uri
  );
  TestingEditor.controller.items.add(file);
  file.canResolveChildren = true;
  return file;
}

// export class TestFile {
//     parsePTestFile(text: string, events: {
//             onTest(name: string, range: vscode.Range): void
//             })
//     {
//         const lines = text.split('\n');

//         for (let lineNo = 0; lineNo < lines.length; lineNo++) {
//             const line = lines[lineNo];
//             const test = TestingEditor.testRe.exec(line);
//             if (test) {
//                 const range = new vscode.Range(new vscode.Position(lineNo, 0), new vscode.Position(lineNo, 0));
//                 const words = line.split('\s+');
//                 events.onTest(words[1], range);
//                 continue;
//             }

//         }
//     }
// }

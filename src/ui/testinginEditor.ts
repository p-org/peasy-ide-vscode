import * as vscode from "vscode";
import {
  ExtensionConstants,
  LanguageConstants,
  TestResults,
} from "../constants";
import * as messages from "./messages";
import RelatedErrorView from "./relatedErrorView";
import { checkPInstalled, searchDirectory } from "../miscTools";
import { PCommands } from "../commands";
import * as child_process from "child_process";
import { SpawnSyncReturns } from "child_process";
import { integer } from "vscode-languageclient";
const fs = require("fs");

export default class TestingEditor {
  static instance: TestingEditor;
  static controller = vscode.tests.createTestController(
    "pTestController",
    "P Tests"
  );
  static testRe = /^\s*test/g;

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
          if (fs.existsSync(fileUri)) {
            updateNodeFromDocument(
              await vscode.workspace.openTextDocument(fileUri)
            );
          }
        })
      ),
      vscode.workspace.onDidCreateFiles((e) =>
        e.files.forEach(async (fileUri) => {
          if (fs.existsSync(fileUri)) {
            updateNodeFromDocument(
              await vscode.workspace.openTextDocument(fileUri)
            );
          }
        })
      )
    );

    //Looks through the entire test folder to discover where is the test file and where the tests are.
    var files = await searchDirectory("**/PTst/Test*.p");
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

  if (request.include) {
    request.include.forEach((test) => queue.push(test));
    request.include.forEach((test) => run.enqueued(test));
  }

  while (queue.length > 0) {
    const test = queue.pop()!;
    run.started(test);

    await handlePTestCase(run, test);
  }
}

/*

If the Test Item is a file: run its children. Else: Run the test case.
*/
async function handlePTestCase(
  run: vscode.TestRun,
  tc: vscode.TestItem
): Promise<boolean> {
  if (tc.parent == undefined) {
    tc.children.forEach((item) => run.enqueued(item));
    tc.children.forEach(async (item) => await runPTestCase(run, item));

    run.passed(tc);
  } else {
    await runPTestCase(run, tc);
  }
  return true;
}

//Always runs a SINGLE P Test Case.
async function runPTestCase(run: vscode.TestRun, tc: vscode.TestItem) {
  run.started(tc);

  var result = TestResults.Error;
  let terminal = vscode.window.activeTerminal ?? vscode.window.createTerminal();
  if (terminal.name == PCommands.RunTask) {
    for (let i = 0; i < vscode.window.terminals.length; i++) {
      if (vscode.window.terminals.at(i)?.name != PCommands.RunTask) {
        terminal =
          vscode.window.terminals.at(i) ?? vscode.window.createTerminal();
        break;
      }
    }
    if (terminal.name == PCommands.RunTask) {
      terminal = vscode.window.createTerminal();
    }
  }
  //Sends P Check command through the terminal
  terminal.show();
  const outputDirectory = "PCheckerOutput/" + tc.label;
  var outputFile = outputDirectory + "/check.log";
  var projectDirectory = tc.uri?.fsPath.split("PTst")[0];

  if (vscode.workspace.workspaceFolders !== undefined) {
    var contents = await runCheckCommand(
      terminal,
      tc,
      outputDirectory,
      projectDirectory ?? "",
      run
    );
  }

  return;
}

//Runs p check and calls a wait function to wait for the result
async function runCheckCommand(
  terminal: vscode.Terminal,
  tc: vscode.TestItem,
  outputDirectory: string,
  projectDirectory: string,
  run: vscode.TestRun
) {
  //number of p checker iterations that are run

  const numIterations: String =
    vscode.workspace.getConfiguration("p-vscode").get("iterations") ?? "1000";
  //The p check command depends on if the terminal is bash or zsh.
  var command;

  if (!(await checkPInstalled())) {
    command = 'echo -e "\\e[1;31m ' + messages.Messages.Installation.noP + '"';
    terminal.sendText(command);
  } else {
    let stdOut = child_process.execSync(
      "cd " + projectDirectory + " && p compile ",
      { shell: "/bin/zsh" }
    );
    var outputFile = projectDirectory + outputDirectory;
    if (!fs.existsSync(projectDirectory + "PCheckerOutput")) {
      try {
        fs.mkdirSync(projectDirectory + "PCheckerOutput");
      } catch (Error) {}
    }
    waitCompile(
      projectDirectory,
      outputFile,
      tc,
      numIterations,
      terminal,
      run,
      stdOut
    );
  }
}

/*
1. Ensure the PCheckerOutput directory exists (we need it to put the results of p check inside.)
2. Wait for P program to finish compiling through p compile

*/
async function waitCompile(
  projectDirectory: string,
  outputFile: string,
  tc: vscode.TestItem,
  numIterations: String,
  terminal: vscode.Terminal,
  run: vscode.TestRun,
  stdOut: Buffer
) {
  var files = await searchDirectory(projectDirectory + "PCheckerOutput");
  if (
    !fs.existsSync(projectDirectory + "PCheckerOutput") ||
    !stdOut.toString().includes("Thanks for using P")
  ) {
    setTimeout(waitCompile, 1000, projectDirectory, outputFile);
  } else {
    fs.writeFile(outputFile, "", function (err: any) {
      if (err) {
        throw err;
      }
    });
    var command =
      "cd " +
      projectDirectory +
      " && p check -tc " +
      tc.label +
      " -i " +
      numIterations;

    if (terminal.name == "bash") {
      command = command + " 2>&1 | tee " + outputFile;
    } else {
      //hopefully a zsh terminal
      command = command + " |& tee " + outputFile;
    }
    //Runs Command in Terminal
    terminal.sendText(command);
    waitCreateResultDoc(outputFile, run, tc);
  }
}

/*
1. Wait to create a text document to put the results of p check inside 
2. Wait for the p check command to fully run and populate PCheckerOutput folder.
*/
async function waitCreateResultDoc(
  promise: string,
  run: vscode.TestRun,
  tc: vscode.TestItem
) {
  try {
    await vscode.workspace.openTextDocument(promise);
  } catch (Error) {
    throw Error;
  }
  if (
    !fs.existsSync(promise) ||
    !(await vscode.workspace.openTextDocument(promise))
      .getText()
      .includes("Scheduling")
  ) {
    setTimeout(waitCreateResultDoc, 1000, promise, run, tc);
  } else {
    var contents = (await vscode.workspace.openTextDocument(promise)).getText();
    var result;
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
        var msg = new vscode.TestMessage("Test Errored While Running");
        run.errored(tc, msg);
      }
    }
  }
}

function updateNodeFromDocument(e: vscode.TextDocument) {
  const name = e.fileName.split("/");
  if (name.at(-1) == undefined || !name.includes("PTst")) {
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

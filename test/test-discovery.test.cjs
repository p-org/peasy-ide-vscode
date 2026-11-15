const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { runInNewContext } = require('node:vm');
const { test } = require('node:test');
const ts = require('typescript');

function fixture() {
  const uri = (name) => ({ scheme: 'file', path: `/workspace/${name}`,
    fsPath: `/workspace/${name}`, toString() { return this.path; } });
  const files = [uri('._spec.p'), uri('binary.p'), uri('Tests.p')];
  const opened = [];
  const warnings = [];
  const handlers = {};
  const collection = () => {
    const items = new Map();
    items.add = (item) => items.set(item.id, item);
    return items;
  };
  const items = collection();
  const controller = {
    items,
    createTestItem: (id, label, uri) => ({ id, label, uri, children: collection() }),
    createRunProfile() {},
  };
  const vscode = {
    tests: { createTestController: () => controller },
    TestRunProfileKind: { Run: 1 },
    Position: class { constructor(line, character) { Object.assign(this, { line, character }); } },
    Range: class { constructor(start, end) { Object.assign(this, { start, end }); } },
    workspace: {
      workspaceFolders: [{ uri: uri('') }],
      onDidChangeTextDocument: (fn) => { handlers.change = fn; },
      onWillDeleteFiles: (fn) => { handlers.delete = fn; },
      onDidCreateFiles: (fn) => { handlers.create = fn; },
      async openTextDocument(uri) {
        opened.push(uri.path);
        if (uri.path !== '/workspace/Tests.p') throw new Error('File seems to be binary');
        return { uri, fileName: uri.fsPath, getText: () => 'test Healthy [main=Main];' };
      },
    },
  };
  const source = readFileSync(resolve(__dirname, '../src/ide/ui/testinginEditor.ts'), 'utf8');
  const exports = {};
  runInNewContext(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 },
  }).outputText, {
    exports,
    console: { warn: (...args) => warnings.push(args) },
    require(name) {
      if (name === 'vscode') return vscode;
      if (name === '../../miscTools') return { searchDirectory: async () => files };
      if (name === '../../constants' || name === './messages') return {};
      return require(name);
    },
  });
  return { editor: exports.default, opened, warnings, items, handlers, files };
}

test('activation skips AppleDouble and continues after a binary file to discover valid tests', async () => {
  const f = fixture();
  await f.editor.createAndRegister({ subscriptions: [] });
  assert.deepEqual(f.opened, ['/workspace/binary.p', '/workspace/Tests.p']);
  assert.equal(f.warnings.length, 1);
  assert.equal(f.items.get('/workspace/Tests.p').children.size, 1);
});

test('switching projects also tolerates unreadable files', async () => {
  const f = fixture();
  await f.editor.updateTestCasesList('/workspace');
  assert.deepEqual(f.opened, ['/workspace/binary.p', '/workspace/Tests.p']);
  assert.equal(f.items.get('/workspace/Tests.p').children.size, 1);
});

test('file events ignore metadata and handle failed reads without rejected promises', async () => {
  const f = fixture();
  await f.editor.createAndRegister({ subscriptions: [] });
  f.opened.length = 0;
  for (const event of ['create', 'delete']) f.handlers[event]({ files: f.files.slice(0, 2) });
  await new Promise(setImmediate);
  assert.deepEqual(f.opened, ['/workspace/binary.p', '/workspace/binary.p']);
  assert.equal(f.warnings.length, 3);
});

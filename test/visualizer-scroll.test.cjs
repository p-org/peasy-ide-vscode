const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { runInNewContext } = require('node:vm');
const { test } = require('node:test');

function load(file, globals) {
  const context = { ...globals };
  runInNewContext(readFileSync(resolve(__dirname,
    '../src/trace-visualizer/js/visualization', file), 'utf8'), context);
  return context;
}

function view(hostCount, hiddenCount = 0) {
  const hosts = Array.from({ length: hostCount }, (_, i) => `host-${i}`);
  return {
    getHosts: () => hosts,
    getTransformer: () => ({ getSpecifiedHiddenHosts: () => hosts.slice(0, hiddenCount) }),
    setWidth(width) { this.width = width; },
    setLogTableWidth(width) { this.logWidth = width; },
  };
}

for (const scenario of [
  { name: 'narrow graph scrolls without widening either sidebar', width: 180, left: 6, right: 0, expected: 240 },
  { name: 'wide graph fills its own viewport', width: 600, left: 6, right: 0, expected: 600 },
  { name: 'pairwise views share one horizontal graph viewport', width: 180, left: 6, right: 6, expected: 480 },
  { name: 'hidden hosts do not reserve graph columns', width: 180, left: 6, hidden: 3, right: 0, expected: 180 },
  { name: 'all hosts hidden produces finite widths', width: 180, left: 6, hidden: 6, right: 0, expected: 180 },
  { name: 'Logs mode with zero graph width keeps a finite layout', width: 0, left: 6, right: 0, expected: 240 },
]) {
  test(scenario.name, () => {
    let canvasWidth;
    const $ = (selector) => {
      if (selector === '#graphViewport') return { width: () => scenario.width };
      if (selector === '#graphCanvas') return { width: (value) => { canvasWidth = value; } };
      if (selector === '.visualization > .left') return { width: () => 224 };
      throw new Error(`Unexpected global layout dependency: ${selector}`);
    };
    const { Global } = load('global.js', { $, d3: { select: () => ({ data: () => [] }) } });
    const left = view(scenario.left, scenario.hidden);
    const right = scenario.right ? view(scenario.right) : null;
    Global.prototype.resize.call({ viewL: left, viewR: right, getPairwiseView: () => !!right });
    assert.equal(canvasWidth, scenario.expected);
    assert.ok(Number.isFinite(left.width));
    assert.equal(left.logWidth, right ? 78 : 168);
    if (right) assert.equal(right.width, left.width);
  });
}

test('vertical scrolling moves the graph body but never shifts logs or headers sideways', () => {
  const changes = [];
  let greyUpdates = 0;
  const $ = (selector) => {
    if (selector === '#vizContainer') return { css: (...args) => changes.push(args) };
    if (selector === '.line.focus') return { length: 0 };
    throw new Error(`Unexpected scroll target: ${selector}`);
  };
  const { Controller } = load('controller.js', { $, window: { pageYOffset: 900, pageXOffset: 123 } });
  Controller.prototype.onScroll.call({ toggleGreyHostNodes: () => greyUpdates++ });
  assert.deepEqual(changes, [['transform', 'translateY(-900px)']]);
  assert.equal(greyUpdates, 1);
});

test('graph scrolling dismisses popups anchored to the old column position', () => {
  const handlers = new Map();
  const window = {};
  let dismissed = false;
  const target = {
    unbind() { return this; },
    bind(name, fn) { handlers.set(`window.${name}`, fn); return this; },
    off() { return this; },
    on(name, fn) { handlers.set(`graph.${name}`, fn); return this; },
    scroll() {},
  };
  const $ = (selector) => {
    if (selector === window || selector === '#graphViewport') return target;
    if (selector === '.dialog') return { hide: () => { dismissed = true; } };
    throw new Error(`Unexpected scroll target: ${selector}`);
  };
  const { Controller } = load('controller.js', { $, window });
  Controller.prototype.bindScroll.call({ onScroll() {} });
  handlers.get('graph.scroll.graph')();
  assert.equal(dismissed, true);
});

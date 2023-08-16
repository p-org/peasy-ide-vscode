<style>
  .md-typeset h1,
  .md-content__button {
    display: none;
  }
  
</style>

<div align="center">

  <img src="images/p-icon.png" width="20%">
  <h2>Peasy: An Intuitive Development Environment for P</h2>

</div>

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/p-org/peasy-ide-vscode/main/LICENSE)
<a href="vscode:extension/PLanguage.p-extension">
<button id="hover" style="font-weight:bold;" class="button1 block1"> Download the Peasy Extension! </button>
</a>

**Peasy Overview:**

Peasy is a VSCode Language Extension created by the P team to enable a richer, more intuitive user interface while developing P programs. It equips users with a familiar programming environment for developing, visualizing, and reviewing P code, expanding the true potential of P users.

Peasy achieves this by providing a VS code language extension for editing P programs and an intuitive interface for visualizing and reviewing the formal design and specification of a distributed system as a collection of P state machines.

<div align="left">
  <h2>Peasy Extension's Features</h2>
</div>

**Syntax Highlighting**
[Learn more.](./features/syntax_highlighting.md)

**Automatic Compilation**
[Learn more.](./features/compilation/basic.md)

**Snippets**
[Learn more.](./features/snippets.md)

**Error Reporting**
[Learn more.](./features/compilation/error_reporting.md)

**Testing Framework**
[Learn more.](./features/testing.md)

**Error Tracing Visualization**
[Learn more.](./features/error_tracing.md)

<div align="left">
  <h2>Peasy Extension's Shortcuts</h2>
</div>

| Keypress | Description                                                                   |
| -------- | ----------------------------------------------------------------------------- |
| ++f4++   | Shows a dropdown menu of all the P projects in the current directory          |
| ++f5++   | Compiles the Currently Selected P Project                                     |
| ++f6++   | Opens the Peasy Error Trace Visualizer Webview                                |
| ++f7++   | Generates code to visualize the currently selected P project's state machines |

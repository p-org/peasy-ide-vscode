<style>
  .md-typeset h1,
  .md-content__button {
    display: none;
  }
  .md-typeset__table {
    width: 100%;
  }
  .md-typeset__table thead, .md-typeset__table tbody {
    display: block;
  }
  .md-typeset__table tr {
    display: flex;
  }
  .md-typeset__table td:last-child, .md-typeset__table th:last-child {
    flex: 1;
  }
  .md-typeset__table td:first-child, .md-typeset__table th:first-child {
    width: clamp(131.48px, 25%, 12em);
  }
</style>

<div align="center">

  <img src="images/p-icon.png" width="20%">
  <h2>Peasy: An Intuitive Development Environment for P</h2>

</div>

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/p-org/peasy-ide-vscode/main/LICENSE)
<a href="vscode:extension/PLanguage.peasy-extension">
<button id="hover" style="font-weight:bold;" class="button1 block1"> Download Peasy for VS Code </button>
</a>

Peasy is a VS Code language extension created by the P team to enable a richer, more intuitive user interface while developing P programs. It equips users with a familiar programming environment for developing, visualizing, and reviewing P code, expanding the true potential of P users.

Peasy achieves this by providing a VS Code language extension for editing P programs and an intuitive interface for visualizing and reviewing the formal design and specification of a distributed system as a collection of P state machines.

<div align="center">
  <h2>The Motivation Behind Peasy</h2>
</div>

Peasy brings the full power of an Intuitive Development Environment, including an editor, visualizer, checker, reviewer to P users.

Peasy achieves this by providing a VS code language extension for editing P programs and an intuitive interface for visualizing and reviewing the formal design and specification of a distributed system as a collection of P state machines.

Peasy enables the common interface of unit testing to model checking of P programs.

Peasy also provides a trace visualizer to debug counter examples reported by model checker as a message sequence chart and also the ability to single step through the error trace using the VS code debugger.

Peasy can also be used as a documentation tool leveraged by the service teams during design reviews to better understand/describe the complex system design.

<div align="center">
  <h2>Transforming the User Experience</h2>
</div>

From the very beginning of users utilizing P to write formal models of their projects and problems, users clamored for a VSCode extension for the language P that would allow them to streamline the process of developing in P. Therefore, the P Team went to work to create a plugin that would suit all their users' needs. We aim for this extension to attract new users to develop in P with ease as well as transform the user experience for current P developers.

<div align="center">
  <h2>Keyboard Shortcuts</h2>
</div>

| Keypress         | Description                                                         |
| ---------------- |---------------------------------------------------------------------|
| ++f4++           | Shows a dropdown menu to select a P project                         |
| ++f5++           | Compiles the current P Project                                      |
| ++f6++           | Opens the Peasy Trace Visualizer Webview                            |
| ++f7++           | Generates code to visualize state machines of the current P project |
| ++ctrl++ + ++s++ | Saves and compiles the P project                                    |

<div align="left">
  <h2>Peasy Features</h2>
</div>

<div class="peasy_features">
<div class="peasy_feature" onclick="location.href='editingCode/#syntax-highlighting'">
  <img src="images/syntax_highlighting_icon.png" alt="my img"/>
  <p>Syntax Highlighting</p>
</div>

<div class="peasy_feature" onclick="location.href='compilingCode/#automatic-compilation'">
  <img src="images/automatic_compilation_icon.png" alt="my img"/>
  <p>Automatic Compilation</p>
</div>

<div class="peasy_feature" onclick="location.href='editingCode/#snippet-auto-completion'">
  <img src="images/code_completion_icon.png" alt="my img"/>
  <p>Snippets</p>
</div>

<div class="peasy_feature" onclick="location.href='compilingCode/#error-reporting'">
  <img src="images/error_reporting_icon.png" alt="my img"/>
  <p>Error Reporting</p>
</div>

<div class="peasy_feature" onclick="location.href='runningTestcases'">
  <img src="images/testing_framework_icon.png" alt="my img"/>
  <p>Testing Framework</p>
</div>

<div class="peasy_feature" onclick="location.href='trace-visualizer/getting_started'">
  <img src="images/trace_visualizer_icon.png" alt="my img"/>
  <p>Trace Visualization</p>
</div>

<div class="peasy_feature" onclick="location.href='visualizingStateMachines'">
  <img src="images/state_machine_visualization_icon.png" alt="my img"/>
  <p>State Machine Visualization</p>
</div>

<div>

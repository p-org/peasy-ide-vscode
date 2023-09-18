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

----


[P](https://p-org.github.io/P/) is a state machine based programming language for formal modeling and analysis of distributed systems. P is being used by developers in industry and academia to reason about the correctness of their distributed system. The goal with Peasy is to make the process of creating, checking, and debugging formal models easy and less painful. 

:mega: **Peasy** is a step towards making application of formal methods in practice, **easy-peasy**! :mega:

!!! info ""
    Peasy is a VS Code language extension for P. Peasy supports **syntax highlighting, compilation, error reporting, and unit testing** of P formal models within the VS Code environment. 

!!! error "" 
    Peasy provides **state machine visualization** that developers can use to visualize their formal design (P state machines) and share in their design documentation.

!!! success ""
    Error traces for complex distributed systems are hard to debug as they involve nontrivial interleaving of messages. Peasy provides **trace visualization** to aid debugging counter examples provided by the P checker. Peasy helps visualize traces as message sequence charts, perform search, and do motif based analysis. 

----------

Navigate through the [user guide](https://p-org.github.io/peasy-ide-vscode/) for an in depth description and demo videos of all the cool features in the Peasy extension. Checkout the [demo video](demo.md) for a complete step-by-step guide.


Built with ❤️ from the P Team @ Amazon Web Services (AWS).

-----------



<div align="center">
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



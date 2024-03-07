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
  <h2>Key Bindings and Commands</h2>
</div>

**Keyboard Shortcuts**

| Keypress                               | Description                                                         |
| ---------------------------------------|---------------------------------------------------------------------|
| <pre>++ctrl++ + ++l++ / ++f4++</pre>   | Shows a dropdown menu to select a P project                         |
| <pre>++ctrl++ + ++b++ / ++f5++</pre>   | Compiles the current P Project                                      |
| ++f6++                                 | Opens the Peasy Trace Visualizer Webview                            |
| ++f7++                                 | Generates code to visualize state machines of the current P project |
| ++ctrl++ + ++s++                       | Saves and compiles the P project                                    |

**VS Code Commands**

* `PeasyViz: Run` - Opens the Web View panel and launches the Trace Visualizer


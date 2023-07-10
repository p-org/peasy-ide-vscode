# peasy-ide-vscode
Peasy: An Intuitive Development Environment for P


This is the IDE extension for P specifically geared for VS Code. 

Preliminary instructions to install this extension:
NOTE: Remove any previous versions of the extension from the extensions folder in .vscode. 
1. Clone this repository.
2. cd into the repository.
3. Run 'vsce package -o ~ '. If the command errors, run 'brew install vsce' and re-run the command.
4. The extension should now be in your user directory. Now, open a P code directory and navigate to the command pallete.
5. Search and click onto the command "Extensions: Install from VSIX..."
6. Install the VSIX file you just created.
You should get a notification saying "Completed installing P Extension extension from VSIX."
Reload VSCode, and your extension should now be working!

Further P Extension Support:
1. Compilation: Open any P project folder. Navigate to a file that ends with .p or .pproj and press 'f5' to compile. 
2. Use P's Custom Theme by selecting with the dropdown at Code > Settings > Theme > Color Theme.
3. P should now support Errors that occur during compilation in the Problems panel. 
4. Snippets: Typing out the beginning of P data structures and syntactic structures within a P program, such as "machine", "test", and "foreach" will cause snippets to load that have the general structure loaded as well. Pressing tab will allow the user to 'fill in the blank' of each structure.
5. P's testing framework allows for testing done by clicking a green play button. It automatically runs a p check command. The user can also change the settings of the number of iterations run every time a test is run from the IDE.


## Features
\!\[Error Reporting\]\(images/error_reporting.png\)
\!\[Snippets\]\(images/snippets.png\)
\!\[Syntax Highlighting\]\(images/syntax_highlighting_1.png\)
\!\[Testing Framework\]\(images/testing_framework.png\)
\!\[Iteration Settings\]\(images/Iteration_Settings.png\)
> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

Dependencies: js-yaml installed inside the package.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `p-vscode.iterations`: Set to the number of iterations you want when p check is run inside of the IDE of a P testing folder.
* `p-vscode.trace.server`: Set to 'verbose' to see the language server and client interactions in the Debug Console.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes


Initial release of Syntax Highlighting, Compilation upon pressing F + 5, a P Theme File, Problem Reporting, Testing Framework, and Snippets




---

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**



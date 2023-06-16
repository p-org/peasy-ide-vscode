# peasy-ide-vscode
Peasy: An Intuitive Development Environment for P

This is the IDE extension for P specifically geared for VS Code. 

Preliminary instructions to install this extension:
1. Clone this repository.
2. cd into this repository and call 'npm install'
3. Run 'cmd' 'shift' 'B' on this repository in VSCode to build this project.
4. Move this folder into the ~/.vscode/extensions directory.
5. Add {"identifier":{"id":"undefined_publisher.peasy-ide-vscode"},"version":"0.0.1","location":{"$mid":1,"path":"~/.vscode/extensions/peasy-ide-vscode","scheme":"file"},"relativeLocation":"peasy-ide-vscode"} to ~/.vscode/extensions/extensions.json
6. Restart VS Code.
7. Any P files should now be populated with syntax highlighting! Use P's Custom Theme by selecting with the dropdown at Code > Settings > Theme > Color Theme.

Further P Extension Support:
1. Compilation: Open any P project folder. Navigate to a file that ends with .p or .pproj and press 'f5' to compile. 
2. Use P's Custom Theme by selecting with the dropdown at Code > Settings > Theme > Color Theme.\
3. P should now support Errors that occur during compilation in the Problems panel. 

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)
![Client Machine Example](./images/client_machine.png?raw=true)
> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

Dependencies: js-yaml installed inside the package.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes
### 1.0.0

Initial release of Syntax Highlighting, Compilation upon pressing F + 5, a P Theme File, and Problem Reporting

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

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

npx js-yaml syntaxes/p.YAML-tmLanguage > syntaxes/p.tmLanguage.json

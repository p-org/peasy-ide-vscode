# peasy-ide-vscode
Peasy: An Intuitive Development Environment for P

This is the language grammar extension for P specifically geared for VS Code. 

Preliminary instructions to install grammar highlighting:
1. Move this folder into the ~/.vscode/extensions directory.
2. Add {"identifier":{"id":"undefined_publisher.peasy-ide-vscode"},"version":"0.0.1","location":{"$mid":1,"path":"~/.vscode/extensions/peasy-ide-vscode","scheme":"file"},"relativeLocation":"peasy-ide-vscode"} to ~/.vscode/extensions/extensions.json
3. Restart VS Code.
4. Feel free to change to different themes, or follow the instructions below to use the P Team's custom theme!

Preliminary instructions to install a P custom theme. 
1. Move the p-theme file inside the folder into the ~/.vscode/extensions directory.
2. Add {"identifier":{"id":"undefined_publisher.p-theme"},"version":"0.0.1","location":{"$mid":1,"path":"~/.vscode/extensions/p-theme","scheme":"file"},"relativeLocation":"p-theme"} to ~/.vscode/extensions/extensions.json
3. Restart VS Code. 
4. Change the theme in VS Code: Code -> Settings -> Theme -> Dropdown Menu (Select P's Custom Theme).

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

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

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

# Changelog

All notable changes to the Peasy extension are documented in this file.

## [1.1.0] - 2026-05-24

### Fixed
- **Critical:** Removed hardcoded developer-machine path
  (`/Users/esthersu/...`) from the language-server launcher. The path is now
  read from the `p-vscode.languageServer.cliPath` setting.
- **Critical:** Configuration class was reading from the wrong section name
  (`p` instead of `p-vscode`), so settings like `dotnetExecutablePath` were
  unreachable. Section name is now centralized in `ConfigurationConstants`.
- **Critical:** Replaced `cd <dir> ; p compile` command strings (which break
  on Windows `cmd.exe` and on paths containing spaces) with
  `ShellExecution('p compile', { cwd })`. Same fix for the Stately task.
- **Critical:** The test runner spawned `p check -tc <name>` through a shell
  with `shell: true`, allowing test-case names to be interpreted as shell
  syntax. Switched to argv-form `spawn('p', [...], { shell: false })`.
- `Ctrl+B` keybinding was unscoped, hijacking VS Code's built-in "Toggle Side
  Bar" globally. All keybindings now require `editorLangId == p`.
- `extension.deactivate()` was empty; the language client and runtime are now
  disposed on deactivation.
- File-system watchers in `RelatedErrorView` were created at class-load time,
  before activation. Moved into `createAndRegister` and pushed into
  `context.subscriptions`.
- Re-compile triggered by every `.p` / `.pproj` change is now debounced (500ms).

### Added
- Cross-OS CI workflow (`ci.yml`) running on Ubuntu, macOS and Windows for
  every PR. Lints, typechecks, builds, and packages a `.vsix`.
- Open VSX publish step in the release workflow so Cursor, VSCodium,
  Windsurf, Gitpod and code-server users can install Peasy natively.
- Configuration entries for `p-vscode.dotnetExecutablePath`,
  `p-vscode.languageServer.cliPath`, `p-vscode.languageServer.launchArgs`.
- `peasy.compile` command (palette-accessible) that invokes the active
  compile task.
- `peasy.showProjectFiles` command (replaces the reserved-namespace
  `workbench.files` command ID).
- `@vscode/vsce` pinned as a devDependency with a `package:vsix` script for
  reproducible, offline-friendly packaging; CI/publish use
  `npx --no-install vsce`.
- `.eslintrc.json` with a `@typescript-eslint/recommended` baseline.
- `extensionKind`, `capabilities.virtualWorkspaces`, and
  `capabilities.untrustedWorkspaces` declarations in `package.json`.
- Expanded `README.md` with IDE support matrix, prerequisites, settings
  reference, keybindings table and development instructions.

### Changed
- Bumped minimum VS Code engine from `^1.78.0` to `^1.79.0` (required by the
  `runCommands` command used in keybindings).
- Bumped Node.js in CI from 16 (EOL) to 20 LTS.
- Updated GitHub Actions to current major versions
  (`actions/checkout@v4`, `actions/setup-node@v4`).
- Default `p-vscode.trace.server` changed from `"verbose"` to `"off"`.
- `vscode:prepublish` now builds in `production` mode (smaller bundle).
- Marketplace metadata: added `license`, `homepage`, `bugs`, `keywords`,
  `galleryBanner`; moved category from `["Other"]` to
  `["Programming Languages", "Linters", "Testing", "Visualization"]`.
- `p-vscode` view-container content text replaced (was VS Code's generic git
  boilerplate).
- `checkPInstalled` now uses `which('p')` rather than spawning a shell, so
  detection is consistent across Windows / macOS / Linux.

### Removed
- Dead `which-module` dependency.
- Unused `runTest.js` reference in scripts (no test runner shipped yet).

## 1.0.5 and earlier

See git history and the [GitHub releases](https://github.com/p-org/peasy-ide-vscode/releases).

# Peasy IDE Extension — Repository Review

Reviewer focus: code quality, correctness, and **making the extension usable across
IDEs that consume VS Code extensions (VS Code, Cursor, Windsurf, VSCodium,
code-server, Gitpod, …) and across operating systems (macOS, Linux, Windows)**.

The findings are grouped by severity. Each item includes the file/line it lives in
and a concrete fix.

---

## 1. Critical bugs (must fix)

### 1.1 Hardcoded developer machine path in language-server launch
`src/ide/language/githubReleaseInstaller.ts:19-23`

```ts
public async getExecutable(server: boolean, newArgs: string[]): Promise<Executable | undefined> {
  const { path: dotnetExecutable } = await getDotnetExecutablePath();
  const standaloneServerpath = "/Users/esthersu/P-esther/Bld/Drops/Debug/Binaries/net7.0/PLanguageServer.dll";
  return { command: dotnetExecutable, args: [ standaloneServerpath, ...newArgs ] };
}
```

The language-server DLL path is hardcoded to a single developer's home directory.
Anywhere this code path runs on a user machine it will fail. The fix is to:
1. Restore the GitHub release download logic (the file's class name implies that's
   what it used to do — the body was gutted), **or**
2. Ship the language server inside the extension (`./server/...`) and resolve via
   `context.asAbsolutePath(...)`, **or**
3. Read the path from `p-vscode.languageServer.cliPath` (already declared in
   `constants.ts` but never wired into `package.json`).

In the current state of `extension.ts` the language client is never started
(`startClientAndWaitforVersion` is unreferenced — line 47 is commented out), so the
bug is latent. If anyone re-enables the client this breaks immediately. Delete this
hardcoded constant **today**, even if you stub the function to throw.

### 1.2 `Configuration` reads from the wrong section
`src/constants.ts:11` declares `SectionName = 'p'`, but every contribution in
`package.json` is namespaced `p-vscode.*`. The `Configuration.get<T>()` helper
therefore looks up keys that do not exist and throws "did not return a value".

The only live caller today is `dotnet.ts:getDotnetExecutablePath` — which means
the user-visible `dotnetExecutablePath` setting (referenced in code, not declared
in `package.json`) is unreachable. Two pieces of work:

- Set `SectionName = 'p-vscode'` in `constants.ts`, **or** standardise everything
  on `p` (and rename `p-vscode.*` → `p.*` in `package.json`). I'd recommend `p`:
  shorter and matches the `LanguageConstants.Id`.
- Then declare the missing settings (`dotnetExecutablePath`, `cliPath`,
  `languageServerLaunchArgs`) in `package.json` under
  `contributes.configuration.properties`, with sensible defaults, so users can
  actually configure them.

### 1.3 Shell-specific command construction breaks on Windows `cmd.exe`
`src/ide/ui/compileCommands.ts:80, 124-137, 206, 232`

```ts
CompileCommands.command = "cd " + item.description + " ; p compile";
```

`;` as a statement separator is POSIX shell syntax. On Windows (`cmd.exe`) you'd
need `&&`, and on PowerShell `;` works but quoting/escaping differs. Also, the
project directory is interpolated unquoted — any path containing a space breaks
the command, and a malicious workspace could in principle inject extra commands.

Fix: don't build a `cd … ; …` string at all. Use `ShellExecution`'s second arg
to set the working directory:

```ts
new vscode.ShellExecution('p compile', { cwd: item.description });
```

This removes the shell-syntax dependency and the quoting hazard, and makes the
task portable across cmd, PowerShell, bash, and zsh.

The same fix applies to the `--mode stately` variant and the test-runner
`spawn(command, { shell: true, cwd: ... })` in `testinginEditor.ts:276` — there
the `cwd` is already passed correctly, but the `tc.label` (test case name) is
also injected unquoted into a shell string. Switch to `spawn('p', ['check',
'-tc', tc.label, ...], { cwd })` and drop `shell: true` to avoid injection.

---

## 2. Cross-IDE compatibility (Cursor, Windsurf, VSCodium, …)

These IDEs use the VS Code extension API but install from **Open VSX**, not from
the proprietary VS Marketplace. They also lag a release or two behind the VS Code
engine.

### 2.1 Publish to Open VSX as well as the VS Marketplace
`.github/workflows/publish-extension.yml` only publishes to
`marketplace.visualstudio.com`. Cursor, VSCodium, Gitpod, and code-search users
cannot install the extension natively. Add a second step:

```yaml
- name: Publish to Open VSX
  uses: HaaLeo/publish-vscode-extension@v1
  with:
    pat: ${{ secrets.OVSX_PAT }}
    extensionFile: ./peasy-extension.vsix
```

Generate an Open VSX PAT at https://open-vsx.org and store it as `OVSX_PAT`.
Build the `.vsix` once (using `vsce package`) and upload to both registries from
the same artifact, so versions can't drift.

### 2.2 The `runCommands` keybinding requires VS Code ≥ 1.79
`package.json:11` declares `"engines": { "vscode": "^1.78.0" }` but every
keybinding uses `"command": "runCommands"`, which was introduced in VS Code
1.79. Cursor and Windsurf forks based on an older VS Code (or VSCodium builds
that pin older versions) will silently no-op the F5/Ctrl+B/F4/Ctrl+L/F7 shortcuts.

Either:
- Bump the engine to `^1.79.0` (preferred — that release is May 2023, well past
  any modern fork's base), **or**
- Replace `runCommands` with a real command contributed by the extension that
  calls `vscode.commands.executeCommand('workbench.action.tasks.terminate', …)`
  then `…tasks.runTask` itself. This works on any modern engine and is easier to
  unit-test.

### 2.3 Engine pinning is too lax in another direction
`engines.vscode: ^1.78.0` allows any 1.x — but Cursor/Windsurf advertise
specific VS Code versions (currently ~1.93+). The extension will install fine.
The risk is the opposite: if a new contribution-point you adopt later is in
1.85+ and you forget to bump `engines.vscode`, the marketplace will let users
on older forks install a broken extension. Pick the **minimum** API surface you
actually use and pin to that. Today that's `tests.createTestController`
(1.68+) and `runCommands` (1.79+) → `^1.79.0`.

### 2.4 Activation events are too coarse
`"activationEvents": ["workspaceContains:**/*.p"]` activates on any workspace
with a `.p` file anywhere in the tree. Add `onLanguage:p` so the extension also
activates if a user opens a standalone `.p` file (no workspace) — important for
quick demos.

In `package.json` v1.74+ language-extension activation should be implicit; you
can remove `activationEvents` entirely and rely on `contributes.languages` —
which makes startup faster on every fork.

### 2.5 Extension category is wrong
`"categories": ["Other"]` hides the extension from the marketplace's
"Programming Languages" filter. Use:
```json
"categories": ["Programming Languages", "Linters", "Testing", "Visualization"]
```

### 2.6 Bundled VS Code-only API: none, but be careful with Webviews
Cursor's webview sandbox is the same as VS Code's, so `PeasyVizPanel` is fine.
**But** verify the CSP in the webview HTML (`src/trace-visualizer/*Html.ts`)
uses `webview.cspSource` rather than hardcoding `vscode-resource:` URIs — older
URI scheme is removed in current VS Code and stricter in Cursor. (Not inspected
in detail; flagging for follow-up.)

### 2.7 No web extension (`browser` entry)
github.dev, vscode.dev, and Cursor's web mode require a separate `browser`
entry in `package.json`. Today the extension shells out to `p`, `dotnet`, and
spawns processes — none of which are available in the browser. This is fine
**as long as** the extension declares itself as desktop-only:

```json
"extensionKind": ["workspace", "ui"],
"capabilities": {
  "virtualWorkspaces": false,
  "untrustedWorkspaces": { "supported": false, "description": "P compilation runs shell commands in the workspace." }
}
```

`untrustedWorkspaces: false` is important — your tasks execute shell commands
that include workspace-controlled paths, so they shouldn't run on a workspace
the user opted into restricted mode for.

---

## 3. Cross-platform (Windows, Linux, macOS)

Earlier commits already worked on Windows paths (`9b1d03f Modify file paths to
be platform independent`, `569636c Fix p installation check for windows`).
Outstanding issues:

### 3.1 Shell-string construction (see 1.3)
The remaining `cd X ; p compile` pattern still breaks `cmd.exe`. Switch to
`ShellExecution` with `cwd`.

### 3.2 `p --version` discovery
`miscTools.ts:25-32` calls `p --version` through the user's default shell. On
Windows this opens cmd; on Unix it goes through `/bin/sh`. The `p` binary needs
to be on PATH for the *invoking shell's* environment, which differs from the
*terminal*. Recommend resolving via `which('p')` (the package is already a
dependency) and reporting the resolved path in the output channel for
diagnostics.

### 3.3 Test-case name interpolation
`testinginEditor.ts:258`: `"p check -tc " + tc.label` — if a test name ever
contains a space or shell metacharacter, the command breaks. Use `child_process.spawn('p', ['check', '-tc', tc.label, ...args], { cwd })`
(without `shell: true`) so arguments are passed safely on every OS.

---

## 4. Keybinding hygiene

`package.json:114-203` ships five default keybindings, some of which collide
with widely-used built-ins:

| Key | Conflict |
|-----|----------|
| `F5` | "Start Debugging" — universally muscle-memory. You scope it to `editorLangId == p`, but the second binding on **`Ctrl+B`** has **no `when` clause**, so it fires globally and hijacks "Toggle Side Bar". |
| `Ctrl+B` | "Toggle Side Bar" — broken for every user once the extension is installed, even outside a P file. **High-impact bug.** Add `"when": "editorLangId == p"`. |
| `Ctrl+L` | "Clear Terminal" / "Expand Selection" — your binding fires on `!terminalFocus`, hijacking it everywhere else (file explorer, settings page, etc.). Scope to `editorLangId == p`. |
| `F4` | "Go to next problem" — same scoping problem. |
| `F6` | "Move focus to next part" — used to focus the panel. Scoped only to `!inDebugMode`; should also be P-scoped. |

Rule of thumb: every default keybinding should have
`"when": "editorLangId == p || resourceLangId == p"` unless you really mean to
override globally. None of these should override globally.

Also, contribute keybindings as **commands** (`commands` array in
`contributes`) and let `runCommands` reference them by ID. Today the bindings
inline `workbench.action.tasks.runTask` with a magic string `"p-vscode: Compile"`,
which is fragile and won't show up under "Keyboard Shortcuts" for users to
remap.

---

## 5. Marketplace presentation

`package.json` is missing fields that improve discovery on both Marketplace and
Open VSX:

- `"keywords": ["p-language", "formal-methods", "state-machines", "model-checking", "distributed-systems"]`
- `"galleryBanner": { "color": "#0b132b", "theme": "dark" }`
- `"bugs": { "url": "https://github.com/p-org/peasy-ide-vscode/issues" }`
- `"homepage": "https://p-org.github.io/peasy-ide-vscode/"`
- `"license": "MIT"` (you have a LICENSE file but the field isn't set)
- A real **CHANGELOG.md** — VS Code shows it in the extension pane.

The README is one paragraph. For a first-time user landing on the marketplace
page it should at minimum cover: install steps, prerequisites (P CLI, dotnet),
keybindings table, settings reference, troubleshooting.

---

## 6. CI and testing

### 6.1 CI only runs on release
`.github/workflows/publish-extension.yml` runs on `release: published`. There
is **no PR-time CI** — no lint, no typecheck, no build verification. Add:

```yaml
name: CI
on: [pull_request, push]
jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix: { os: [ubuntu-latest, windows-latest, macos-latest] }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint
      - run: npm run compile
      - run: npx tsc --noEmit
      - run: npx vsce package
```

Matrix CI on all three OSes will catch the shell-syntax bugs noted in §1.3 and §3.

### 6.2 Test runner is dead code
`package.json:289`: `"test": "node ./out/test/runTest.js"`. There is no `test/`
directory. `pretest` runs `compile-tests`, which compiles `src/` to `out/` —
producing a parallel build that's never used. Either add real tests (recommend
`@vscode/test-electron` driving the extension host with sample workspaces from
`Examples/`) or remove the dead scripts.

### 6.3 Node version in CI
`publish-extension.yml` uses `node-version: 16` (EOL Sept 2023). Bump to 20 LTS
or 22 LTS. Also pin `actions/checkout@v4` and `actions/setup-node@v4` — current
yaml uses v2/v1.

### 6.4 No ESLint config
`scripts.lint = "eslint src --ext ts"` will fall back to ESLint's defaults.
Ship `.eslintrc.json` (or `eslint.config.js` for ESLint 9) so lint output is
deterministic across machines. Same for Prettier or just `"editor.formatOnSave"`
in `.vscode/settings.json`.

---

## 7. Code-quality nits

These don't change behaviour but make the code easier to maintain across
contributors / IDEs:

- **`var` everywhere** — convert to `const`/`let`. The TS compiler is set to
  `strict: true` but the source style predates that. Quick win with
  `eslint --fix`.
- **`require` mixed with ES imports** (`miscTools.ts:2-5` uses CommonJS
  `require` despite the file being TypeScript). Use `import` so types flow.
- **Singleton statics with side effects on import**
  (`RelatedErrorView.watcherP` / `watcher_pproj` are constructed at class load,
  before the extension has activated). Move into `createAndRegister` and push
  into `context.subscriptions`.
- **`extension.deactivate()` is empty** — the `ExtensionRuntime` instance and
  the language client are not disposed. Implement deactivation:
  ```ts
  export async function deactivate(): Promise<void> {
    await extensionRuntime?.dispose();
  }
  ```
- **`webpack.config.js mode: 'none'`** ships unminified code (~10× larger
  bundle). The `package` script uses `--mode production`; default to that and
  set `mode: 'development'` only in `watch`.
- **`@types/node: 16.x`** — match whatever Node you target. Today VS Code 1.93
  ships Node 20.
- **Misleading view content** — `peasy-visualizer-view.contents` in
  `package.json:37` is boilerplate text about git ("In order to use git
  features, you can open a folder containing a git repository…"). Rewrite for
  the actual visualizer.
- **`peasy-visualizer-view` activitybar** title is "Action Menu" — should be
  "P Visualizer" or similar.
- **Bundled theme as a top-level contribution** — shipping
  `PColorTheme.json` as a public theme means it shows up in *everyone's* theme
  picker after install. If it's only meant for `.p` syntax tokens, contribute
  it as semantic-token rules / TextMate scopes (`contributes.grammars`) rather
  than as a full UI theme.
- **`PInstaller`** is a class wrapping a single method; collapse into a free
  function or properly use it for installation lifecycle.
- **`vscode.tasks.fetchTasks()` then name-match** — fragile because task names
  are localised in some forks. Identify tasks by `definition.type` instead.
- **Default `p-vscode.trace.server: "verbose"`** is extremely chatty. Default
  to `"off"`; `"verbose"` should be opt-in for debugging.
- **Spelling**: `testinginEditor.ts` (filename), `MultiplePprofFile` (should
  be `Pproj`), `getNounce` (should be `getNonce`), `standaloneServerpath`
  (should be `Path`). These leak into git history every time someone greps for
  them.

---

## 8. Recommended action plan (in order)

| Priority | Item | Effort |
|---|---|---|
| P0 | Remove hardcoded `/Users/esthersu/...` path (§1.1) | 15 min |
| P0 | Fix `Configuration` section name + declare missing settings (§1.2) | 30 min |
| P0 | Replace `cd X ; cmd` with `ShellExecution(cmd, { cwd: X })` (§1.3, §3.1) | 1 hr |
| P0 | Scope all keybindings to `editorLangId == p` (§4) | 15 min |
| P1 | Add Open VSX publishing step (§2.1) | 30 min |
| P1 | Bump engine to `^1.79.0` and declare `extensionKind` / `capabilities` (§2.2, §2.7) | 30 min |
| P1 | Add cross-OS CI workflow (§6.1) | 1 hr |
| P1 | Replace `spawn(command, { shell: true })` with argv form (§3.3) | 30 min |
| P2 | Marketplace metadata, README expansion, CHANGELOG (§5) | 2 hr |
| P2 | Implement `deactivate()` and dispose resources (§7) | 30 min |
| P2 | Drop dead test scaffold or wire `@vscode/test-electron` (§6.2) | 2–6 hr |
| P3 | Migrate `var` → `const`/`let` via `eslint --fix`; add config (§6.4, §7) | 1 hr |
| P3 | Cleanup misleading view text, theme contribution, naming (§7) | 1 hr |

The P0 items together are roughly half a day of work and would move the
extension from "subtly broken on non-author machines" to "shippable on Cursor,
VSCodium, Windsurf, and Windows VS Code".

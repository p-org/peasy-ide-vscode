# Peasy: An Easy-to-Use Development Environment for P

[P](https://p-org.github.io/P/) is a state machine based programming language
for formal modeling and analysis of distributed systems. Peasy is a step
towards making application of P in practice *easy-peasy* 😃.

**Peasy** is a VS Code language extension for the P language. It supports
syntax highlighting, compilation and error reporting, unit testing, state
machine visualization, and error tracing visualization. Visit the
[Peasy webpage](https://p-org.github.io/peasy-ide-vscode/) for in-depth
descriptions and demo videos.

## Supported IDEs

Peasy targets the VS Code extension API and works in any IDE that consumes
VS Code-compatible extensions:

| IDE | Install via | Notes |
|---|---|---|
| **VS Code** | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=PLanguage.peasy-extension) | Officially published |
| **Cursor** | [Open VSX](https://open-vsx.org/) | Install from the in-app extensions panel |
| **VSCodium** | Open VSX | |
| **Windsurf** | Open VSX | |
| **Gitpod / code-server** | Open VSX | Desktop-only; the extension shells out to `p` and `dotnet` |

The extension is **desktop-only** (`extensionKind: ["workspace", "ui"]`). It
will not load in vscode.dev / github.dev because P compilation requires the
`p` CLI on PATH.

## Prerequisites

- **P CLI** — install per [P's docs](https://p-org.github.io/P/getstarted/install/).
  After installation, `p --version` must succeed from a fresh shell.
- **.NET SDK** (ASP.NET Core Runtime 5.0 or 6.0) — required by the P toolchain.

## Settings

All settings live under the `p-vscode` namespace:

| Setting | Default | Description |
|---|---|---|
| `p-vscode.schedules` | `1000` | Schedule count for `p check` runs in the testing panel. |
| `p-vscode.additionalArgs` | `""` | Extra args passed to `p check`. |
| `p-vscode.pcompile.exclude` | `["**/Build/*", "**/build/**"]` | Globs excluded from `.pproj` discovery. |
| `p-vscode.trace.server` | `"off"` | LSP trace level (`off` / `messages` / `verbose`). |
| `p-vscode.dotnetExecutablePath` | `""` | Absolute path to `dotnet`. Empty → resolve from PATH. |
| `p-vscode.languageServer.cliPath` | `""` | Absolute path to `PLanguageServer.dll`. |
| `p-vscode.languageServer.launchArgs` | `[]` | Extra args for the language server. |

## Keybindings

All keybindings are scoped to P files (`editorLangId == p`) so they don't
interfere with the host IDE's defaults when you're editing other files.

| Key | Action |
|---|---|
| `F5` / `Ctrl+B` | Compile the current P project |
| `F7` | Compile in Stately visualization mode |
| `F6` | Open the Peasy trace visualizer |
| `F4` / `Ctrl+L` | Show the project file picker |

## Development

```bash
npm install
npm run watch          # incremental webpack build
# In a separate VS Code window: F5 → "Run with default server"
```

Useful scripts:

| Script | Purpose |
|---|---|
| `npm run compile` | One-shot dev build |
| `npm run package` | Production build (used by CI) |
| `npm run lint` | ESLint over `src/` |
| `npm run typecheck` | `tsc --noEmit` |

CI builds on Ubuntu, macOS and Windows on every PR (see
`.github/workflows/ci.yml`). Releases auto-publish to both the VS Marketplace
and Open VSX (see `.github/workflows/publish-extension.yml`).

<p align="left">
With ❤️ from the P Team @ Amazon Web Services (AWS).
</p>

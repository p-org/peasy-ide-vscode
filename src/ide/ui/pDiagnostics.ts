// Parses the diagnostics printed by `p compile`.
//
// Up to P 3.0 the compiler prints the tag on a line of its own and the error
// on the next one:
//
//   [Error:]
//   [PSrc/A.p:9:4] could not find variable 'x'
//
// From P 3.1 both are on one line, and every error is reported, not just the
// first:
//
//   [Error:] [PSrc/A.p:9:4] could not find variable 'x'
//   [Parser Error:] [A.p] parse error: line 96:14 mismatched input '{' ...
//
// Type error paths are relative to the compiler's working directory and
// columns are 1-based. Parse errors name only the file and come straight from
// ANTLR, so their columns are 0-based.

export interface PDiagnostic {
  kind: "type" | "parse";
  // Relative to the compile's working directory for type errors; a bare file
  // name for parse errors.
  file: string;
  // 0-based, as vscode.Position expects.
  line: number;
  character: number;
  message: string;
}

// eslint-disable-next-line no-control-regex
const ANSI_ESCAPE = /\u001b\[[0-9;]*[A-Za-z]/g;
const TYPE_ERROR = /^\[(.+?):(\d+):(\d+)\] (.*)$/;
const PARSE_ERROR = /^\[(.+?)\] parse error: line (\d+):(\d+) (.*)$/;

export function parsePDiagnostics(output: string): PDiagnostic[] {
  const lines = output.replace(ANSI_ESCAPE, "").split(/\r?\n/);
  const diagnostics: PDiagnostic[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const tag = line.startsWith("[Error:]")
      ? "[Error:]"
      : line.startsWith("[Parser Error:]")
      ? "[Parser Error:]"
      : undefined;
    if (!tag) {
      continue;
    }
    let body = line.slice(tag.length).trim();
    if (body === "" && i + 1 < lines.length) {
      body = lines[++i].trim();
    }

    const typeError = TYPE_ERROR.exec(body);
    if (typeError) {
      diagnostics.push({
        kind: "type",
        file: typeError[1],
        line: Number(typeError[2]) - 1,
        character: Math.max(Number(typeError[3]) - 1, 0),
        message: typeError[4],
      });
      continue;
    }
    const parseError = PARSE_ERROR.exec(body);
    if (parseError) {
      diagnostics.push({
        kind: "parse",
        file: parseError[1],
        line: Number(parseError[2]) - 1,
        character: Number(parseError[3]),
        message: parseError[4],
      });
    }
  }
  return diagnostics;
}

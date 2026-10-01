import { promises as fs } from "fs";
import * as path from "path";

export interface PProject {
  // Directory containing the .pproj; compiles run here.
  dir: string;
  pprojPath: string;
}

// Directories of the projects that need recompiling when `files` change: the
// project containing each file and, unless `withIncluding` is false, every
// project that includes one of those, directly or transitively, via
// <IncludeProject>.
export async function affectedProjectDirs(
  files: string[],
  projects: PProject[],
  withIncluding = true
): Promise<string[]> {
  const includedBy = withIncluding ? await includedByMap(projects) : new Map<string, string[]>();
  const affected = new Set<string>();
  const pending = files
    .map((f) => owningProjectDir(f, projects))
    .filter((dir): dir is string => dir !== undefined);
  while (pending.length > 0) {
    const dir = pending.pop() as string;
    if (!affected.has(dir)) {
      affected.add(dir);
      pending.push(...(includedBy.get(dir) ?? []));
    }
  }
  return [...affected];
}

// The deepest project directory containing `file`.
export function owningProjectDir(file: string, projects: PProject[]): string | undefined {
  return projects
    .map((p) => p.dir)
    .filter((dir) => file.startsWith(dir + path.sep))
    .sort((a, b) => b.length - a.length)[0];
}

// Maps a project directory to the directories of the projects including it.
async function includedByMap(projects: PProject[]): Promise<Map<string, string[]>> {
  const includedBy = new Map<string, string[]>();
  for (const project of projects) {
    for (const included of await readIncludes(project)) {
      includedBy.set(included, [...(includedBy.get(included) ?? []), project.dir]);
    }
  }
  return includedBy;
}

const INCLUDE_PROJECT = /<IncludeProject>\s*(.*?)\s*<\/IncludeProject>/g;

async function readIncludes(project: PProject): Promise<string[]> {
  let xml: string;
  try {
    xml = await fs.readFile(project.pprojPath, "utf8");
  } catch {
    return [];
  }
  return [...xml.matchAll(INCLUDE_PROJECT)].map((m) =>
    path.dirname(path.resolve(project.dir, m[1]))
  );
}

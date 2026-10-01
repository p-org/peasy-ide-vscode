<style>
  .md-typeset h1,
  .md-content__button {
    display: none;
  }
  
</style>

<div align="center">
  <h2>Compiling Code</h2>
</div>

## **Automatic Compilation**

Compiling P programs is now super easy with Peasy!

Peasy compiles a P project with `p compile` whenever one of its P files changes, whether you save it or it changes on disk, for example after a `git checkout`. Opening a file compiles its project too, unless nothing changed since the last compile. To compile the current project yourself, press ++ctrl++ + ++b++ or ++f5++.

Compilation runs in the background. The `P` item in the status bar spins while compiling, then shows a check mark or the number of errors. Hover over it to see the result for each project, or click it to show or hide the full compiler output. The item appears only while you edit a P file or another file in a P project.

A P file outside any project, with no `.pproj` file in its folder or a parent folder, is not compiled. The item then shows a warning; hover over or click it to see why. Pressing ++ctrl++ + ++b++ or ++f5++ tells you so too.

??? note "Demo Video: How to compile code in Peasy?"

    <figure class="video_container">
      <video controls="true" allowfullscreen="true"  >
        <source src="../videos/basic_compilation.mov" type="video/mp4">
      </video>
    </figure>

## **Error Reporting**

Peasy underlines compilation errors in the editor and lists them in the `Problems` panel. You can jump to the error location by simply clicking the error.

??? note "Demo Video: Where to view compilation errors in Peasy?"

    <figure class="video_container">
      <video controls="true" allowfullscreen="true"  >
        <source src="../videos/error_reporting.mov" type="video/mp4">
      </video>
    </figure>

## **Compiling Multiple Projects**

Peasy compiles the P project that contains the file you save or are editing, along with every project that includes it through `<IncludeProject>`, so workspaces with several P projects need no setup. Each project keeps the errors of its last compile, so compiling one project leaves the errors of the others in place.

For files outside every project, press ++ctrl++ + ++l++ or ++f4++ to pick which P project to compile.

## **Configuring Automatic Compilation**

Workspaces with many P projects can take a while to compile. These settings control what compiles automatically:

| Setting | Default | Description |
|---|---|---|
| `p-vscode.compile.onChange` | `true` | Compile when P files change on disk. |
| `p-vscode.compile.onOpen` | `true` | Compile the project of an opened file if it changed since its last compile. |
| `p-vscode.compile.includingProjects` | `true` | Also compile the projects that include a compiled project. |

To turn automatic compilation off, set `onChange` and `onOpen` to `false`; ++ctrl++ + ++b++ or ++f5++ still compile on demand.

??? note "Demo Video: How to compile multiple projects in Peasy?"

    <figure class="video_container">
      <video controls="true" allowfullscreen="true"  >
        <source src="../videos/mult_compilation.mov" type="video/mp4">
      </video>
    </figure>
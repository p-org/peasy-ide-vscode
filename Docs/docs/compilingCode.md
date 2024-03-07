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

Simply `Save` in VS Code editor and your project will be automatically compiled using the `p compile` command. Alternatively, you can press ++ctrl++ + ++b++ or ++f5++ to compile the current project.

??? note "Demo Video: How to compile code in Peasy?"

    <figure class="video_container">
      <video controls="true" allowfullscreen="true"  >
        <source src="../videos/basic_compilation.mov" type="video/mp4">
      </video>
    </figure>

## **Error Reporting**

Peasy reports compilation errors in the `Problems` panel.
If compiling a P project with ++ctrl++ + ++b++ or ++f5++ triggers errors, you can simply open the `Problems` panel in VS Code to view all compilation errors. You can jump to the error location by simply clicking the error.

??? note "Demo Video: Where to view compilation errors in Peasy?"

    <figure class="video_container">
      <video controls="true" allowfullscreen="true"  >
        <source src="../videos/error_reporting.mov" type="video/mp4">
      </video>
    </figure>

## **Compiling Multiple Projects**

When working in a directory with a single P project, Peasy automatically identifies the P project.

**But what if there are multiple P projects in the same directory?**

To select another P project, press ++ctrl++ + ++l++ or ++f4++. This will trigger a pop-up that shows all the available P projects in your current working directory. Simply click or select one of them to change the current P project!

??? note "Demo Video: How to compile multiple projects in Peasy?"

    <figure class="video_container">
      <video controls="true" allowfullscreen="true"  >
        <source src="../videos/mult_compilation.mov" type="video/mp4">
      </video>
    </figure>
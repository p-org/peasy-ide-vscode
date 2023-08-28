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

Simply press ++f5++ or `Save` in VS Code and your project will automatically compile the current P project with the `p compile` command.

<figure class="video_container">
  <video controls="true" allowfullscreen="true" style="width: 100%;" >
    <source src="../videos/basic_compilation.mov" type="video/mp4">
  </video>
</figure>

## **Error Reporting**

Peasy automatically detects compilation errors in your P project. There are two types of compile-time errors in P: Parse Errors and Type Errors.

If compiling a P project with ++f5++ triggers errors, you can simply open the `Problems` panel in VS Code to view all compilation errors in the current P project. Then, you can jump to the error location by simply clicking the error.

<figure class="video_container">
  <video controls="true" allowfullscreen="true" style="width: 100%;" >
    <source src="../videos/error_reporting.mov" type="video/mp4">
  </video>
</figure>

## **Compiling Multiple Projects**

When working in a directory with a single P project, Peasy automatically identifies the P project.

**But what if there are multiple P projects in the same directory?**

To select another P project, press ++f4++. This will trigger a pop-up that shows all the available P projects in your current working directory. Simply click or select one of them to change the current P project!

<figure class="video_container">
  <video controls="true" allowfullscreen="true" style="width: 100%;" >
    <source src="../videos/mult_compilation.mov" type="video/mp4">
  </video>
</figure>
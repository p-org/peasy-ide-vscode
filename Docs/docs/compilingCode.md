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
Compiling in P is made easy with this addition to our extension!

Simple press ++f5++ or `Save` in your VSCode terminal and your project will automatically compile the current P project folder with the `p compile` command.

The Peasy extension also handles cases where there are multiple P project files in the current working directory. Press ++f4++ and a pop-up will appear, displaying all the P projects inside of the folder. Select the project you want to work on at the moment, and that project will compile every time you press ++f5++.

<figure class="video_container">
  <video controls="true" allowfullscreen="true" >
    <source src="../videos/basic_compilation.mov" type="video/mp4">
  </video>
</figure>

## **Compiling Multiple Projects**

When working in a P project directory with a single project, the Peasy extension handles which project is compiled for you!

**But what if there are multiple projects within a single directory?**

To select another project that compiles after pressing ++f5++ and `Save`, press ++f4++. This will trigger a pop-up that shows all the available P projects available to compile in your current working directory. Simply click or select the project you wish to compile automatically, and change the selected project later as needed!

<figure class="video_container">
  <video controls="true" allowfullscreen="true" >
    <source src="../videos/mult_compilation.mov" type="video/mp4">
  </video>
</figure>

## **Error Reporting**

The Peasy extension automatically detects errors in P. There are two types of errors in P: Parse Errors and Type Errors.

If compiling a P project with ++f5++ triggers errors, the user may simply open the `Problems` panel in VSCode to view all the errors within their project. Then, users can navigate to the location of the error by simply clicking the error.

<figure class="video_container">
  <video controls="true" allowfullscreen="true" >
    <source src="../videos/error_reporting.mov" type="video/mp4">
  </video>
</figure>
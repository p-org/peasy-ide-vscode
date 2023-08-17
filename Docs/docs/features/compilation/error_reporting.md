<style>
  .md-typeset h1,
  .md-content__button {
    display: none;
  }
  
</style>

<div align="center">
  <h2>Error Reporting in Peasy</h2>
</div>

Peasy automatically detects compilation errors in your P project. There are two types of compile-time errors in P: Parse Errors and Type Errors.

If compiling a P project with ++f5++ triggers errors, you can simply open the `Problems` panel in VS Code to view all compilation errors in the current P project. Then, you can jump to the error location by simply clicking the error.

<figure class="video_container">
  <video controls="true" allowfullscreen="true" >
    <source src="../../../videos/error_reporting.mov" type="video/mp4">
  </video>
</figure>

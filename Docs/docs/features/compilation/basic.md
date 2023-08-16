<style>
  .md-typeset h1,
  .md-content__button {
    display: none;
  }
  
</style>

<div align="center">
  <h2>Automatic Compilation in Peasy</h2>
</div>
Compiling in P is made easy with this addition to our extension!

Simple press `F5` or `Save` in your VSCode terminal and your project will automatically compile the current P project folder with the `p compile` command.

The Peasy extension also handles cases where there are multiple P project files in the current working directory. Press `F4` and a pop-up will appear, displaying all the P projects inside of the folder. Select the project you want to work on at the moment, and that project will compile every time you press `F5`.

<figure class="video_container">
  <video controls="true" allowfullscreen="true" >
    <source src="../../../videos/compilation.mov" type="video/mp4">
  </video>
</figure>

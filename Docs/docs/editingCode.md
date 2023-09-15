<style>
  .md-typeset h1,
  .md-content__button {
    display: none;
  }
  
</style>

<div align="center">
  <h2>Editing Code</h2>
</div>

## **Syntax Highlighting**

Syntax highlighting in P makes developing P programs easier, faster, and more enjoyable.

We created a Custom P theme that we suggest, but feel free to change the theme to whatever you like!

Here is a sample of syntax highlighting for the [Two Phase Commit](https://github.com/p-org/P/tree/master/Tutorial/2_TwoPhaseCommit) protocol from the P tutorial. 


<div class="screenshots" markdown="1">
  <img src="../images/syntax_highlighting.png" alt="Syntax Highlighting" >
</div>

## **Snippet Auto-Completion**

Coding in P is now much easier with snippets! Snippets allow P developers to complete templates of repeating code patterns in P, such as state machines, P statements, test cases, and more. Snippets appear through **Intellisense** when you type out the beginning of P keywords such as **machine** or **test** or **send**.

After selecting a particular snippet, press `Tab` in order to jump to edit each placeholder in the snippet.

Snippets help P developers code faster and easier because they don't need to refer back to documentation for help when coding common data structures in P.

??? note "Demo Video: Coding P with snippets in Peasy!"
    
    <figure class="video_container">
      <video controls="true" allowfullscreen="true"  >
        <source src="../videos/snippets.mov" type="video/mp4">
      </video>
    </figure>
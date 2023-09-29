<style>
  .md-typeset h1,
  .md-content__button {
    display: none;
  }
  
</style>

<div align="center">
  <h2>How to Run P Test Cases</h2>
</div>

Testing P programs is also super easy with Peasy!

Simply click the :material-play-outline: button next to a test case to run it. 

The Testing Panel in VS Code lists all P test cases. In this panel, click the :material-play-outline: button to run test cases or jump to the corresponding test case in the P program by pressing the icon right next to :material-play-outline: button. 

??? note "Demo Video: How to run P test cases in Peasy?"

    <figure class="video_container">
      <video controls="true" allowfullscreen="true" >
        <source src="../videos/test_framework.mov" type="video/mp4">
      </video>
    </figure>



**Configuring Test Case Settings**

Peasy lets you configure the number of schedules to explore for test cases. Simply add the ***"p-vscode.schedules"*** key and specify your preferred value in the VS Code `settings.json` file. Run the testcases from the testing panel, and the extension will automatically check each test case for the specified number of schedules.

```
{
  "p-vscode.schedules": <number_of_schedules>
}
```

??? note "Example: Customizing number of schedules for test cases"
  
    For example, when you add the below key-value pair to your VS Code settings.json file, each test case will be checked for 2000 schedules.
    ```
    {
      "p-vscode.schedules": 2000
    }
    ```
<style>
  .md-typeset h1,
  .md-content__button {
    display: none;
  }
  
</style>

<div align="center">
  <h2>Installing Peasy</h2>
</div>

## **Installation**

**[Step 1] Install P**

Follow the [installing P](https://p-org.github.io/P/getstarted/install/) instructions to install P locally (version >= 2.0.20), depending on your platform.


??? note "Make sure that you installed the right version of P (i.e., version >= 2.0.20)"
    
    Run `p --version` command to get the version of P

**[Step 2] Install VS Code**

Follow the [VS Code](https://code.visualstudio.com/docs) documentation to download and install VS Code (version >= 1.78.0) based on the platform you are using.

??? note "Make sure that you installed the right version of VS Code (i.e., version >= 1.78.0)"

    To get the version of VS Code
      
      - On macOS, go to Code > About Visual Studio Code.
      
      - On Windows and Linux, go to Help > About.


**[Step 3] Install Peasy Extension**

??? hint "Click [here](vscode:extension/PLanguage.peasy-extension) to open Peasy extension in VS Code"
    Manually install:
    * Open VS Code
    * Select "View" and then click "Extensions" to open Extension View. Alternatively, use the Extensions shortcut on the left side navigation bar
    * Enter [*"Peasy Extension"*](vscode:extension/PLanguage.peasy-extension) in the marketplace search box and select the extension
    * Click on the "Install" button to download and install the Peasy extension

!!! success "It is recommended to restart the VS Code after installation"

## **Creating your First P Project**

Read the [Structure of a P Program](https://p-org.github.io/P/advanced/structureOfPProgram/) and [P Project file](https://p-org.github.io/P/advanced/PProject/) pages to understand a P project structure.

Your First P Project's structure should look like this:
```
My_First_P_Project
|
+-- PSpec
|   +-- ExampleSpecFile.p
+-- PSrc
|   +-- ExampleSrcFile.p
+-- PTst
|   +-- TestDriver.p
|   +-- Testscript.p
+-- MyFirstPProject.pproj
```
There are many [tutorial projects](https://github.com/p-org/P/tree/master/Tutorial) that can help you get started with your first P project. Read the [tutorials](https://p-org.github.io/P/tutsoutline/) page for detailed explanations.

## **Running P program** 

**Compiling P Project**

Press ++ctrl++ + ++b++ or ++f5++ or simply `Save` in your VS Code editor and your project will automatically compile the current P project folder.

Alternatively, you can compile your P project manually by running `p compile` in your terminal. Read [compiling a P program](https://p-org.github.io/P/getstarted/usingP/) page for more details.

**Running P Testcases**

Navigate to the Testing Panel in VS Code and click on the play button to run the desired testcases. Read [running testcases](runningTestcases.md) section in the user guide for more details.
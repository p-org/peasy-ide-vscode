<style>
  .md-typeset h1,
  .md-content__button {
    display: none;
  }
  
</style>

<div align="center">
  <h2>Getting Started</h2>
</div>

## **Prerequisites**

* P
* VS Code
* PEasy VS Code Extension

## **Installation**

**Installing P**

Follow the [Installing P](https://p-org.github.io/P/getstarted/install/) page to install P based on the platform you are using

**Installing VS Code**

Follow the [VS Code](https://code.visualstudio.com/docs) documentation to download and install VS Code based on the platform you are using

**Installing PEasy**

* Open VS Code
* Select View and then click Extensions to open Extension View. Alternatively, you can also click on the Extensions shortcut on the left side navigation bar
* Enter *"P Extension"* in the marketplace search box and select the extension
* Click on the install button to download and install the PEasy extension

!!! note

    It is recommended to restart the VS Code after installation

## **Creating your First P Project**

Read the [Structure of a P Program](https://p-org.github.io/P/advanced/structureOfPProgram/) and [P Project file](https://p-org.github.io/P/advanced/PProject/) pages to understand a P project structure

Your First P Project structure should look like this:
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
There are many [tutorial projects](https://github.com/p-org/P/tree/master/Tutorial) that can help you get started with your first P project. Read the [tutorials](https://p-org.github.io/P/tutsoutline/) page for detailed explanation

## **Running P program** 

**Compiling P Project**

Press ++f5++ or `Save` in your VSCode and your project will automatically compile the current P project folder

Alternatively, you can compile your P project manually by running `p compile` in your terminal. Read [Compiling a P Program](https://p-org.github.io/P/getstarted/usingP/) page for more details.

**Running P Testcases**

Navigate to the Testing Panel in VSCode and click on the play button to run the desired testcases. Read [Running Testcases](runningTestcases.md) section in the user guide for more details.
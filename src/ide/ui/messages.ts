export namespace Messages {
  export namespace CompilationStatus {
    export const NoPprojFile =
      "The current directory does not contain ANY local *.pproj folder. Compilation is impossible.";
    export const MultiplePprofFile =
      "The current directory contains multiple *.pproj folders. Please select which project to compile.";
    export const NoDirectory = "The current directory is invalid.";
    export const Visualization = `
Code Generation Success!!
Visualize P state machines by copy-and-pasting code from the following file: 
`;
  }

  export namespace Compiler {
    export const CustomArgumentsPrompt = "P Compilation Arguments";
    export const NoArgumentsGiven = "No additional arguments given";
  }

  export namespace Installation {
    export const noP = `
      P LANGUAGE is not installed on your computer! 
      Automatic Compilation and P testing capabilities will not work. 
      Download P at https://p-org.github.io/P/getstarted/install/. 
      Then, reload VS Code.`;
    export const Start = "Starting P installation";
    export const Error = "An error occurred during the installation of P.";
    export const Completed = "P installation completed";
    export const Outdated = "Your P installation is outdated: ";
  }

  export namespace Dotnet {
    export const IsNotAnExecutableFile = " is not an executable dotnet file.";
    export const NotASupportedDotnetInstallation =
      " is not a compatible dotnet file. P requires the ASP.NET Core Runtime 5.0 or 6.0, got ";
    export const FailedDotnetExecution =
      "Failed to execute dotnet. P requires the ASP.NET Core Runtime 5.0 or 6.0.";
    export const NoCompatibleInstallation =
      "No compatible dotnet runtime found. P requires the ASP.NET Core Runtime 5.0 or 6.0.";
    export const ChangeConfiguration = "Configure the absolute path to dotnet";
    export const VisitDownload = "Get .NET SDK";
    export const DownloadUri =
      "https://dotnet.microsoft.com/download/dotnet/6.0";
  }
}

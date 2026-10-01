export namespace Messages {
  export namespace CompilationStatus {
    export const NoPprojFile = "Nothing to compile: the workspace has no .pproj file.";
    export const NoDirectory = "Open a folder with a .pproj file to compile.";
    export const NotInProject = (file: string) =>
      `${file} is not compiled, because no .pproj file is in its folder or a parent folder.`;
  }

  export namespace Compiler {
    export const CustomArgumentsPrompt = "P Compilation Arguments";
    export const NoArgumentsGiven = "No additional arguments given";
  }

  export namespace Installation {
    export const noP = `P LANGUAGE is not installed on your computer! Automatic Compilation and P testing capabilities will not work. Download P at https://p-org.github.io/P/getstarted/install/. Then, reload VS Code.`;
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

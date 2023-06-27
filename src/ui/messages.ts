export namespace Messages {
    export namespace CompilationStatus {
      export const Parsing = '$(sync~spin) Parsing...';
      export const Resolving = '$(sync~spin) Resolving...';
      export const ParsingFailed = '$(thumbsdown) Parsing Failed';
      export const ResolutionFailed = '$(thumbsdown) Resolution Failed';
      export const PreparingVerification = '$(sync~spin) Preparing verification...';
      export const CompilationSucceeded = '$(book) Resolved (not verified)';
      export const Verifying = '$(sync~spin) Verifying';
      export const VerificationSucceeded = '$(thumbsup) Verification Succeeded';
      export const VerificationFailedOld = '$(thumbsdown) Verification Failed';
      export const VerificationFailed = '$(thumbsdown) Could not prove';
  
      export const Verified = '$(thumbsup) Verified';
      export const NotVerified = '$(thumbsdown) Not Verified';
    }
  
    export namespace Compiler {
      export const CustomArgumentsPrompt = 'P Compilation Arguments';
      export const NoArgumentsGiven = 'No additional arguments given';
    }
  
    export namespace Installation {
      export const Start = 'Starting P installation';
      export const Error = 'An error occurred during the installation of P.';
      export const Completed = 'P installation completed';
      export const Outdated = 'Your P installation is outdated: ';
    }
  
    export namespace Dotnet {
      export const IsNotAnExecutableFile = ' is not an executable dotnet file.';
      export const NotASupportedDotnetInstallation = ' is not a compatible dotnet file. P requires the ASP.NET Core Runtime 5.0 or 6.0, got ';
      export const FailedDotnetExecution = 'Failed to execute dotnet. P requires the ASP.NET Core Runtime 5.0 or 6.0.';
      export const NoCompatibleInstallation = 'No compatible dotnet runtime found. P requires the ASP.NET Core Runtime 5.0 or 6.0.';
      export const ChangeConfiguration = 'Configure the absolute path to dotnet';
      export const VisitDownload = 'Get .NET SDK';
      export const DownloadUri = 'https://dotnet.microsoft.com/download/dotnet/6.0';
    }
  }
  
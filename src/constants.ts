export namespace LanguageConstants {
    export const Id = 'p';
    export const LanguageServerId = 'p-vscode'
  }
  
  export namespace ExtensionConstants {
    export const ChannelName = 'P VSCode';
  }
  
  export namespace ConfigurationConstants {
    export const SectionName = 'p';
  
    export const Version = 'version';
  
    export namespace Dotnet {
      export const ExecutablePath = 'dotnetExecutablePath';
    }
  
    export namespace LanguageServer {
      export const CliPath = 'cliPath';
      export const LaunchArgs = 'languageServerLaunchArgs';

    }
  
  }
  

  export namespace DotnetConstants {
    export const ExecutableName = 'dotnet';
    export const SupportedRuntimesPattern = /Microsoft\.AspNetCore\.App\s*[56]\.0/i;
  }
  

  export namespace TestResults {
    export const Pass = "TEST_PASSED"
    export const Fail = "TEST_FAILED"
    export const Error = "TEST_ERRORED"
  }
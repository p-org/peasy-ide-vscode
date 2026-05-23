export namespace LanguageConstants {
  export const Id = 'p';
  export const LanguageServerId = 'p-vscode';
}

export namespace ExtensionConstants {
  export const ChannelName = 'P VSCode';
}

export namespace ConfigurationConstants {
  // Must match the namespace used in package.json `contributes.configuration`.
  export const SectionName = 'p-vscode';

  export const Version = 'version';

  export namespace Dotnet {
    export const ExecutablePath = 'dotnetExecutablePath';
  }

  export namespace LanguageServer {
    export const CliPath = 'languageServer.cliPath';
    export const LaunchArgs = 'languageServer.launchArgs';
  }

  export namespace Test {
    export const Schedules = 'schedules';
    export const AdditionalArgs = 'additionalArgs';
  }

  export namespace Compile {
    export const Exclude = 'pcompile.exclude';
  }

  export namespace Trace {
    export const Server = 'trace.server';
  }
}

export namespace DotnetConstants {
  export const ExecutableName = 'dotnet';
  export const SupportedRuntimesPattern = /Microsoft\.AspNetCore\.App\s*[56]\.0/i;
}

export namespace TestResults {
  export const Pass = 'TEST_PASSED';
  export const Fail = 'TEST_FAILED';
  export const Error = 'TEST_ERRORED';
}

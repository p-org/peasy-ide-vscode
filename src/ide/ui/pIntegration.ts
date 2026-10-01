import { PInstaller } from "../language/PInstallation";
import AutoFormatting from "./autoFormatting";
import CompileCommands from "./compileCommands";
import TestingEditor from "./testinginEditor";
import Visualizer from "./visualizer";

export default async function createAndRegisterPIntegration(
  installer: PInstaller
): Promise<void> {
  // Compiles and runs P projects
  await CompileCommands.createAndRegister(installer.context);

  // Testing framework
  await TestingEditor.createAndRegister(installer.context);

  // Auto-formatting
  AutoFormatting.createAndRegister();

  // Trace visualization
  Visualizer.createAndRegister(installer.context);
}

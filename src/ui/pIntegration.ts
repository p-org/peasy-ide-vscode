import { PInstaller } from "../language/PInstallation";
import AutoFormatting from "./autoFormatting";
import CompileCommands from "./compileCommands";
import RelatedErrorView from "./relatedErrorView";
import TestingEditor from "./testinginEditor";
import Visualizer from "./visualizer";

export default async function createAndRegisterPIntegration(
  installer: PInstaller
): Promise<void> {
  await CompileCommands.createAndRegister(installer.context);
  //Compiles and Runs P folders

  RelatedErrorView.createAndRegister(installer.context);
  //Error Panel

  TestingEditor.createAndRegister(installer.context);
  //Testing Framework

  //Auto Formatting
  AutoFormatting.createAndRegister();

  //Trace Visualization
  Visualizer.createAndRegister(installer.context);
}

import { PInstaller } from "../language/PInstallation";
import AutoFormatting from "./autoFormatting";
import CompileCommands from "./compileCommands";
import RelatedErrorView from "./relatedErrorView";
import TestingEditor from "./testinginEditor";
import Visualizer from "./visualizer";

export default async function createAndRegisterPIntegration(installer: PInstaller): Promise<void> {
    await CompileCommands.createAndRegister(installer.context);
    RelatedErrorView.createAndRegister(installer.context);
    TestingEditor.createAndRegister(installer.context);
    AutoFormatting.createAndRegister();
    Visualizer.createAndRegister(installer.context);
}
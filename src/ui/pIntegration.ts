import { PInstaller } from "../language/PInstallation";
import CompileCommands from "./compileCommands";
import RelatedErrorView from "./relatedErrorView";
import TestingEditor from "./testinginEditor";

export default async function createAndRegisterPIntegration(installer: PInstaller): Promise<void> {
    await CompileCommands.createAndRegister(installer.context);
    RelatedErrorView.createAndRegister(installer.context);
    TestingEditor.createAndRegister(installer.context);
}
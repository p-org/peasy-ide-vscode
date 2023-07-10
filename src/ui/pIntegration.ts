import { PInstaller } from "../language/PInstallation";
import CompileCommands from "./compileCommands";
import RelatedErrorView from "./relatedErrorView";
import TestingEditor from "./testinginEditor";

export default function createAndRegisterPIntegration(installer: PInstaller): void {
    CompileCommands.createAndRegister();
    RelatedErrorView.createAndRegister(installer.context);
    TestingEditor.createAndRegister(installer.context);
}
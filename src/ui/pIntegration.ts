import { PInstaller } from "../language/PInstallation";
import RelatedErrorView from "./relatedErrorView";
import TestingEditor from "./testinginEditor";

export default function createAndRegisterPIntegration(installer: PInstaller): void {
    RelatedErrorView.createAndRegister(installer.context);
    TestingEditor.createAndRegister(installer.context);
    // CompileCommands.createAndRegister();
}
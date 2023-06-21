import { PInstaller } from "../language/PInstallation";
import CompileCommands from "./compileCommands";
import RelatedErrorView from "./relatedErrorView";

export default function createAndRegisterPIntegration(installer: PInstaller): void {
    RelatedErrorView.createAndRegister(installer.context);
    // CompileCommands.createAndRegister();
}
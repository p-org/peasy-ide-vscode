import { PInstaller } from "../language/PInstallation";
import CompileCommands from "./compileCommands";
import GutterIcon from "./gutterIcon";
import RelatedErrorView from "./relatedErrorView";

export default function createAndRegisterPIntegration(installer: PInstaller): void {
    RelatedErrorView.createAndRegister(installer.context);
    // GutterIcon.createAndRegister(installer.context);
    // CompileCommands.createAndRegister();
}
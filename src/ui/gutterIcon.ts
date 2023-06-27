import * as vscode from 'vscode';
export default class GutterIcon {
    static icon = vscode.window.createTextEditorDecorationType({
        gutterIconPath: '/Users/esthersu/peasy-esther/tulip.png', 
        gutterIconSize: 'contain'
    })
    static instance: GutterIcon;

    public static createAndRegister(context: vscode.ExtensionContext) : GutterIcon {
        GutterIcon.instance = new GutterIcon();
        const regEx = Text 
        const text = vscode.window.activeTextEditor?.document.getText();

        vscode.window.activeTextEditor?.setDecorations(GutterIcon.icon, [
            {
                range: new vscode.Range(new vscode.Position(0,0), new vscode.Position(0,0))
            }
        ])
        GutterIcon.instance.updateDecorations();
        return GutterIcon.instance;
    }

    public updateDecorations() {
        const regEx = /test/g;
        const text = vscode.window.activeTextEditor?.document.getText();
        const testLocations: vscode.DecorationOptions[] = []
        let match;
        if (text !== undefined) {
            while ((match = regEx.exec(text))) {
                const matchPos =  vscode.window.activeTextEditor?.document.positionAt(match.index).line;
                if (matchPos !== undefined) {
                    const startPos = new vscode.Position(matchPos, 0);
                    const endPos = new vscode.Position(matchPos, 0)
                    testLocations.push({range: new vscode.Range(startPos, endPos)})
                }
            }
        }
        vscode.window.activeTextEditor?.setDecorations(GutterIcon.icon, testLocations)
    }

}
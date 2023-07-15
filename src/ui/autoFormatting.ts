import * as vscode from 'vscode';
import { integer } from 'vscode-languageclient';

export default class AutoFormatting {

    public static createAndRegister(): AutoFormatting {
        vscode.languages.registerDocumentFormattingEditProvider(
            'p', {
                provideDocumentFormattingEdits(document:vscode.TextDocument):vscode.TextEdit[] 
                {   
                    var edits:vscode.TextEdit[] = [];
                    var line = 0;
                    while (line < document.lineCount) 
                    {
                        if (document.lineAt(line).text.endsWith('{') && line + 1< document.lineCount) {
                            var edit = formatDocumentBeginBracket(document, line);
                            if (edit != undefined) {
                                edits.push(edit);
                            }
                        }
                        line = line + 1;
                    }
                    return edits;
                }
            }
        )

        return new AutoFormatting();
    }
}

/*  
Case for after { shows up at the end of the line.
 */
function formatDocumentBeginBracket(document:vscode.TextDocument, line:integer) {
 
    if (document.lineAt(line).firstNonWhitespaceCharacterIndex == document.lineAt(line+1).firstNonWhitespaceCharacterIndex) {
        return vscode.TextEdit.insert(new vscode.Position(line+1, 0), '\t');
    }
    else {
        return undefined;
    }
}
import { Uri, Range as VsRange, Position as VsPosition, DocumentFilter as VsDocumentFilter } from 'vscode';
import { DocumentUri, Range, Position, DocumentFilter } from 'vscode-languageclient';
import { LanguageConstants } from '../../constants';

export function getVsDocumentPath(params: { uri: DocumentUri }): string {
  return Uri.parse(params.uri).toString();
}

export const PDocumentFilter: DocumentFilter & VsDocumentFilter = {
    scheme: 'file',
    language: LanguageConstants.Id
  };
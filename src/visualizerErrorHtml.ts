import { IShiVizScriptsUri } from "./web/types/shiviz";

const traceNotFoundHtml = (
  stylesUriMap: IShiVizScriptsUri,
  errorMessage: string
) => `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <link href="${stylesUriMap["shivizStylesUri"]}" type="text/css" rel="stylesheet">
                  <link href="${stylesUriMap["stylesResetUri"]}" type="text/css" rel="stylesheet">
                  <link href="${stylesUriMap["stylesMainUri"]}" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>
                ${errorMessage}
            </h1>
        </body>
    </html>
`;

export default traceNotFoundHtml;

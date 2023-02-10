import { render } from "preact-render-to-string";
import { minify } from "html-minifier";

export function jsxViewEngine(filePath: any, options: any, callback: any) {
  import(filePath).then((module) => {
    try {
      const el = module.default(options);

      const rendered = /*html*/ `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/x-icon" href="/public/favicon.ico">
        <title>${options.title ?? "Document"}</title>
        <link rel="stylesheet" href="/static/index.css">
      </head>
      <body>
        ${render(el)}
      </body>
      </html>`;

      callback(
        null,
        minify(rendered, { removeComments: true, collapseWhitespace: true })
      );
    } catch (error) {
      return callback(error);
    }
  }, callback);
}

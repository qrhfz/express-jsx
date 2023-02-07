import { FunctionComponent, RenderableProps } from "preact";
import { Response } from "express";
import { render } from "preact-render-to-string";

export type Meta = { name: string; content: string };

export type Opts<T> = {
  title?: string;
  metas?: Meta[];
  props: RenderableProps<T>;
};

export function renderJSX<T = {}>(
  res: Response,
  component: FunctionComponent<T>,
  opts: Opts<T>,
) {
  const { title, metas, props } = opts;

  const el = component(props);

  if (!el) {
    throw new Error("failed to render");
  }

  const rendered = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="/public/favicon.ico">
    <title>${title ?? "Document"}</title>
    <link rel="stylesheet" href="/static/index.css">
    ${metaTags(metas)}
  </head>
  <body>
    ${render(el)}
  </body>
  </html>`;

  res.type("html");
  res.send(rendered);
}

const metaTags = (metas?: Meta[]) => {
  if (!metas) {
    return "";
  }

  return metas.map(({ content, name }) => {
    return `<meta name="${name}" content="${content}" />`;
  }).join("\n");
};

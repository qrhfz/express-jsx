import preact, { FunctionComponent, h, JSX, RenderableProps } from "preact";
import { Response } from "express";
import { render } from "preact-render-to-string";

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
  <link rel="stylesheet" href="/public/index.css">
  {{head}}
</head>
<body>
  {{embed}}
</body>
</html>
`;

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

  res.type("html");

  if (!el) {
    throw new Error("failed to render");
  }

  const rendered = html
    .replace("{{embed}}", render(el))
    .replace("{{title}}", title ?? "Document")
    .replace("{{head}}", metaTags(metas));

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

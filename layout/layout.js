const express = require("express");
const Layout = require("@podium/layout");
const utils = require("@podium/utils");

const app = express();

const layout = new Layout({
  name: "Layout",
  pathname: "/",
  development: true,
  logger: console,
});

const podletA = layout.client.register({
  name: "podlet-a",
  uri: "http://localhost:7100/manifest.json",
  resolveJs: true,
  resolveCss: true,
});

const podletB = layout.client.register({
  name: "podlet-b",
  uri: "http://localhost:7200/manifest.json",
  resolveJs: true,
  resolveCss: true,
});

const podletC = layout.client.register({
  name: "podlet-c",
  uri: "http://localhost:7300/manifest.json",
  resolveJs: true,
  resolveCss: true,
});

app.use(layout.middleware());

layout.view(
  (incoming, body, head) => `<!doctype html>
<html lang="${incoming.context.locale}">
    <head>
        <meta charset="${incoming.view.encoding}">
        ${incoming.css.map(utils.buildLinkElement).join("\n")}
        ${incoming.js.map(utils.buildScriptElement).join("\n")}
        <title>${incoming.view.title}</title>
        ${head}
    </head>
    <body>
        ${body}
    </body>
</html>`
);

app.get(layout.pathname(), async (req, res, next) => {
  const incoming = res.locals.podium;

  const podlets = await Promise.all([
    podletA.fetch(incoming),
    podletB.fetch(incoming),
    podletC.fetch(incoming),
  ]);

  incoming.view.title = "Podium Layout";
  incoming.podlets = podlets;

  const head = `
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  `;

  const body = `
  <section>
    ${podlets[0].content}
    ${podlets[1].content}
    ${podlets[2].content}
  </section>
`;
  const document = layout.render(incoming, body, head);
  res.send(document);
});

app.get(`${layout.pathname()}page`, async (req, res, next) => {
  const incoming = res.locals.podium;

  const podlets = await Promise.all([
    podletA.fetch(incoming),
    podletB.fetch(incoming),
  ]);

  incoming.view.title = "Podium Layout";
  incoming.podlets = podlets;

  const head = `
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  `;

  const body = `
  <section>
    ${podlets[0].content}
    ${podlets[1].content}
  </section>
`;

  const document = layout.render(incoming, body, head);
  res.send(document);
});

app.listen(7000, () => console.log("Layout listening on port 7000"));

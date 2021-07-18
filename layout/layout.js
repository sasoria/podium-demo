const express = require("express");
const setupLayout = require("./setup/setupLayout");

const app = express();

const { layout, podletA, podletB, podletC } = setupLayout();

app.use(layout.middleware());

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

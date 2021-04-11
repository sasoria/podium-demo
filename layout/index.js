const express = require("express");
const Layout = require("@podium/layout");

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

app.get(layout.pathname(), async (req, res, next) => {
  const incoming = res.locals.podium;
  incoming.view.title = "Podium Layout";

  const podlets = await Promise.all([
    podletA.fetch(incoming),
    podletB.fetch(incoming),
    podletC.fetch(incoming),
  ]);

  podlets.map((podlet) => {
    layout.css(podlet.css);
    layout.js(podlet.js);
  });

  res.podiumSend(
    `<section>
       ${podlets[0].content}
       ${podlets[1].content}
       ${podlets[2].content}
    </section>`
  );
});

app.listen(7000, () => console.log("Layout listening on port 7000"));

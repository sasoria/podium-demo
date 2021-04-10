const express = require("express");
const Layout = require("@podium/layout");

const app = express();

const layout = new Layout({
  name: "Layout",
  pathname: "/",
  development: true,
  logger: console,
});

const podlet = layout.client.register({
  name: "podlet",
  uri: "http://localhost:7100/manifest.json",
  resolveJs: true,
  resolveCss: true,
});

app.use(layout.middleware());

app.get(layout.pathname(), async (req, res, next) => {
  const incoming = res.locals.podium;
  incoming.view.title = "Podium Layout";
  const response = await podlet.fetch(incoming);

  layout.css(response.css);
  layout.js(response.js);

  res.podiumSend(
    `<section>
       ${response}
    </section>`
  );
});

app.listen(7000, () => console.log("Layout listening on port 7000"));

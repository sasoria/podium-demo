const express = require("express");
const Podlet = require("@podium/podlet");

const podlet = new Podlet({
  name: "podlet",
  version: "1.0.0",
  pathname: "/",
  content: "/",
  fallback: "/fallback",
  development: true,
});

podlet.css({ value: "/dist/index.css" });
podlet.js({ value: "/dist/index.js" });

const app = express();
app.use(podlet.middleware());

app.use("/dist", express.static("./dist"));

app.get(podlet.content(), (req, res) => {
  res.status(200).podiumSend(`
        <div class="podlet-c">
            This is the podlet-c content
        </div>
    `);
});

app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});

app.listen(7300, () => console.log("Podlet listening on port 7300"));

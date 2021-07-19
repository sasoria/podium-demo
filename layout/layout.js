const express = require("express");
const setupLayout = require("./setup/setupLayout");
const handleHome = require("./handlers/handleHome");
const handlePage = require("./handlers/handlePage");

const app = express();

const { layout, podletA, podletB, podletC } = setupLayout();

const homePodlets = [podletA, podletB, podletC];
const firstPagePodlets = [podletA, podletB];
const secondPagePodlets = [podletA, podletC];
const thirdPagePodlets = [podletB, podletC];

app.use(layout.middleware());

app.get(layout.pathname(), handleHome(layout, homePodlets));

app.get(
  `${layout.pathname()}pages/first`,
  handlePage(layout, firstPagePodlets)
);

app.get(
  `${layout.pathname()}pages/second`,
  handlePage(layout, secondPagePodlets)
);

app.get(
  `${layout.pathname()}pages/third`,
  handlePage(layout, thirdPagePodlets)
);

app.listen(7000, () => console.log("Layout listening on port 7000"));

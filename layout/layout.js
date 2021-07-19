const express = require("express");
const setupLayout = require("./setup/setupLayout");
const handleHome = require("./handlers/handleHome");
const handlePage = require("./handlers/handlePage");

const app = express();

const { layout, podletA, podletB, podletC } = setupLayout();

const homePodlets = [podletA, podletB, podletC];
const firstPodlets = [podletA, podletB];
const secondPodlets = [podletA, podletC];
const thirdPodlets = [podletB, podletC];

app.use(layout.middleware());

app.get(layout.pathname(), handleHome(layout, homePodlets));

app.get(`${layout.pathname()}pages/first`, handlePage(layout, firstPodlets));

app.get(`${layout.pathname()}pages/second`, handlePage(layout, secondPodlets));

app.get(`${layout.pathname()}pages/third`, handlePage(layout, thirdPodlets));

app.listen(7000, () => console.log("Layout listening on port 7000"));

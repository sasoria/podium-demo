const express = require("express");
const setupLayout = require("./setup/setupLayout");
const handleHome = require("./handlers/handleHome");
const handlePage = require("./handlers/handlePage");

const app = express();

const { layout, podletA, podletB, podletC } = setupLayout();

const homePodlets = [podletA, podletB, podletC];
const pagePodlets = [podletA, podletB];

app.use(layout.middleware());

app.get(layout.pathname(), handleHome(layout, homePodlets));

app.get(`${layout.pathname()}page`, handlePage(layout, pagePodlets));

app.listen(7000, () => console.log("Layout listening on port 7000"));

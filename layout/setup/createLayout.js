const Layout = require("@podium/layout");

const createLayout = () => {
  return new Layout({
    name: "Layout",
    pathname: "/",
    development: true,
    logger: console,
  });
};

module.exports = createLayout;

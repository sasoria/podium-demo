const createLayout = require("./createLayout");
const registerPodlets = require("./registerPodlets");
const registerView = require("./registerView");

const setupLayout = () => {
  const layout = createLayout();
  const registeredPodlets = registerPodlets(layout);
  registerView(layout);

  return {
    layout,
    ...registeredPodlets,
  };
};

module.exports = setupLayout;

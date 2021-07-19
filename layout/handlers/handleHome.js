const { head, homeBody, pageBody } = require("../templates/templates");

const handleHome = (layout, [podletA, podletB, podletC]) => {
  return async (req, res, next) => {
    const incoming = res.locals.podium;

    const podlets = await Promise.all([
      podletA.fetch(incoming),
      podletB.fetch(incoming),
      podletC.fetch(incoming),
    ]);

    incoming.view.title = "Podium Layout";
    incoming.podlets = podlets;

    const document = layout.render(incoming, homeBody(podlets), head);
    res.send(document);
  };
};

module.exports = handleHome;

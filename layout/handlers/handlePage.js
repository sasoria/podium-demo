const { head, indexBody, pageBody } = require("../templates/templates");

const handlePage = (layout, [podletA, podletB]) => {
  return async (req, res, next) => {
    const incoming = res.locals.podium;

    const podlets = await Promise.all([
      podletA.fetch(incoming),
      podletB.fetch(incoming),
    ]);

    incoming.view.title = "Podium Layout";
    incoming.podlets = podlets;

    const document = layout.render(incoming, pageBody(podlets), head);
    res.send(document);
  };
};

module.exports = handlePage;

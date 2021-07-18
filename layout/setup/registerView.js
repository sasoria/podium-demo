const utils = require("@podium/utils");

const registerView = (layout) => {
  layout.view(
    (incoming, body, head) => `<!doctype html>
      <html lang="${incoming.context.locale}">
          <head>
              <meta charset="${incoming.view.encoding}">
              ${incoming.css.map(utils.buildLinkElement).join("\n")}
              ${incoming.js.map(utils.buildScriptElement).join("\n")}
              <title>${incoming.view.title}</title>
              ${head}
          </head>
          <body>
              ${body}
          </body>
      </html>`
  );
};

module.exports = registerView;

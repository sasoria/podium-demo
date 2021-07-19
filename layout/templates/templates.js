const head = `
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
`;

const indexBody = (podlets) => `
  <section>
    ${podlets[0].content}
    ${podlets[1].content}
    ${podlets[2].content}
  </section>
`;

const pageBody = (podlets) => `
  <section>
    ${podlets[0].content}
    ${podlets[1].content}
  </section>
`;

module.exports = {
  head,
  indexBody,
  pageBody,
};

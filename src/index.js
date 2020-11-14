const express = require('express');
const Layout = require('@podium/layout');

const app = express();

const layout = new Layout({
  name: 'Layout',
  pathname: '/demo',
});

const podlet = layout.client.register({
  name: 'podlet',
  uri: 'http://localhost:7100/manifest.json',
});

app.use(layout.middleware());

app.get('/demo', async (req, res) => {
  const incoming = res.locals.podium;
  const response = await podlet.fetch(incoming);

  incoming.view.title = 'My Super Page';

  res.podiumSend(
    `<div>
       ${response}
    </div>`
  );
});

app.listen(7000, () => (
  console.log('Layout listening on port 7000')
));

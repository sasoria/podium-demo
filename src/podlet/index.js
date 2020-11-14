const express = require('express');
const Podlet = require('@podium/podlet');

const app = express();

const podlet = new Podlet({
  name: 'podlet',
  version: '1.0.0',
  pathname: '/',
  content: '/',
  fallback: '/fallback',
  development: true,
});

app.use(podlet.middleware());

app.get(podlet.content(), (req, res) => {
  res.status(200).podiumSend(`
        <div>
            This is the podlet's HTML content
        </div>
    `);
});

// podlet.css({ value: '/assets/index.css' });

app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});

app.listen(7100, () => (
  console.log('Podlet listening on port 7100'))
);

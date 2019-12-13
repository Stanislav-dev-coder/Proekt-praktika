const next = require('next');
const express = require('express');
const path = require('path');
const routes = require('./routes');

const PUBLIC_PATH = path.join(__dirname, '../public');
const PORT = process.env.PORT;
const IS_DEV_MODE = process.env.NODE_ENV !== 'production';

const app = next({ dev: IS_DEV_MODE });
const handler = routes.getRequestHandler(app);

// With express
app.prepare().then(() => {
  express()
    .set('trust proxy', true)
    .use(function(req, _res, next) {
      req.ip =
        req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      next();
    })
    .use(handler)

    .get('/robots.txt', function(_req, res) {
      return res.status(200).sendFile('/robots.txt', {
        root: path.join(PUBLIC_PATH, 'robots.txt'),
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      });
    })

    .listen(PORT);
});

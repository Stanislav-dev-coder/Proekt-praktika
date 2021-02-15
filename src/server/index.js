const path = require('path');
const next = require('next');
const express = require('express');
const getRequestHandler = require('../modules/ch/next-router/getRequestHandler');
const routes = require('./routes');

const PUBLIC_PATH = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
const IS_DEV_MODE = process.env.NODE_ENV !== 'production';

const app = next({ dev: IS_DEV_MODE });
const handler = getRequestHandler(app, routes);

app.prepare().then(() => {
  express()
    .set('trust proxy', true)
    .use(function (req, _res, next) {
      req.ip =
        req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      next();
    })

    .get('/robots.txt', function (_req, res) {
      return res.status(200).sendFile('/robots.txt', {
        root: path.join(PUBLIC_PATH, 'robots.txt'),
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      });
    })

    .use(handler)
    .listen(PORT);
});

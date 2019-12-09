const next = require('next');
const express = require('express');

const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app);
const port = process.env.PORT || 3000;

// With express
app.prepare().then(() => {
  express()
    .set('trust proxy', true)
    .use(function(req, res, next) {
      req.ip =
        req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      next();
    })
    .use(handler)
    .listen(port);
});

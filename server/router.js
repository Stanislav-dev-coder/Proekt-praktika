const router = require('../utils/router');

module.exports = router.initMap({
  '/': '/home',
  '/kit': '/kit',
  '/user/:slug': '/user',
});

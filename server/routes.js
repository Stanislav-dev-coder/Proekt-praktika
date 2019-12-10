const routes = (module.exports = require('next-routes')());

routes.add('home', '/', 'index');
routes.add('example', '/example', 'example');
routes.add('kit', '/kit', 'kit');

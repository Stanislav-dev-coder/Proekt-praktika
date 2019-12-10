const routes = (module.exports = require('next-routes')());

routes.add('home', '/', 'home');
routes.add('example', '/example', 'example');
routes.add('kit', '/kit', 'kit');

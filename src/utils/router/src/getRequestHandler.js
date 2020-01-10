const Router = require('./Router');

/** middleware для сервера.
 * Метод возвращает функцию слушателя, которая должна
 * обрабатывать все GET запросы к серверу. После вызова
 * функции, обработчик проверяет url на соответствие роуту
 * в экземпляре класса и передает соответствующим методам NextJS.
 *
 * @param {NextServer} app
 * @param {RouterMap} routerMap
 * @return {(req: Request, res: Response) => void}
 */
function getRequestHandler(app, routes) {
  const router = new Router();
  const nextHandler = app.getRequestHandler();

  if (router.routes === null) {
    router.initMap(routes);
  }

  return (req, res) => {
    const parsedURL = router.parseURL(req.url);
    const route = router.findRoute(parsedURL);

    if (route === null) {
      nextHandler(req, res, parsedURL);
    } else {
      app.render(req, res, route.page, {
        ...parsedURL.query,
        ...route.getParams(parsedURL.pathname),
      });
    }
  };
}

module.exports = getRequestHandler;

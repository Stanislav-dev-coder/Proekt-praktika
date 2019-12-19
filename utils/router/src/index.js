const Route = require('./Route');
const { parse: urlParser } = require('url');

/**
 * @typedef {import("url").UrlWithStringQuery} UrlWithStringQuery
 * @typedef {import("./Route").RoutePathname} RoutePathname
 * @typedef {import("./Route").RoutePage} RoutePage
 * @typedef {import("../types/Router").NextServer} NextServer
 * @typedef {import("../types/Router").RouterMap} RouterMap
 */
class Router {
  constructor() {
    /** @type {Map.<RoutePathname, RoutePathname>} */
    this.routes = null;

    // TODO: Нужно добавить ограничение мемоизации во избежание утечек
    // oldURLs = null; // url которые использовались реже всех
    // parsedURLsMaxSize = 30;
    this.parsedURLs = new Map();
  }

  /** Инициализация карты маршрутов для роутера.
   * Данный метод должен вызываться перед инициализацией
   * слушателя `getRequestHandler` для сервера.
   *
   * Все роуты записываются в `Map` коллекцию для
   * более быстрого получения доступа к роутам.
   *
   * @param {RouterMap} routerMap
   * @return {Router}
   */
  initMap(routerMap) {
    this.routes = Object.entries(routerMap).reduce((routes, routeEntry) => {
      const [pathname] = routeEntry;

      if (!routes.has(pathname)) {
        routes.set(pathname, new Route(...routeEntry));
      }

      return routes;
    }, new Map());

    return this;
  }

  /** Мемоизация парсинга url.
   *
   * Поскольку парсинг url через регулярные выражения достаточно
   * ресурсозатратный, добавлен обработчик который запоминает все url
   * которые вводит пользователь.
   *
   * @param {string} url
   * @return {UrlWithStringQuery}
   */
  parseURL(url) {
    if (this.parsedURLs.has(url)) {
      return this.parsedURLs.get(url);
    }

    this.parsedURLs.set(url, urlParser(url, true));

    return this.parsedURLs.get(url);
  }

  /** Поиск роута по распаршеному url.
   * @param {UrlWithStringQuery} url
   * @return {Route | null}
   */
  findRoute({ pathname }) {
    let foundRoute = null;

    // TODO: Можно мемоизировать найденые роуты
    if (this.routes.has(pathname)) {
      foundRoute = this.routes.get(pathname);
    } else {
      for (let route of this.routes) {
        if (route[1].has(pathname)) {
          foundRoute = route[1];
          break;
        }
      }
    }

    return foundRoute;
  }

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
  getRequestHandler(app, routes) {
    const nextHandler = app.getRequestHandler();

    if (this.routes === null) {
      this.initMap(routes);
    }

    return (req, res) => {
      const parsedURL = this.parseURL(req.url);
      const route = this.findRoute(parsedURL);

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
}

module.exports = new Router();

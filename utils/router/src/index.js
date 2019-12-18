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

  /**
   * @param {RouterMap} routerMap
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

  /**
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

  /**
   * @param {NextServer} app
   * @return {(req: Request, res: Response) => void}
   */
  getRequestHandler(app) {
    const nextHandler = app.getRequestHandler();

    return (req, res) => {
      const parsedURL = this.parseURL(req.url);
      const route = this.findRoute(parsedURL);

      if (route === null) {
        nextHandler(req, res, parsedURL);
      } else {
        app.render(req, res, route.page, {
          ...parsedURL.query,
          ...parsedURL.params,
        });
      }
    };
  }
}

module.exports = new Router();

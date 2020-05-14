const memoize = require('memoizee');
const Route = require('./Route');
const urlParser = require('./urlParser');

const URL_CACHE_SIZE = 100;

/**
 * @typedef {import("url").UrlWithStringQuery} UrlWithStringQuery
 * @typedef {import("./Route").RoutePathname} RoutePathname
 * @typedef {import("./Route").RoutePage} RoutePage
 * @typedef {import("next/dist/next-server/server/next-server").default} NextServer
 * @typedef {Object.<string, string>} RouterMap
 */
class Router {
  /** @param {{ urlCacheSize: number }} options */
  constructor(options = {}) {
    const { urlCacheSize = URL_CACHE_SIZE } = options;

    /** @type {Map.<RoutePathname, RoutePathname>} */
    this.routes = null;
    this.parseURL = memoize(urlParser, { max: urlCacheSize });
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
    if (!this.routes) {
      this.routes = Object.entries(routerMap).reduce((routes, routeEntry) => {
        const [pathname] = routeEntry;

        if (!routes.has(pathname)) {
          routes.set(pathname, new Route(...routeEntry));
        }

        return routes;
      }, new Map());
    }

    return this;
  }

  /** Поиск роута по распаршеному url.
   * @param {UrlWithStringQuery} url
   * @return {Route | null}
   */
  findRoute({ host, pathname }) {
    let foundRoute = null;

    // Ссылка с хостом — внешняя, а значит не проходит через роутер
    if (!host) {
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
    }

    return foundRoute;
  }

  /** Поиск роута по строке url.
   * @param {string} url
   * @return {Route | null}
   */
  findRouteByURL(url) {
    if (!url) {
      return null;
    }

    return this.findRoute(this.parseURL(url));
  }
}

module.exports = Router;

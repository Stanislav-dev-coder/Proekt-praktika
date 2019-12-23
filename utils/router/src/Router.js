const Route = require('./Route');
const { parse: urlParser } = require('url');

/**
 * @typedef {import("url").UrlWithStringQuery} UrlWithStringQuery
 * @typedef {import("./Route").RoutePathname} RoutePathname
 * @typedef {import("./Route").RoutePage} RoutePage
 * @typedef {import("next/dist/next-server/server/next-server").default} NextServer
 * @typedef {Object.<string, string>} RouterMap
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
  findRoute({ host, pathname }) {
    let foundRoute = null;

    // Ссылка с хостом — внешняя, а значит не проходит через роутер
    if (!host) {
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
    }

    return foundRoute;
  }

  /** Поиск роута по строке url.
   * @param {string} url
   * @return {Route | null}
   */
  findRouteByURL(url) {
    const parsedURL = this.parseURL(url);

    return this.findRoute(parsedURL);
  }
}

module.exports = Router;

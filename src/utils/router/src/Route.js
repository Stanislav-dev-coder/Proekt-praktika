const { pathToRegexp } = require('path-to-regexp');

/**
 * @typedef {import("path-to-regexp").Key} Key
 * @typedef {string} Route
 * @typedef {string} RoutePage
 */
class Route {
  /**
   * @param {Route} route
   * @param {RoutePage} page
   */
  constructor(route, page) {
    const parsedRoute = this.constructor.parseRoute(route);

    this.page = page;
    this.route = route;
    this.routeRegex = parsedRoute.regExp;
    this.paramsNames = parsedRoute.paramsNames;
  }

  /** Парсинг строки роута.
   * Получает регулярное выражение и список с метаинформацией
   * о параметрах роута.
   *
   * @param {string} route
   * @return {{ regexp: RegExp, paramsPatterns: Key[] }}
   */
  static parseRoute(route) {
    const paramsNames = [];
    const regExp = pathToRegexp(route, paramsNames);

    return { regExp, paramsNames };
  }

  /** Проверка на соответствие роута заданному url.
   * @param {string} url
   */
  has(url) {
    return this.routeRegex.test(url);
  }

  /** Получение параметров из роута.
   *
   * @param {string} url
   * @return {Object.<string, string>}
   * @example
   * const route = new Route('/user/:userName', '/user');
   *
   * route.getParams('/user/u123'); // { userName: 'u123' }
   */
  getParams(url) {
    const execUrl = this.routeRegex.exec(url);

    if (!execUrl || execUrl.length === 0) {
      return {};
    }

    return this.routeRegex.exec(url).reduce((params, value, parameterIndex) => {
      const parameter = this.paramsNames[parameterIndex - 1];

      if (parameter && value !== undefined) {
        params[parameter.name] = value;
      }

      return params;
    }, {});
  }
}

module.exports = Route;

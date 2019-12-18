const { pathToRegexp } = require('path-to-regexp');

/**
 * @typedef {string} RoutePathname
 * @typedef {string} RoutePage
 */
class Route {
  /**
   * @param {RoutePathname} pathname
   * @param {RoutePage} page
   */
  constructor(pathname, page) {
    this.pathname = pathname;
    this.page = page;
    this.pathnameRegex = pathToRegexp(pathname);
  }

  /**
   * @param {string} url
   */
  has(url) {
    return this.pathnameRegex.exec(url);
  }
}

module.exports = Route;

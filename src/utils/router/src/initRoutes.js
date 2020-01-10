/** Метод для инициализации роутов.
 * Добавляет assetPrefix ко всем роутам.
 *
 * @param {string} assetPrefix
 * @param {Object.<string, string>} routes
 * @return {Object.<string, string>}
 */
module.exports = function initRoutes(assetPrefix = '', routes) {
  return Object.entries(routes).reduce((routesWithPrefix, route) => {
    const path = route[1];
    const page = assetPrefix && route[0] === '/' ? '' : route[0];
    const newRoutePathname = `${assetPrefix}${page}`;

    routesWithPrefix[newRoutePathname] = path;

    return routesWithPrefix;
  }, {});
};

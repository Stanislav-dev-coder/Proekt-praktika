const { parse } = require('url');

/** Парсинга url. query преобразуется в объект.
 * @param {string} url
 * @return {UrlWithStringQuery}
 */
module.exports = function urlParser(url) {
  return parse(url, true);
};

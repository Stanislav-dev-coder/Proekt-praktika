const DEFAULT_OPTIONS = { prefix: '?' };

/** Конвертирует объект в строку из query параметров.
 * @param {Object.<string, string>} queryProperties
 * @param {{ prefix: string }} options
 * @return {string}
 */
export default function objectToQuery(queryProperties, options = DEFAULT_OPTIONS) {
  const { prefix } = options;

  // Если не объект
  if (typeof queryProperties !== 'object' && !(queryProperties instanceof Object)) {
    return '';
  }

  return Object.entries(queryProperties).reduce((queryString, property) => {
    if (queryString !== prefix) {
      queryString += '&';
    }

    return `${queryString}${encodeURIComponent(property[0])}=${encodeURIComponent(property[1])}`;
  }, prefix);
}

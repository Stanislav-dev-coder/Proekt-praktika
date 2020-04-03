/** Проверка на внешний url.
 * @param {string} url - Не обязательный
 * @return {boolean}
 */
export default function isExternalUrl(url) {
  return Boolean(url && url.indexOf('://') !== -1);
}

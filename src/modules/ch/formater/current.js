/** Форматирование числа в строку валюты.
 * @param {number} value
 * @param {number} digits
 * @param {string} separator - разделитель для плавающей точки
 * @example
 * current(12345); // 12 345
 * current(1234567); // 1 234 567
 */
export default function current(value, digits = 0, separator = '.') {
  const parts = String(parseFloat(value).toFixed(digits)).split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  if (digits === 0) {
    return parts[0];
  }

  parts[1] = parts[1].replace(/0*$/, '');

  if (parts[1].length === 0) {
    return parts[0];
  }

  return parts.join(separator);
}

/**
 * Проверка зажатой мета клавиши.
 *
 * @param {KeyboardEvent | MouseEvent} event
 * @return {boolean}
 */
export default function isModifiedEvent(event) {
  return Boolean(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

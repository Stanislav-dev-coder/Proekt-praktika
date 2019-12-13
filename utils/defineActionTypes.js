/** @typedef ActionTypeName @type {string} */
/** @typedef ActionTypes @type {object} @property {string} [name] */

const PREFIX = '@';
const DIVIDER = '/';

/** Привязка типов к редюсерам.
 *
 * Возвращает объект где ключ — это элемент массива `actionTypesNames`,
 * а значение — это конкатинированная
 * строка `PREFIX.namespace.DIVIDER.actionTypesNames[i]`
 *
 * @param {string} namespace
 * @param {ActionTypeName[]} actionTypesNames
 * @return {ActionTypes}
 */
export default function defineActionTypes(namespace, actionTypesNames) {
  const actionTypes = {};

  actionTypesNames.forEach(name => {
    actionTypes[name] = PREFIX + namespace + DIVIDER + name;
  });

  return actionTypes;
}

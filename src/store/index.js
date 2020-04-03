// eslint-disable-next-line no-unused-vars
import Redux, { combineReducers } from 'redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import home from './home';

/** @typedef InitialState @type {object}
 * @typedef DefaultState @type {object} */

const DEFAULT_STATE = {}; // Всегда должен быть объект

/** @type {Redux.Store<rootReducer> | null} */
let store = null;
let devtools = func => func;
const rootReducer = combineReducers({
  home,
});

if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

/** Возвращает текущий store.
 * @return {Redux.Store<rootReducer>}
 */
export function getStore() {
  return store;
}

/** Метод для инициализации redux-store.
 * Если store уже инициализирован, возвращает его.
 *
 * @param {InitialState | DefaultState} initialState
 * @return {Redux.Store<rootReducer>}
 */
export default function getOrInitializeStore(initialState = DEFAULT_STATE) {
  // Create store if unavailable on the client and set it on the window object
  if (!store || typeof window === 'undefined') {
    store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk), devtools));
  }

  return store;
}

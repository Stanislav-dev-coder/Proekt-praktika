import axios from 'axios';
import extend from 'lodash/extend';

/**
 * @typedef Response
 * @type {object}
 */

/**
 * @typedef ErrorResponse
 * @type {object}
 */

/**
 * @typedef {{
 *  data: object,
 *  before: () => void,
 *  success: (response: object) => void,
 *  error: (error: object) => void,
 *  headers: object,
 *  baseURL: string,
 * }} Options
 */

/** Request to API.
 * @param {string} method
 * @param {string} url
 * @param {Options} options
 * @return {Promise<Response | ErrorResponse>}
 */
export default function request(method, url, options) {
  const params = {};
  const {
    data = {},
    before = () => {},
    success = () => {},
    error = console.log,
    headers = {},
    baseURL = process.env.API_URL,
  } = options;

  if (method === 'get') {
    extend(params, data);
  }

  before();

  return axios({
    method,
    baseURL,
    url,
    headers,
    params,
    data: method === 'get' ? {} : data,
  })
    .then(response => {
      success(response.data);

      return response;
    })
    .catch(response => {
      error(response);

      return response;
    });
}

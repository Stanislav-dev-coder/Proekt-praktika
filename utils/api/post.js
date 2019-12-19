import request from '../request';

/**
 * @typedef {import("./request").Options} Options
 * @typedef {import("./request").Response} Response
 * @typedef {import("./request").ErrorResponse} ErrorResponse
 */
/**
 * @param {string} url
 * @param {Options} options
 * @return {Promise<Response | ErrorResponse>}
 */
export default function post(url, options) {
  return request('post', url, options);
}

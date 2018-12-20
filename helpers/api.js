import axios from 'axios';
// import store from '../store';
// import { showError } from 'utils/notification';
import extend from 'lodash/extend';

// Request to API
export function request(method, url, options) {
	const {
		data = {},
		before = () => {},
		success = () => {},
		error = console.log,
		headers = {},
		baseURL = API_URL,
	} = options;

	const params = {
		lang: 'ru',
	};

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

// Request method aliases
export const get = (...args) => request('get', ...args);
export const post = (...args) => request('post', ...args);
export const put = (...args) => request('put', ...args);
export const patch = (...args) => request('patch', ...args);
export const del = (...args) => request('delete', ...args);

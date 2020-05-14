import CHRequest from '@ch/api';
import { DEFAULT_ERROR_MESSAGE } from 'constants/index';

/** Запрос к АПИ. */
export default function request(method, url, options = {}) {
  const requestOptions = {
    ...options,
    baseURL: process.env.API_URL,
  };

  return CHRequest(method, url, requestOptions)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return Promise.reject(
        (error.response && error.response.data) || {
          message: DEFAULT_ERROR_MESSAGE,
        },
      );
    });
}

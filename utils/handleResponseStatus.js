import get from 'lodash/get';

export default async ({ promise, serverRes }) => {
  const result = await promise;

  let status =
    get(result, `[${result.length - 1}].status`) ||
    get(result, `[${result.length - 1}].httpStatus`) ||
    result.status ||
    result.httpStatus ||
    200;

  if (serverRes) {
    serverRes.statusCode = status;
  }

  const answer = {
    pageProps: result[result.length - 1],
    status,
  };

  return answer;
};

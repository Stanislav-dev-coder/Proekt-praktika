const SUCCESS_CODE = 200;

/** Возвращает статус и пропсы компонента страницы.
 *
 * Для правильной работы, `requestFunction` должен возвращать `Promise.all`,
 * в котором первый параметр - `getInitialProps`компонента страницы.
 * В пропсы страницы попадает объект который возвращает `getInitialProps`.
 * Если в `return` указан промис, то будет возвращен его результат.
 *
 * Для определения статуса используется результат ответа от сервера
 * и статус промиса(try/catch).
 * @example
 *  static async getInitialProps({ Component, ctx }) {
 *    return await handleResponseStatus(ctx, () => {
 *      return Promise.all([
 *        Component.getInitialProps(ctx)
 *      ]);
 *    });
 *  }
 * @param {{ req: Request, res: Response, store: any }} ctx
 * @param {() => Promise<any>} requestFunction
 * @returns {{statusCode: number, isSuccessful: boolean, pageProps: any}
 */
export default function handleResponseStatus(ctx, requestFunction) {
  let statusCode =
    (ctx.res && ctx.res.statusCode) || (ctx.err && ctx.err.statusCode) || SUCCESS_CODE;

  // Если ошибка от сервера
  if (statusCode !== SUCCESS_CODE) {
    return {
      statusCode,
      isSuccessful: false,
      pageProps: {
        status: statusCode,
      },
    };
  }

  return requestFunction()
    .then(result => ({
      statusCode,
      isSuccessful: true,
      pageProps: (result && result[0]) || {},
    }))
    .catch(error => {
      const errorCode = error.status || error.statusCode || statusCode;

      if (process.env.NODE_ENV === 'development') {
        if (!error) console.error('reject should be not null');
      }

      if (ctx.res) {
        ctx.res.statusCode = errorCode;
      }

      return {
        statusCode: errorCode,
        isSuccessful: false,
        pageProps: error,
      };
    });
}

import handleResponseStatus from './index';

const asyncMockSuccess = jest.fn().mockResolvedValue([{ posts: [{ id: 1 }] }]);

const asyncMockFail = jest.fn().mockRejectedValue([{ posts: [{ id: 1 }] }]);

describe('@utils', () => {
  test('test 200', async () => {
    const ctx = {
      res: {
        statusCode: 200,
      },
    };

    const received = await handleResponseStatus(ctx, await asyncMockSuccess);

    const expected = await asyncMockSuccess(ctx).then(result => ({
      statusCode: ctx.res.statusCode,
      isSuccessful: true,
      pageProps: (result && result[0]) || {},
    }));
    expect(received).toEqual(expected);
  });

  test('test 500', async () => {
    const ctx = {
      res: {
        statusCode: 500,
      },
    };

    const received = await handleResponseStatus(ctx, await asyncMockFail);

    const expected = await asyncMockFail(ctx).catch(error => {
      return {
        statusCode: ctx.res.statusCode,
        isSuccessful: false,
        pageProps: {
          status: ctx.res.statusCode,
        },
      };
    });
    expect(received).toEqual(expected);
  });

  test('test undefined', async () => {
    const ctx = {};

    const received = await handleResponseStatus(ctx, await asyncMockFail);

    const expected = await asyncMockFail(ctx).catch(error => {
      return {
        statusCode: 500,
        isSuccessful: false,
        pageProps: error,
      };
    });
    expect(received).toEqual(expected);
  });

  test('test null', async () => {
    const ctx = {
      err: {
        statusCode: 500,
      },
    };

    const asyncMockFailWithNull = jest.fn().mockRejectedValue();

    const received = await handleResponseStatus(ctx, await asyncMockFailWithNull);

    const expected = await asyncMockFailWithNull(ctx).catch(error => {
      if (process.env.NODE_ENV === 'test') {
        if (!error) console.error('reject should be not null');
      }
      const errorCode = error.status || error.statusCode || statusCode;

      return {
        statusCode: errorCode,
        isSuccessful: false,
        pageProps: error,
      };
    });
    expect(received).toEqual(expected);
  });
});

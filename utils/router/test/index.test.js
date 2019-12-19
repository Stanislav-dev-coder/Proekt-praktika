const Router = require('../src/index');
const Route = require('../src/Route');

// TODO: Нужно Написать тест для getRequestHandler
describe('@router.Router - Основные методы', () => {
  beforeEach(() => {
    Router.initMap({
      '/': '/home',
      '/about': '/about',
      '/user/:userName': '/user',
    });
  });

  it('Router.parseURL - Мемоизация парсера', () => {
    Router.parseURL('/');
    Router.parseURL('/asd');
    Router.parseURL('/asd?asd=123');
    Router.parseURL('/');

    expect(Router.parsedURLs.size).toEqual(3);
  })

  it('Router.parseURL - Проверка пути и параметров', () => {
    expect(Router.parseURL('/')).toMatchObject({
      pathname: '/',
      query: {},
    });

    expect(Router.parseURL('/home?asd=1')).toMatchObject({
      pathname: '/home',
      query: {
        asd: "1",
      },
    });
  })

  it('Router.findRoute - Поиск роута', () => {
    expect(Router.findRoute({ pathname: '/' })).not.toBe(null);
    expect(Router.findRoute({ pathname: '/about' })).not.toBe(null);

    expect(Router.findRoute({ pathname: '/asd' })).toEqual(null);
    expect(Router.findRoute({ pathname: '/' }))
      .toMatchObject({
        page: '/home',
        route: '/',
      });
    expect(Router.findRoute({ pathname: '/user/test' }))
      .toMatchObject({
        page: '/user',
        route: '/user/:userName',
      });
  })
});

describe('@router.Route', () => {
  it('Route.has - Проверка на соответствие роута url', () => {
    const fakeRoute = new Route('/test/:var1/badu', '/');

    expect(fakeRoute.has('/test/qwe/badu')).toEqual(true);
    expect(fakeRoute.has('/test/g888712/badu')).toEqual(true);
    expect(fakeRoute.has('/test/qwe/badu/')).toEqual(true);
    expect(fakeRoute.has('/test/qwe')).toEqual(false);
  })

  it('Route.getParams - Проверка возвращаемых параметров из роута', () => {
    const fakeRoute = new Route('/test/:var1/test/:var2', '/');
    const fakeRoute2 = new Route('/test/:var1/test/:var2', '/');

    // with params
    expect(fakeRoute.getParams('/test/value-n-1/test/value-n-2')).toEqual({ var1: 'value-n-1', var2: 'value-n-2'});
    expect(fakeRoute.getParams('/test/null/test/name')).toEqual({ var1: 'null', var2: 'name'});
    expect(fakeRoute.getParams('/test/null/test/name')).not.toEqual({ var1: 'asd', var2: 'jkasdf'});
    expect(fakeRoute.getParams('/test/null/test')).not.toEqual({ var1: 'asd', var2: null});

    // without params
    expect(fakeRoute2.getParams('/test')).toEqual({});
  })
});

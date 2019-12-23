const Router = require('../src/Router');
const Route = require('../src/Route');

// TODO: Нужно Написать тест для getRequestHandler
describe('@router.Router - Основные методы', () => {
  let router = new Router();

  beforeEach(() => {
    router.initMap({
      '/': '/home',
      '/about': '/about',
      '/user/:userName': '/user',
    });
  });

  it('Router.parseURL - Мемоизация парсера', () => {
    router.parseURL('/');
    router.parseURL('/asd');
    router.parseURL('/asd?asd=123');
    router.parseURL('/');

    expect(router.parsedURLs.size).toEqual(3);
  })

  it('Router.parseURL - Проверка пути и параметров', () => {
    expect(router.parseURL('/')).toMatchObject({
      pathname: '/',
      query: {},
    });

    expect(router.parseURL('/home?asd=1')).toMatchObject({
      pathname: '/home',
      query: {
        asd: "1",
      },
    });
  })

  it('Router.findRoute - Поиск роута', () => {
    expect(router.findRoute({ pathname: '/' })).not.toBe(null);
    expect(router.findRoute({ pathname: '/about' })).not.toBe(null);

    expect(router.findRoute({ pathname: '/asd' })).toEqual(null);
    expect(router.findRoute({ pathname: '/' }))
      .toMatchObject({
        page: '/home',
        route: '/',
      });
    expect(router.findRoute({ pathname: '/user/test' }))
      .toMatchObject({
        page: '/user',
        route: '/user/:userName',
      });
  })

  it('Router.findRouteByURL - Поиск роута по строке url.', () => {
    expect(router.findRouteByURL('http://www.my-site.com/')).toEqual(null);

    expect(router.findRouteByURL('/')).toMatchObject({
      page: '/home',
      route: '/',
    });

    expect(router.findRouteByURL('/user/has87d?qwe=1231')).toMatchObject({
      page: '/user',
      route: '/user/:userName',
    });

    expect(router.findRouteByURL('/#wtf?a=!false')).toMatchObject({
      page: '/home',
      route: '/',
    });

    expect(router.findRouteByURL('/user/has87d?qwe=1231')).toMatchObject({
      page: '/user',
      route: '/user/:userName',
    });

    expect(router.findRouteByURL('http://ya.ru/user/has87d?qwe=1231')).toEqual(null);
  })
});

// TODO: Добавить тест для .parseRoute
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

const Router = require('../src/index');

// TODO: Нужно Написать тест для getRequestHandler
describe('@router - Основные методы', () => {
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
      query: {}
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
        pathname: '/',
      });
    expect(Router.findRoute({ pathname: '/user/test' }))
      .toMatchObject({
        page: '/user',
        pathname: '/user/:userName',
      });
  })
});

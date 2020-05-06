# chulakov-next-router

> **ВАЖНО:** любые изменения пакета должны быть согласованы с тимлидом!

Роутер работает только в связке с [chulakov.react-template](https://bitbucket.org/OlegChulakovStudio/chulakov.react-template/src/master/) и [next/router](https://nextjs.org/docs#routing).

## Вдохновление

Поскольку для роутера NextJS необходимо указание путей к файлам страниц в каталоге `pages.**/*.js`, реализация динамических ссылок очень болезнена. Из-за этого появляется излишнее дублирование кода и теряется гибкость использования маршрутизации. Такое поведение связано с тем, что клиентская часть приложения должна знать какие файлы необходимо загрузить для каждой страницы, а серверная — какие файлы отдать на клиент.

## Реализация

Роутер разделен на две части, клиент и сервер, которые используют одну карту маршрутов и ядро роутера `@ch/next-router/src/Router.js`. Серверная часть, создает middleware для node сервера, которое обрабатывает все входящие запросы. Если путь соответствует хотябы одному маршруту, вызывается рендер соответствующей страницы. Клиентская часть, использует `React.createContext` для передачи экземпляра роутера дочерним компонентам. Все компоненты [<Link />](#markdown-header-link) подписаны на контекст и подставляют нужные пути к компонентам страниц для `next/router`.

Чтобы уменьшить нагрузку на сервер, данные приходящие в обработчики парсинга мемоизируются и имеют ограниченную длинну кэша.

`chulakov-next-router` — является оберткой для next роутера которая позволяет использовать ссылки без указания пути к странице в каждой смене роута.

## Использование

### Записать карту маршрутов.

 - Ключ — это [именованный маршрут](http://expressjs.com/en/guide/routing.html#route-parameters)
 - Значение — путь к компонентам страницы относительно `/pages`

 Также, можно использовать метод `@ch/next-router/initRoutes` который первым аргументом принимает префикс для всех маршрутов, а вторым маршруты. Этот метод необходим если приложение развернуто не в корневом каталоге `/`, а в дирректории. Например -  `lk/{app}`.

```javascript
// server/routes.js

module.exports = {
  '/': '/home',
  '/contacts': '/contacts',
  '/user/:id': '/user',
};

// Пример с initRoutes
module.exports = initRoutes('/lk', {
  '/': '/home',
  '/contacts': '/contacts',
  '/user/:id': '/user',
});
```

### Добавить слушатель в node сервер.

```javascript
// server/index.js

const next = require('next');
const express = require('express');

const getRequestHandler = require('../modules/next-router/getRequestHandler');
const routes = require('./routes');

const app = next({ dev: process.env.IS_DEV_MODE });
const handler = getRequestHandler(app, routes); // Инициализация обработчика запросов

app.prepare().then(() => {
  express()
    .use(handler) // Добавление слушателя ко всем запросам на сервер
    .listen(3000);
});

```

### Добавить роуты в контекст клиентской части приложения.

Лучше всего это сделать в `_app.js`, т.к. он является точкой входа в приложение.

```javascript
import React from 'react';
import App from 'next/app';

// Components
import RouterProvider from '@ch/next-router/RouterProvider';

// Configs
import routes from 'server/routes';

class MyApp extends App {
  render() {
    const { Component, componentProps } = this.props;

    return (
      <RouterProvider routes={routes}>
        <Component {...componentProps} />
      </RouterProvider>
    );
  }
}

export default MyApp;

```

## Компоненты

### Link

Компонент ссылки подписывается на контекст роутера переданный компонентом [RouterProvider](#markdown-header-routerprovider).

```javascript
import Link from '@ch/next-router/Link';

// ...

<Link href="/">Go To Home</Link>
<Link href="/user/id1234">With Slug</Link>
```

### RouterProvider

RouterProvider — это провайдер react контекста, который принимает список маршрутов который соответствует маршрутам на сервере и добавляет экземпляр роутера к своему контексту. Провайдер является обязательным компонентом.

```javascript
import RouterProvider from '@ch/next-router/RouterProvider';

<RouterProvider routes={routes}>
  {/* ... */}
</RouterProvider>
```
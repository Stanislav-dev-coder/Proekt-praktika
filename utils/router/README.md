# chulakov-next-router

routes.js
```js
const router = require('@router');

module.express = router.initMap({
  '/': '/home',
  '/about': '/about',
  '/user/:userName': '/user/',
});
```

server.js
```js
const next = require('next');
const express = require('express');
const router = require('./router');

const PORT = process.env.PORT;
const IS_DEV_MODE = process.env.NODE_ENV !== 'production';

const app = next({ dev: IS_DEV_MODE });
const routerHandler = router.getRequestHandler(app, routes);

// With express
app.prepare().then(() => {
  express()
    .use(routerHandler)
    .listen(PORT);
});
```

_app.js
```js
import React from 'react';
import App from 'next/app';
import { RouterProvider } from '@router';

class MyApp extends App {
  render() {
    const { Component, router } = this.props;

    return (
      <RouterContext router={router}>
        <Component />
      </RouterContext>
    );
  }
}

export default MyApp;
```

home.js
```js
import React from 'react';
import Link from '@router/Link'; // Or `import { Link } from '@router';`
import { useRouter } from '@router';

function HomePage() {
  const router = useRouter();

  const onFilter = filter => router.push(`/?filter=${filter}`, { shallow: true });

  return (
    <div className="HomePage">
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contacts">Contacts</Link>
        <Link href="/user/223">User #223</Link>
      </nav>

      <div>
        Filter - ${router.query.filter || 'none'}

        <button onClick={() => onFilter('data')}>Filter[data]</button>
        <button onClick={() => onFilter('get')}>Filter[get]</button>
        <button onClick={() => onFilter('max')}>Filter[max]</button>
      </div>
    </div>
  )
}

export default MyApp;
```

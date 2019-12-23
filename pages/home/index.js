import React from 'react';
import { useSelector } from 'react-redux';
import Link from '@utils/router/Link';

const HomePage = () => {
  const title = useSelector(state => state.home.title);

  return (
    <div>
      <h1>Title:: {title}</h1>

      <Link href="/">Home Page</Link>
      <br />
      <Link href="http://localhost:3000/">http://localhost:3000/</Link>
      <br />
      <Link href="/kit">/kit</Link>
      <br />
      <Link href="/user/h123">/user/h123</Link>
      <br />
      <Link href="/ajkshdf">/ajkshdf</Link>
      <br />
      <Link href="/home#123">/home#123</Link>
      <br />
      <Link href="/home/#123?asd=123">/home/#123?asd=123</Link>
      <br />
      <Link href="http://yandex.ru/">http://yandex.ru/</Link>
      <br />
      <Link href="http://yandex.ru/?asd=123">http://yandex.ru/?asd=123</Link>
      <br />
    </div>
  );
};

export default HomePage;

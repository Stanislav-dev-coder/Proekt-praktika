import React from 'react';
import { useSelector } from 'react-redux';
import Link from '@ch/next-router/Link';
import Page from 'components/environment/Page';

const HomePage = () => {
  const title = useSelector(state => state.home.title);
  return (
    <Page>
      <h1>Title:: {title}</h1>

      <Link>empty</Link>
      <br />
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
      <Link href="/lk/test/kit">/lk/test/kit</Link>
      <br />
    </Page>
  );
};

export default HomePage;

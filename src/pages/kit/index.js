import React, { useState, useEffect } from 'react';
import cn from 'classnames/bind';

// Components
import Link from '@ch/next-router/Link';
import ErrorPage from 'components/base/ErrorPage';
import { Fade, Slide } from 'components/base/Animations';
import PageLoader from 'components/base/Animations/PageLoader';

// Styles
import styles from './styles.styl';

const cx = cn.bind(styles);

const Component = ({ children }) => <div style={{ marginBottom: '8px' }}>{children}</div>;
const Section = ({ title, children, style }) => (
  <section style={style}>
    <h2>{title}</h2>
    {children}
  </section>
);

function KitPage() {
  const [isStartedLoader, startLoader] = useState(false);
  const [isOpenFade, showFade] = useState(false);
  const [isOpenSlide, showSlide] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('kit-page');

    return () => {
      document.documentElement.classList.remove('kit-page');
    };
  }, []);

  useEffect(() => {
    const arr = [1, 2, 3, 4, 5, 6, 7];

    arr.map(a => a);
    arr.filter(a => a);
    arr.reduce((_a, i) => 1 + i, null);
    arr.includes(2);
    new Promise(resolve => {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    })
      .then(() => console.log('then'))
      .catch(() => console.log('catch'));
  });

  return (
    <div className={cx('KitPage')}>
      <h1>Kit Example</h1>

      <Section title="Link">
        <Component>
          <Link href="/">Go to /home</Link>
        </Component>
        <Component>
          <Link href={null}>null</Link>
        </Component>
        <Component>
          <Link>undefined</Link>
        </Component>
        <Component>
          <Link href="#qwe">Hash</Link>
        </Component>
        <Component>
          <Link href="#qwe2?asd=123">Hash + get properties</Link>
        </Component>
      </Section>

      <Section title="ErrorPage">
        <Component>
          <h3>404</h3>
          <ErrorPage statusCode={404} />
        </Component>
        <Component>
          <h3>500</h3>
          <ErrorPage statusCode={500} />
        </Component>
      </Section>

      <Section title="PageLoader">
        <button type="button" onClick={() => startLoader(true)}>
          Start
        </button>
        <button type="button" onClick={() => startLoader(false)}>
          End
        </button>

        <PageLoader in={isStartedLoader} />
      </Section>

      <Section title="Fade">
        <button type="button" onClick={() => showFade(!isOpenFade)}>
          Change Fade state
        </button>

        <Fade in={isOpenFade} duration={300}>
          <ul style={{ position: 'absolute' }}>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
            <li>Link 4</li>
          </ul>
        </Fade>
      </Section>

      <Section title="Slide" style={{ minHeight: '280px' }}>
        <button type="button" onClick={() => showSlide(!isOpenSlide)}>
          Change Fade state
        </button>

        <Slide in={isOpenSlide} duration={350}>
          <ul style={{ position: 'absolute' }}>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
            <li>Link 4</li>
          </ul>
        </Slide>

        <Slide in={isOpenSlide} duration={300} stagerDuration={30}>
          <ul style={{ position: 'absolute', right: 20 }}>
            <li className={cx('anim-slideItem')}>Link 1</li>
            <li className={cx('anim-slideItem')}>Link 2</li>
            <li className={cx('anim-slideItem')}>Link 3</li>
            <li className={cx('anim-slideItem')}>Link 4</li>
          </ul>
        </Slide>
      </Section>
    </div>
  );
}

export default KitPage;

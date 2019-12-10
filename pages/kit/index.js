import React, { useState, useEffect } from 'react';

// Components
import AppLink from 'components/AppLink';
import ErrorPage from 'components/ErrorPage';
import Fade from 'components/Animations/Fade';

// Styles
import './styles.styl';

const Component = ({ children }) => <div style={{ marginBottom: '8px' }}>{children}</div>;
const Section = ({ title, children }) => (
  <section>
    <h2>{title}</h2>
    {children}
  </section>
);

function KitPage() {
  const [isOpenFade, showFade] = useState(false);

  useEffect(() => {
    document.body.classList.add('kit-page');

    return () => {
      document.body.classList.remove('kit-page');
    };
  }, []);

  return (
    <div className="KitPage">
      <h1>Kit Example</h1>

      <Section title="AppLink">
        <Component>
          <AppLink href="/">Go to /home</AppLink>
        </Component>
        <Component>
          <AppLink href="/example">Go to /example</AppLink>
        </Component>
        <Component>
          <AppLink href="/example" targetBlank>
            Target /example
          </AppLink>
        </Component>
        <Component>
          <AppLink href={null}>null</AppLink>
        </Component>
        <Component>
          <AppLink>undefined</AppLink>
        </Component>
        <Component>
          <AppLink href="#qwe">Hash</AppLink>
        </Component>
        <Component>
          <AppLink href="#qwe2?asd=123">Hash + get properties</AppLink>
        </Component>
      </Section>

      <Section title="ErrorPage">
        <Component>
          <h3>404</h3>
          <ErrorPage httpStatus={404} />
        </Component>
        <Component>
          <h3>500</h3>
          <ErrorPage httpStatus={500} />
        </Component>
      </Section>

      <Section title="Fade">
        <button type="button" onClick={() => showFade(!isOpenFade)}>
          Change Fade state
        </button>

        <Fade in={isOpenFade} duration={1000}>
          <ul style={{ position: 'absolute' }}>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
            <li>Link 4</li>
          </ul>
        </Fade>
      </Section>
    </div>
  );
}

export default KitPage;

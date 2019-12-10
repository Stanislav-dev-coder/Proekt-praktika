import React from 'react';

// Components
import AppLink from 'components/AppLink';
import ErrorPage from 'components/ErrorPage';

const Component = ({ children }) => <div style={{ marginBottom: '8px' }}>{children}</div>;
const Section = ({ title, children }) => (
  <div style={{ padding: '10px 20px', marginBottom: '25px' }}>
    <h2>{title}</h2>
    {children}
  </div>
);

function KitPage() {
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
          <h3>No httpStatus</h3>
          <ErrorPage />
        </Component>
        <Component>
          <h3>404</h3>
          <ErrorPage httpStatus={404} />
        </Component>
        <Component>
          <h3>500</h3>
          <ErrorPage httpStatus={500} />
        </Component>
      </Section>
    </div>
  );
}

export default KitPage;

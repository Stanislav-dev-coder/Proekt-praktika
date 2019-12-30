import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import handleResponseStatus from '@utils/handle-response-status';
import getOrInitializeStore from '../store';

// Components
import RouterProvider from '@utils/router/RouterProvider';
import Layout from 'components/Layout';

// Configs
import routes from 'server/routes';

// Styles
import 'styles/document.styl';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return await handleResponseStatus(ctx, () => {
      return Promise.all([Component.getInitialProps ? Component.getInitialProps(ctx) : null]);
    });
  }

  render() {
    const { Component, statusCode, isSuccessful, componentProps, store } = this.props;

    return (
      <Provider store={store}>
        <RouterProvider routes={routes}>
          <Layout statusCode={statusCode} isSuccessful={isSuccessful}>
            <Component statusCode={statusCode} {...componentProps} />
          </Layout>
        </RouterProvider>
      </Provider>
    );
  }
}

export default withRedux(getOrInitializeStore)(MyApp);

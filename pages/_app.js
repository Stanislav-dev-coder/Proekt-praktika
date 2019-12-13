import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import handleResponseStatus from 'utils/handleResponseStatus';
import getOrInitializeStore from '../store';

// Components
import Layout from 'components/Layout';

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
        <Layout statusCode={statusCode} isSuccessful={isSuccessful}>
          <Component statusCode={statusCode} {...componentProps} />
        </Layout>
      </Provider>
    );
  }
}

export default withRedux(getOrInitializeStore)(MyApp);

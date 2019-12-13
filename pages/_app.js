import React from 'react';
import App from 'next/app';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import handleResponseStatus from 'utils/handleResponseStatus';
import rootReducer from '../state/';

// Components
import Layout from 'components/Layout';

// Styles
import 'styles/document.styl';

let devtools = func => func;

if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

const makeStore = initialState => {
  return createStore(rootReducer, initialState, compose(applyMiddleware(thunk), devtools));
};

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

export default withRedux(makeStore)(MyApp);

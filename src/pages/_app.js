import React from 'react';
import App, { Container } from 'next/app';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import handleResponseStatus from 'utils/handleResponseStatus';
import rootReducer from '../state/';

// Provides polyfills necessary for a full ES2015+ environment
import 'babel-polyfill';

import Layout from 'components/Layout';

let devtools = func => func;

if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
	devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

const makeStore = (initialState, options) => {
	return createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(thunk),
			devtools,
		),
	);
};

@withRedux(makeStore)
export default class MyApp extends App {
	static async getInitialProps({ Component, router, ctx }) {
		const { store, isServer, req, res, asPath } = ctx;

		return await handleResponseStatus({
			promise: Promise.all([
				Component.getInitialProps ? Component.getInitialProps(ctx).catch(e => e) : undefined,
			]),
			serverRes: res,
		});
	}

	render() {
		const { Component, pageProps, status, store } = this.props;

		return (
			<Container>
				<Provider store={store}>
					<Layout httpStatus={status}>
						<Component {...pageProps} />
					</Layout>
				</Provider>
			</Container>
		);
	}
}

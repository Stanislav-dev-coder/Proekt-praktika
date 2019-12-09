// module.exports = require('next/error');

import React, { Component } from 'react';
import ErrorPage from 'components/ErrorPage';

export default class Error extends Component {
  static async getInitialProps({ res, err }) {
    const httpStatus = res ? res.statusCode : err ? err.statusCode || err.status : null;

    return { httpStatus };
  }

  render() {
    return <ErrorPage httpStatus={this.props.httpStatus} />;
  }
}

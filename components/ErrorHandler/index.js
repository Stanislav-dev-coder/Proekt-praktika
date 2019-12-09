// Vendor
import React from 'react';
import PropTypes from 'prop-types';

const ErrorHandler = ({ statusCode, children }) => {
  if (statusCode >= 400) {
    return `Error ${statusCode}`;
  }
  return children;
};

ErrorHandler.propTypes = {
  statusCode: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default ErrorHandler;

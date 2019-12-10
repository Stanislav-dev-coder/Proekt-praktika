import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './styles.styl';

const propTypes = {
  httpStatus: PropTypes.number.isRequired,
};

/** @typedef {{ httpStatus: number }} PropsStruct
 * @constant
 * @type {(props: PropsStruct) => React.ForwardRefExoticComponent} */
const ErrorPage = React.forwardRef(({ httpStatus }) => {
  const is404 = httpStatus === 404;

  return (
    <div className="ErrorPage">
      {this.props.httpStatus}
      {is404 && (
        <p className="ErrorPage__message">К&nbsp;сожалению, такая страница не&nbsp;найдена</p>
      )}
    </div>
  );
});

ErrorPage.displayName = 'ErrorPage';
ErrorPage.propTypes = propTypes;

export default ErrorPage;

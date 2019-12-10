import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './styles.styl';

const propTypes = {
  httpStatus: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

/** @typedef {{ httpStatus: number| string }} PropsStruct
 * @constant
 * @type {(props: PropsStruct) => React.ForwardRefExoticComponent} */
const ErrorPage = React.forwardRef(({ httpStatus }, ref) => {
  const is404 = httpStatus === 404;

  return (
    <div ref={ref} className="ErrorPage">
      {httpStatus}
      {is404 && (
        <p className="ErrorPage__message">К&nbsp;сожалению, такая страница не&nbsp;найдена</p>
      )}
    </div>
  );
});

ErrorPage.displayName = 'ErrorPage';
ErrorPage.propTypes = propTypes;

export default ErrorPage;

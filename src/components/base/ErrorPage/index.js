import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames/bind';

// Styles
import styles from './styles.styl';

const cx = cn.bind(styles);

const STATUS_DESCRIPTIONS = {
  403: 'Нет доступа',
  404: 'Страница не найдена',
  500: 'Ошибка сервера',
};

/** 418 - ошибка в JS.
 * @type {(props: ErrorPage.propTypes) => React.Component} */
const ErrorPage = ({ statusCode, className }) => {
  const description = STATUS_DESCRIPTIONS[statusCode];

  return (
    <div className={cx('ErrorPage', className)}>
      {statusCode === 418 ? (
        <h1 style={{ textAlign: 'center' }}>Что-то пошло не так...</h1>
      ) : (
        <React.Fragment>
          <h1 style={{ textAlign: 'center' }}>Error {statusCode}</h1>
          {description && <p>{description}</p>}
        </React.Fragment>
      )}
    </div>
  );
};

ErrorPage.propTypes = {
  statusCode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  className: PropTypes.string,
};

ErrorPage.defaultProps = {
  className: null,
};

export default ErrorPage;

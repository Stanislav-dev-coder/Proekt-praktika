import React from 'react';
import cn from 'classnames/bind';
import PropTypes from 'prop-types';
import ReactChildrenType from 'types/ReactChildren';

// Styles
import styles from './styles.styl';

const cx = cn.bind(styles);

function Page({ children, className }) {
  return <main className={cx('Page', className)}>{children}</main>;
}

Page.propTypes = {
  children: ReactChildrenType.isRequired,
  className: PropTypes.string,
};

Page.defaultProps = {
  className: '',
};

export default Page;

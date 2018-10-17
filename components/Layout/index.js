// Vendor
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import cn from 'classnames';
// Root Styles
import '../../styles/document.styl';
// Components
import ErrorHandler from 'components/ErrorHandler';
// Styles
import './style.styl';

const formatTitle = title => {
  const siteName = 'Site';
  if (title) {
    return `${title} - ${siteName}`;
  }
  return siteName;
};

const Layout = ({ className, children, title, httpStatus }) => (
  <div className={cn('Layout', className)}>
    <Head>
      <title>{formatTitle(title)}</title>
    </Head>
    {/* <Header /> */}
    <main className="Layout__content">
      {httpStatus ? <ErrorHandler statusCode={httpStatus}>{children}</ErrorHandler> : children}
    </main>
    {/* <Footer /> */}
  </div>
);

Layout.defaultProps = {
  className: '',
  title: '',
  navCategory: 'individuals',
  animated: false,
};

Layout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  navCategory: PropTypes.string,
  title: PropTypes.string,
  animated: PropTypes.bool,
  httpStatus: PropTypes.number,
};

export default Layout;

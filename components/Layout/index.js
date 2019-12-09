// Vendor
import React, { Component } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Router from 'next/router';
import { addTabularEvents, removeTabularEvents } from 'utils/tabularEvents';

import PageLoader from 'components/Animations/PageLoader';
import ErrorPage from 'components/ErrorPage';

// Root Styles
import '../../styles/document.styl';
// Styles
import './style.styl';

const formatTitle = title => {
  const siteName = 'Site';
  if (title) {
    return `${title} - ${siteName}`;
  }
  return siteName;
};

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderError: false,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);

    addTabularEvents();

    Router.router.events.on('routeChangeStart', () => {
      this.setState({ routeChanging: true });
    });
    Router.router.events.on('routeChangeComplete', () => {
      this.setState({ routeChanging: false });
      // Скрол при смене url
      window.scrollTo(0, 0);
    });
  }

  componentWillUnmount() {
    removeTabularEvents();
  }

  componentDidCatch() {
    this.setState({
      renderError: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.renderError) {
      this.setState({
        renderError: false,
      });
    }
  }

  getHttpStatus() {
    return this.state.renderError ? 'Упс! Что-то пошло не так...' : this.props.httpStatus;
  }

  render() {
    const { className, children, title } = this.props;
    const classNames = cn('Layout', className);
    const httpStatus = this.getHttpStatus();

    return (
      <div className={classNames}>
        <Head>
          <title>{formatTitle(title)}</title>
        </Head>
        <PageLoader in={this.state.routeChanging} />
        {/* <Header /> */}
        <main className="Layout__content">
          {httpStatus === 200 ? children : <ErrorPage httpStatus={httpStatus} />}
        </main>
        {/* <Footer /> */}
      </div>
    );
  }
}

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

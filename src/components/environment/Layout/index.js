import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames/bind';
import Router from 'next/router';
import { addTabularEvents, removeTabularEvents } from '@ch/tabular-events';

// Componenst
import ErrorPage from 'components/base/ErrorPage';
import PageLoader from 'components/base/Animations/PageLoader';

// Styles
import styles from './styles.styl';

const cx = cn.bind(styles);

class Layout extends Component {
  state = {
    routeChanging: false,
    isRenderError: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    addTabularEvents();

    Router.router.events.on('routeChangeStart', () => {
      this.setState({ routeChanging: true });
    });

    Router.router.events.on('routeChangeComplete', () => {
      this.setState({ routeChanging: false });
      window.scrollTo(0, 0); // Скрол при смене url
    });
  }

  componentWillUnmount() {
    removeTabularEvents();
  }

  componentDidCatch() {
    this.setState({
      isRenderError: true,
    });
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.isRenderError) {
      this.setState({
        isRenderError: false,
      });
    }
  }

  /** Получение статуса ошибки с учетом ошибки в JS.
   * @return {{ isSuccessful: boolean, statusCode: number }}
   */
  getPageStatus() {
    return {
      isSuccessful: !this.state.isRenderError && this.props.isSuccessful,
      statusCode: this.state.isRenderError ? 418 : this.props.statusCode,
    };
  }

  render() {
    const { children, className } = this.props;
    const { isSuccessful, statusCode } = this.getPageStatus();

    return (
      <div className={cx('Layout', className)}>
        <PageLoader in={this.state.routeChanging} />

        {isSuccessful ? children : <ErrorPage statusCode={statusCode} />}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  statusCode: PropTypes.number.isRequired,
  isSuccessful: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

Layout.defaultProps = {
  className: null,
};

export default Layout;

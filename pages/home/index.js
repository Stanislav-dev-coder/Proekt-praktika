// Vendor
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import AppLink from 'components/AppLink';

// Actions
// import { getSlidesIfNotLoaded } from 'state/home/actions';

// @connect(({ home }) => ({
//   slides: home.slides,
// }))
export default class IndexPage extends Component {
  // static async getInitialProps({ store }) {
  //   await Promise.all([
  //     store.dispatch(getSlidesIfNotLoaded()),
  //   ]);
  // }

  render() {
    return (
      <div>
        Home page <AppLink href="/example">Go to example</AppLink>
      </div>
    );
  }
}

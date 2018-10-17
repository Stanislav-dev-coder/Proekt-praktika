// Vendor
import React from 'react';
import { connect } from 'react-redux';

// Components
import Layout from 'components/Layout';

// Actions
// import { getSlidesIfNotLoaded } from 'state/home/actions';

// @connect(({ home }) => ({
//   slides: home.slides,
// }))
export default class IndexPage extends React.Component {
  // static async getInitialProps({ store }) {
  //   await Promise.all([
  //     store.dispatch(getSlidesIfNotLoaded()),
  //   ]);
  // }

  render() {
    return <Layout>Homepage</Layout>;
  }
}

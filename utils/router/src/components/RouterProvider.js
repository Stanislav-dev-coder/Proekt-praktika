import React from 'react';
import PropTypes from 'prop-types';
import RouterContext from '../context/RouterContext';

/** Провайдер, для передачи роутов на клиент.
 * @param {(RouterProvider.propTypes) => React.Component}
 */
function RouterProvider({ routes, children }) {
  return <RouterContext.Provider value={routes}>{children}</RouterContext.Provider>;
}

RouterProvider.propTypes = {
  routes: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
};

export default RouterProvider;

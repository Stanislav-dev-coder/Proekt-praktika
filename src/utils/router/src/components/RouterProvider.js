import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Router from '../Router';
import RouterContext from '../context/RouterContext';

const router = new Router();

/** Провайдер, для передачи роутов на клиент.
 * @param {(RouterProvider.propTypes) => React.Component}
 */
function RouterProvider({ routes, children }) {
  const isInitRouter = useRef(false);

  if (!isInitRouter.current) {
    router.initMap(routes);
    isInitRouter.current = true;
  }

  return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
}

RouterProvider.propTypes = {
  routes: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
};

export default RouterProvider;

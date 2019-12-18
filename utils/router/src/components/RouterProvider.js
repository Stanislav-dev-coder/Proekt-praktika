import React from 'react';

function RouterProvider({ routes }) {
  return React.createContext(routes);
}

export default RouterProvider;

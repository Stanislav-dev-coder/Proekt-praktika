// Vendor
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// Components
// import Component from '../Component';
// Styles
import './style.styl';

const ${TM:COMPONENT_NAME} = ({ className }) => (
  <div className={cn('${TM:COMPONENT_NAME}', className)}>${TM:COMPONENT_NAME}</div>
);

${TM:COMPONENT_NAME}.defaultProps = {
  className: '',
};

${TM:COMPONENT_NAME}.propTypes = {
  className: PropTypes.string,
};

export default ${TM:COMPONENT_NAME};

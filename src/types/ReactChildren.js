import PropTypes from 'prop-types';

export default PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.elementType,
  PropTypes.arrayOf(PropTypes.elementType),
  PropTypes.element,
  PropTypes.arrayOf(PropTypes.element),
]);

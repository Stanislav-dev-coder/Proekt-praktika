import defineActionTypes from 'helpers/defineActionTypes';

// Define action types
export default defineActionTypes('${TM:MODULE_NAME}', [
  'GET_${TM:MODULE_TYPE_NAME}',
  'GET_${TM:MODULE_TYPE_NAME}_START',
  'GET_${TM:MODULE_TYPE_NAME}_SUCCESS',
  'GET_${TM:MODULE_TYPE_NAME}_ERROR',
]);

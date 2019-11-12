import { get } from 'helpers/api';
import getErrorMessage from 'helpers/getErrorMessage';
import types from './types';

const get${TM:MODULE_NAME_CAPITALIZE}Start = () => {
  return {
    type: types.GET_${TM:MODULE_TYPE_NAME}_START,
  };
};

const get${TM:MODULE_NAME_CAPITALIZE}Success = data => {
  return {
    type: types.GET_${TM:MODULE_TYPE_NAME}_SUCCESS,
    payload: data,
  };
};

const get${TM:MODULE_NAME_CAPITALIZE}Error = message => {
  return {
    type: types.GET_${TM:MODULE_TYPE_NAME}_ERROR,
    payload: message,
  };
};

export const get${TM:MODULE_NAME_CAPITALIZE}IfNotLoaded = () => (dispatch, getState) => {
  const {
    ${TM:MODULE_NAME}: { isLoaded, isLoading },
  } = getState();
  if (!isLoaded && !isLoading) {
    return dispatch(get${TM:MODULE_NAME_CAPITALIZE}());
  }
  return false;
};

export const get${TM:MODULE_NAME_CAPITALIZE} = () => dispatch => {
  return get('/${TM:MODULE_NAME}/api/path', {
    before: () => dispatch(get${TM:MODULE_NAME_CAPITALIZE}Start()),
    success: data => dispatch(get${TM:MODULE_NAME_CAPITALIZE}Success(data)),
    error: err => dispatch(get${TM:MODULE_NAME_CAPITALIZE}Error(getErrorMessage(err))),
  });
};

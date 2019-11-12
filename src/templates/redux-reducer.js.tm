import types from './types';

// Initial state
const initialState = {
  isLoaded: false,
  isLoading: false,
  error: null,
  data: [],
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_${TM:MODULE_TYPE_NAME}_START: {
      return {
        ...state,
        isLoaded: false,
        isLoading: true,
      };
    }

    case types.GET_${TM:MODULE_TYPE_NAME}_SUCCESS: {
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        data: action.payload,
        error: null,
      };
    }

    case types.GET_${TM:MODULE_TYPE_NAME}_ERROR: {
      return {
        ...state,
        isLoaded: false,
        isLoading: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

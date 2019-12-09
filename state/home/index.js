import types from './types';

// Initial state
const initialState = {
  // slides
  isSlidesLoaded: false,
  isSlidesLoading: false,
  slides: [],
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    // Slides
    case types.GET_SLIDES_START: {
      return {
        ...state,
        isSlidesLoaded: false,
        isSlidesLoading: true,
      };
    }
    case types.GET_SLIDES_SUCCESS: {
      return {
        ...state,
        isSlidesLoaded: true,
        isSlidesLoading: false,
        slides: action.slides,
      };
    }
    default: {
      return state;
    }
  }
}

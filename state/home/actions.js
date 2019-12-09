import { get } from 'helpers/api';
import types from './types';

// Slides
export const getSlidesIfNotLoaded = () => {
  return (dispatch, getState) => {
    const {
      home: { isSlidesLoaded, isSlidesLoading },
    } = getState();
    if (!isSlidesLoaded && !isSlidesLoading) {
      return dispatch(getSlides());
    } else {
      return false;
    }
  };
};

export const getSlides = () => {
  return dispatch =>
    get('/sliders/private/main', {
      before: () => dispatch(getSlidesStart()),
      success: slides => dispatch(getSlidesSuccess(slides)),
    });
};

const getSlidesStart = () => {
  return {
    type: types.GET_SLIDES_START,
  };
};

const getSlidesSuccess = slides => {
  return {
    type: types.GET_SLIDES_SUCCESS,
    slides,
  };
};

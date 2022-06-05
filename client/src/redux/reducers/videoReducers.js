import {
  VIDEO_DETAILS_REQUEST,
  VIDEO_DETAILS_SUCCESS,
  VIDEO_DETAILS_FAIL,
  VIDEO_ADD_REQUEST,
  VIDEO_ADD_SUCCESS,
  VIDEO_ADD_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/videoConstants";

export const getVideoDetailsReducer = (state = { video: {} }, action) => {
  switch (action.type) {
    case VIDEO_DETAILS_REQUEST:
      return {
        ...state,
        vLoading: true,
      };
    case VIDEO_DETAILS_SUCCESS:
      return {
        ...state,
        vLoading: false,
        video: action.payload,
      };
    case VIDEO_DETAILS_FAIL:
      return {
        ...state,
        vLoading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const addVideoReducer = (state = { video: {} }, action) => {
  switch (action.type) {
    case VIDEO_ADD_REQUEST:
      return {
        ...state,
        vLoading: true,
      };
    case VIDEO_ADD_SUCCESS:
      return {
        ...state,
        vLoading: false,
        video: action.payload.video,
        vMessage: action.payload.message,
      };
    case VIDEO_ADD_FAIL:
      return {
        ...state,
        vLoading: false,
        vError: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        vError: null,
      };

    case CLEAR_MESSAGES:
      return {
        ...state,
        vMessage: null,
      };

    default:
      return state;
  }
};

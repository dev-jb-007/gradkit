import {
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_SUCCESS,
  COURSE_CREATE_FAIL,
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/courseContsants";

export const createCourseReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_CREATE_REQUEST:
      return {
        ...state,
        cLoading: true,
      };

    case COURSE_CREATE_SUCCESS:
      return {
        ...state,
        cLoading: false,
        course: action.payload.course,
        cMessage: action.payload.message,
      };

    case COURSE_CREATE_FAIL:
      return {
        ...state,
        cLoading: false,
        cError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        cError: null,
      };

    case CLEAR_MESSAGES:
      return {
        ...state,
        cMessage: null,
      };
    default:
      return state;
  }
};

export const getAllCoursesReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case COURSE_LIST_REQUEST:
      return {
        courses: [],
        loading: true,
      };

    case COURSE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: action.payload,
      };

    case COURSE_LIST_FAIL:
      return {
        ...state,
        loading: false,
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

export const getCourseDetailsReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case COURSE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        course: action.payload,
      };

    case COURSE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
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

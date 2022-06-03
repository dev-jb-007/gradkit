import axios from "axios";

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
} from "../constants/courseContsants";

export const createCourse = (formData) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_CREATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `/api/video/devpatel/uploadCourse`,
      formData,
      config
    );

    console.log(data);

    dispatch({
      type: COURSE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_CREATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllCourses = () => async (dispatch) => {
  try {
    dispatch({ type: COURSE_LIST_REQUEST });

    const { data } = await axios.get(`/api/video/courses`);

    dispatch({
      type: COURSE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getCourseById = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/video/courses/${id}`);

    dispatch({
      type: COURSE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

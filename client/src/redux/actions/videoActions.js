import axios from "axios";

import {
  VIDEO_DETAILS_REQUEST,
  VIDEO_DETAILS_SUCCESS,
  VIDEO_DETAILS_FAIL,
  VIDEO_ADD_REQUEST,
  VIDEO_ADD_SUCCESS,
  VIDEO_ADD_FAIL,
  CLEAR_ERRORS,
} from "../constants/videoConstants";

export const getVideoDetails = (id,cid) => async (dispatch) => {
  try {
    dispatch({ type: VIDEO_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/video/${id}/${cid}`);

    dispatch({
      type: VIDEO_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VIDEO_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const createVideo = (formData) => async (dispatch) => {
  try {
    dispatch({ type: VIDEO_ADD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `/api/video/devpatel/uploadCourseVideo`,
      formData,
      config
    );

    dispatch({
      type: VIDEO_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VIDEO_ADD_FAIL,
      payload: error.response.data.message,
    });
  }
};



export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// export const clearMessages = () => async (dispatch) => {
//   dispatch({
//     type: CLEAR_MESSAGES,
//   });
// };

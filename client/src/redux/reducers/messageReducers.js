import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  CLEAR_MESSAGES,
} from "../constants/messageConstants";

export const messageReducer = (state = { message: {} }, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return {
        loading: true,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case SEND_MESSAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_MESSAGES:
      return {
        message: null,
      };
    default:
      return state;
  }
};

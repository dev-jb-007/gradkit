import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userAuthReducer,
  forgotPasswordReducer,
} from "./redux/reducers/userReducers";
import {
  createCourseReducer,
  getAllCoursesReducer,
  getCourseDetailsReducer,
} from "./redux/reducers/courseReducers";
import {
  addVideoReducer,
  getVideoDetailsReducer,
} from "./redux/reducers/videoReducers";

const reducer = combineReducers({
  user: userAuthReducer,
  forgotPassword: forgotPasswordReducer,
  courses: getAllCoursesReducer,
  course: getCourseDetailsReducer,
  addCourse: createCourseReducer,
  video: getVideoDetailsReducer,
  addVideo: addVideoReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

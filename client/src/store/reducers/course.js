import * as actionTypes from "../actions/actiontypes";
import { updateObject } from "../utility";

const initialState = {
  courses: [],
  courseDetails: null,
  error: null,
  loading: false
};

const fetchCoursesStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const fetchCoursesSuccess = (state, action) => {
  return updateObject(state, {
    courses: action.courses,
    error: null,
    loading: false
  });
};

const fetchCoursesFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COURSES_START: 
      return fetchCoursesStart(state, action);
    case actionTypes.FETCH_COURSES_SUCCESS: 
      return fetchCoursesSuccess(state, action);
    case actionTypes.FETCH_COURSES_FAIL: 
      return fetchCoursesFail(state, action);
    case actionTypes.COURSE_REGISTER_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.COURSE_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.COURSE_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
      case actionTypes.FETCH_COURSE_DETAILS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_COURSE_DETAILS_SUCCESS:
      return {
        ...state,
        courseDetails: action.courseDetails,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_COURSE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
      case actionTypes.CREATE_COURSE_START:
      return {
        ...state,
        creatingCourse: true,
        createCourseError: null,
      };
    case actionTypes.CREATE_COURSE_SUCCESS:
      return {
        ...state,
        course: action.course,
        creatingCourse: false,
        createCourseError: null,
      };
    case actionTypes.CREATE_COURSE_FAIL:
      return {
        ...state,
        creatingCourse: false,
        createCourseError: action.error,
      };
    default: 
      return state;
  }
};

export default reducer;

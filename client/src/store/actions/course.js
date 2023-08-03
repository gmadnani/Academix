import * as actionTypes from "./actiontypes";
import axios from 'axios';

export const fetchCoursesStart = () => {
  return {
    type: actionTypes.FETCH_COURSES_START
  };
};

export const fetchCoursesSuccess = courses => {
  return {
    type: actionTypes.FETCH_COURSES_SUCCESS,
    courses: courses
  };
};

export const fetchCoursesFail = error => {
  return {
    type: actionTypes.FETCH_COURSES_FAIL,
    error: error
  };
};

export const fetchCourses = () => {
  return dispatch => {
    dispatch(fetchCoursesStart());
    const token = localStorage.getItem('token');  // Get token from localStorage
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios.get('http://127.0.0.1:8000/courses/list/')
      .then(res => {
        const courses = res.data;
        dispatch(fetchCoursesSuccess(courses));
      })
      .catch(err => {
        dispatch(fetchCoursesFail(err));
      });
  };
};


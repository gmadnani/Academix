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

export const fetchCourses = (token) => {
  return dispatch => {
    dispatch(fetchCoursesStart());
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

export const registerStudentInCourse = (token, userEmail, courseNumber) => {
  return dispatch => {
    dispatch(registerStart());
      axios.get('http://127.0.0.1:8000/users/profile/', {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(response => {
        const adminEmail = response.data.email;

        const url = `http://127.0.0.1:8000/courses/admin/${courseNumber}/`;

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        };

        const data = {
          adminID: adminEmail,
          userID: userEmail,
        };

        axios.post(url, data, { headers })
          .then(res => {
            dispatch(registerSuccess());
          })
          .catch(err => {
            dispatch(registerFail(err));
          });
      })
      .catch(error => {
        dispatch(registerFail(error));
      });
  };
};

const registerStart = () => {
  return {
    type: actionTypes.COURSE_REGISTER_START
  };
};

const registerSuccess = () => {
  return {
    type: actionTypes.COURSE_REGISTER_SUCCESS
  };
};

const registerFail = error => {
  return {
    type: actionTypes.COURSE_REGISTER_FAIL,
    error
  };
};
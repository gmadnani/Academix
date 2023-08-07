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
    const token = localStorage.getItem('token');
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

export const fetchAdminCourses = () => {
  return dispatch => {
    dispatch(fetchCoursesStart());
    const token = localStorage.getItem('token');
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

export const fetchCourseDetails = (token, courseID) => {
  return dispatch => {
    dispatch(fetchCourseDetailsStart());

    const url = `http://127.0.0.1:8000/courses/detail/${courseID}/`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    };

    return axios.get(url, { headers })
      .then(res => {
        const courseDetails = res.data;
        dispatch(fetchCourseDetailsSuccess(courseDetails));
      })
      .catch(err => {
        dispatch(fetchCourseDetailsFail(err));
      });
  };
};

const fetchCourseDetailsStart = () => {
  return {
    type: actionTypes.FETCH_COURSE_DETAILS_START
  };
};

const fetchCourseDetailsSuccess = (courseDetails) => {
  return {
    type: actionTypes.FETCH_COURSE_DETAILS_SUCCESS,
    courseDetails
  };
};

const fetchCourseDetailsFail = error => {
  return {
    type: actionTypes.FETCH_COURSE_DETAILS_FAIL,
    error
  };
};

export const createCourse = (token, courseData) => {
  return dispatch => {
    dispatch(createCourseStart());

    const url = 'http://127.0.0.1:8000/courses/list/';

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    };

    axios.post(url, courseData, { headers })
      .then(res => {
        dispatch(createCourseSuccess(res.data));
      })
      .catch(err => {
        dispatch(createCourseFail(err));
      });
  };
};

const createCourseStart = () => {
  return {
    type: actionTypes.CREATE_COURSE_START
  };
};

const createCourseSuccess = (course) => {
  return {
    type: actionTypes.CREATE_COURSE_SUCCESS,
    course
  };
};

const createCourseFail = error => {
  return {
    type: actionTypes.CREATE_COURSE_FAIL,
    error
  };
};
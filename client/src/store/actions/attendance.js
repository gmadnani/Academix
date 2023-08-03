import axios from 'axios';
import {
  CREATE_ATTENDANCE_START,
  CREATE_ATTENDANCE_SUCCESS,
  CREATE_ATTENDANCE_FAIL,
} from './actiontypes';

export const createAttendance = (token, courseID, title, createdDate, validTime) => {
  return dispatch => {
    dispatch(createAttendanceStart());
    const url = `http://127.0.0.1:8000/attendance/${courseID}/`;

    // You can include additional headers or authorization here if needed
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    };

    const data = {
      title: title,
    };

    return axios.post(url, data, { headers })
      .then(res => {
        dispatch(createAttendanceSuccess());
      })
      .catch(err => {
        dispatch(createAttendanceFail(err));
      });
  };
};

const createAttendanceStart = () => {
  return {
    type: CREATE_ATTENDANCE_START
  };
};

const createAttendanceSuccess = () => {
  return {
    type: CREATE_ATTENDANCE_SUCCESS
  };
};

const createAttendanceFail = error => {
  return {
    type: CREATE_ATTENDANCE_FAIL,
    error
  };
};
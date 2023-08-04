import axios from 'axios';
import * as actionTypes from "./actiontypes";
  
export const fetchAttendances = (token, courseID) => {
  return dispatch => {
    dispatch(fetchAttendancesStart());

    const url = `http://127.0.0.1:8000/attendance/${courseID}/`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    };

    axios.get(url, { headers })
      .then(res => {
        const attendances = res.data;
        dispatch(fetchAttendancesSuccess(attendances));
      })
      .catch(err => {
        dispatch(fetchAttendancesFail(err));
      });
  };
};

const fetchAttendancesStart = () => {
  return {
    type: actionTypes.FETCH_ATTENDANCES_START
  };
};

const fetchAttendancesSuccess = (attendances) => {
  return {
    type: actionTypes.FETCH_ATTENDANCES_SUCCESS,
    attendances
  };
};

const fetchAttendancesFail = error => {
  return {
    type: actionTypes.FETCH_ATTENDANCES_FAIL,
    error
  };
};

export const createAttendance = (token, courseID, title, createdDate, validTime) => {
  return dispatch => {
    dispatch(createAttendanceStart());
    const url = `http://127.0.0.1:8000/attendance/${courseID}/`;

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
    type: actionTypes.CREATE_ATTENDANCE_START
  };
};

const createAttendanceSuccess = () => {
  return {
    type: actionTypes.CREATE_ATTENDANCE_SUCCESS
  };
};

const createAttendanceFail = error => {
  return {
    type: actionTypes.CREATE_ATTENDANCE_FAIL,
    error
  };
};

export const fetchAttendanceDetail = (token, attendanceID) => {
  return dispatch => {
    dispatch(fetchAttendanceDetailStart());

    const url = `http://127.0.0.1:8000/attendance/detail/${attendanceID}/`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    };

    axios.get(url, { headers })
      .then(res => {
        const attendanceDetail = res.data;
        dispatch(fetchAttendanceDetailSuccess(attendanceDetail));
      })
      .catch(err => {
        dispatch(fetchAttendanceDetailFail(err));
      });
  };
};

const fetchAttendanceDetailStart = () => {
  return {
    type: actionTypes.FETCH_ATTENDANCE_DETAIL_START
  };
};

const fetchAttendanceDetailSuccess = (attendanceDetail) => {
  return {
    type: actionTypes.FETCH_ATTENDANCE_DETAIL_SUCCESS,
    attendanceDetail
  };
};

const fetchAttendanceDetailFail = error => {
  return {
    type: actionTypes.FETCH_ATTENDANCE_DETAIL_FAIL,
    error
  };
};
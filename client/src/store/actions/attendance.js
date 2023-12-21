import axios from "axios";
import * as actionTypes from "./actiontypes";

export const fetchAttendances = (token, courseID) => {
  return (dispatch) => {
    dispatch(fetchAttendancesStart());

    const url = `https://academix-server.onrender.com/attendance/${courseID}/`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    axios
      .get(url, { headers })
      .then((res) => {
        const attendances = res.data;
        dispatch(fetchAttendancesSuccess(attendances));
      })
      .catch((err) => {
        dispatch(fetchAttendancesFail(err));
      });
  };
};

const fetchAttendancesStart = () => {
  return {
    type: actionTypes.FETCH_ATTENDANCES_START,
  };
};

const fetchAttendancesSuccess = (attendances) => {
  return {
    type: actionTypes.FETCH_ATTENDANCES_SUCCESS,
    attendances,
  };
};

const fetchAttendancesFail = (error) => {
  return {
    type: actionTypes.FETCH_ATTENDANCES_FAIL,
    error,
  };
};

export const createAttendance = (
  token,
  courseID,
  title,
  createdDate,
  validTime
) => {
  return (dispatch) => {
    dispatch(createAttendanceStart());
    const url = `https://academix-server.onrender.com/attendance/${courseID}/`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    const data = {
      title: title,
    };

    return axios
      .post(url, data, { headers })
      .then((res) => {
        dispatch(createAttendanceSuccess());
      })
      .catch((err) => {
        dispatch(createAttendanceFail(err));
      });
  };
};

const createAttendanceStart = () => {
  return {
    type: actionTypes.CREATE_ATTENDANCE_START,
  };
};

const createAttendanceSuccess = () => {
  return {
    type: actionTypes.CREATE_ATTENDANCE_SUCCESS,
  };
};

const createAttendanceFail = (error) => {
  return {
    type: actionTypes.CREATE_ATTENDANCE_FAIL,
    error,
  };
};

export const fetchAttendanceStudentList = (token, attendanceID) => {
  return (dispatch) => {
    dispatch(fetchAttendanceStudentListStart());

    const url = `https://academix-server.onrender.com/attendance/detail/${attendanceID}/`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };

    axios
      .get(url, { headers })
      .then((res) => {
        const studentList = res.data;
        dispatch(fetchAttendanceStudentListSuccess(studentList));
      })
      .catch((err) => {
        dispatch(fetchAttendanceStudentListFail(err));
      });
  };
};

const fetchAttendanceStudentListStart = () => {
  return {
    type: actionTypes.FETCH_ATTENDANCE_STUDENT_LIST_START,
  };
};

const fetchAttendanceStudentListSuccess = (studentList) => {
  return {
    type: actionTypes.FETCH_ATTENDANCE_STUDENT_LIST_SUCCESS,
    studentList,
  };
};

const fetchAttendanceStudentListFail = (error) => {
  return {
    type: actionTypes.FETCH_ATTENDANCE_STUDENT_LIST_FAIL,
    error,
  };
};

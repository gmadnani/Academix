import {
    CREATE_ATTENDANCE_START,
    CREATE_ATTENDANCE_SUCCESS,
    CREATE_ATTENDANCE_FAIL,
  } from '../actions/actiontypes';
  
  const initialState = {
    loading: false,
    error: null,
  };
  
  const attendanceReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ATTENDANCE_START:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CREATE_ATTENDANCE_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
        };
      case CREATE_ATTENDANCE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default attendanceReducer;
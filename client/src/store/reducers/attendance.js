import * as actionTypes from "../actions/actiontypes.js";
  
  const initialState = {
    loading: false,
    attendances: [],
    error: null,
    attendanceDetails: null,
  };
  
  const attendanceReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.FETCH_ATTENDANCES_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_ATTENDANCES_SUCCESS:
      return {
        ...state,
        loading: false,
        attendances: action.attendances,
        error: null,
      };
    case actionTypes.FETCH_ATTENDANCES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
      case actionTypes.CREATE_ATTENDANCE_START:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case actionTypes.CREATE_ATTENDANCE_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
        };
      case actionTypes.CREATE_ATTENDANCE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
        case actionTypes.FETCH_ATTENDANCE_DETAIL_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_ATTENDANCE_DETAIL_SUCCESS:
      return {
        ...state,
        attendanceDetail: action.attendanceDetail,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_ATTENDANCE_DETAIL_FAIL:
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
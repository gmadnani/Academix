import * as actionTypes from '../actions/actiontypes.js';

const initialState = {
  assignments: [],
  loading: false,
  error: null,
  fetchingAssignmentDetails: false,
  assignmentDetails: null,
  fetchAssignmentDetailsError: null,
};

const assignmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ASSIGNMENTS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_ASSIGNMENTS_SUCCESS:
      return {
        ...state,
        assignments: action.assignments,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_ASSIGNMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.CREATE_ASSIGNMENT_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CREATE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.CREATE_ASSIGNMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
      case actionTypes.FETCH_ASSIGNMENT_DETAILS_START:
      return {
        ...state,
        fetchingAssignmentDetails: true,
        assignmentDetails: null,
        fetchAssignmentDetailsError: null,
      };

    case actionTypes.FETCH_ASSIGNMENT_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingAssignmentDetails: false,
        assignmentDetails: action.assignmentDetails,
      };

    case actionTypes.FETCH_ASSIGNMENT_DETAILS_FAIL:
      return {
        ...state,
        fetchingAssignmentDetails: false,
        fetchAssignmentDetailsError: action.error,
      };
    default:
      return state;
  }
};

export default assignmentReducer;
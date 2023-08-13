import axios from 'axios';
import * as actionTypes from './actiontypes';

export const fetchAssignments = (token, courseID) => {
  return (dispatch) => {
    dispatch(fetchAssignmentsStart());

    const url = `https://academix-back-f296f40df966.herokuapp.com/api/${courseID}/assignment/list/`;

    const headers = {
      'Authorization': `Token ${token}`
    };

    axios
      .get(url, { headers })
      .then((res) => {
        const assignments = res.data;
        dispatch(fetchAssignmentsSuccess(assignments));
      })
      .catch((err) => {
        dispatch(fetchAssignmentsFail(err));
      });
  };
};

const fetchAssignmentsStart = () => {
  return {
    type: actionTypes.FETCH_ASSIGNMENTS_START,
  };
};

const fetchAssignmentsSuccess = (assignments) => {
  return {
    type: actionTypes.FETCH_ASSIGNMENTS_SUCCESS,
    assignments,
  };
};

const fetchAssignmentsFail = (error) => {
  return {
    type: actionTypes.FETCH_ASSIGNMENTS_FAIL,
    error,
  };
};

export const createAssignment = (
  token,
  courseID,
  title,
  dueDate,
  fullGrade,
  assignmentFile
) => {
  return (dispatch) => {
    dispatch(createAssignmentStart());

    const url = `https://academix-back-f296f40df966.herokuapp.com/api/${courseID}/assignment/add/`;
    console.log(url)

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    };

    const formData = new FormData();
    formData.append('title', title);
    formData.append('courseId', courseID);
    formData.append('due_date', dueDate);
    formData.append('full_grade', fullGrade);
    formData.append('assignment_files', assignmentFile);

    axios
      .post(url, formData, { headers })
      .then((res) => {
        dispatch(createAssignmentSuccess());
      })
      .catch((err) => {
        dispatch(createAssignmentFail(err));
      });
  };
};

const createAssignmentStart = () => {
  return {
    type: actionTypes.CREATE_ASSIGNMENT_START,
  };
};

const createAssignmentSuccess = () => {
  return {
    type: actionTypes.CREATE_ASSIGNMENT_SUCCESS,
  };
};

const createAssignmentFail = (error) => {
  return {
    type: actionTypes.CREATE_ASSIGNMENT_FAIL,
    error,
  };
};

export const fetchAssignmentDetails = (token, courseID, assignmentID) => {
    return dispatch => {
      dispatch(fetchAssignmentDetailsStart());
  
      const url = `https://academix-back-f296f40df966.herokuapp.com/api/${courseID}/${assignmentID}/detail/`;
  
      const headers = {
        'Authorization': `Token ${token}`,
      };
  
      axios.get(url, { headers })
        .then(res => {
          const assignmentDetails = res.data;
          dispatch(fetchAssignmentDetailsSuccess(assignmentDetails));
        })
        .catch(err => {
          dispatch(fetchAssignmentDetailsFail(err));
        });
    };
  };
  
  const fetchAssignmentDetailsStart = () => {
    return {
      type: actionTypes.FETCH_ASSIGNMENT_DETAILS_START
    };
  };
  
  const fetchAssignmentDetailsSuccess = (assignmentDetails) => {
    return {
      type: actionTypes.FETCH_ASSIGNMENT_DETAILS_SUCCESS,
      assignmentDetails
    };
  };
  
  const fetchAssignmentDetailsFail = error => {
    return {
      type: actionTypes.FETCH_ASSIGNMENT_DETAILS_FAIL,
      error
    };
  };
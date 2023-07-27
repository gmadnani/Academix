import * as actionTypes from "../actions/actiontypes.js";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  error: null,
  loading: false,
  role: '',
  registrationSuccess: false
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    role: action.role,
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authSignupSuccess = (state, action) => {
  return updateObject(state, {
    registrationSuccess: true
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.REGISTRATION_SUCCESS: 
      return authSignupSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;

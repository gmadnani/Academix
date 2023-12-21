import * as actionTypes from "./actiontypes";
import axios from "axios";

export const fetchUsersStart = () => ({
  type: actionTypes.FETCH_USERS_START,
});

export const fetchUsersSuccess = (users) => ({
  type: actionTypes.FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFail = (error) => ({
  type: actionTypes.FETCH_USERS_FAIL,
  payload: error,
});

export const fetchUsers = (token) => {
  return (dispatch) => {
    dispatch(fetchUsersStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get("https://academix-server.onrender.com/users/allprofile/")
      .then((res) => {
        const users = res.data;
        dispatch(fetchUsersSuccess(users));
      })
      .catch((err) => {
        dispatch(fetchUsersFail(err));
      });
  };
};

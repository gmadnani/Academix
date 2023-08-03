import axios from "axios";
import * as actionTypes from "./actiontypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, role) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    role: role
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const registrationSuccess = () => {
  return {
    type: actionTypes.REGISTRATION_SUCCESS,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem('role');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const getUserRoleStart = () => {
  return {
    type: actionTypes.GET_USER_ROLE_START
  }
}

export const getUserRoleSuccess = role => {
  return {
    type: actionTypes.GET_USER_ROLE_SUCCESS,
    role: role
  }
}

export const getUserRoleFail = error => {
  return {
    type: actionTypes.GET_USER_ROLE_FAIL,
    error: error
  }
}

export const getUserRole = () => {
  return (dispatch, getState) => {
    dispatch(getUserRoleStart());
    axios
      .get('http://127.0.0.1:8000/users/profile/', {
        headers: {
          'Authorization': `Token ${getState().auth.token}`
        }
      })
      .then(res => {
        const role = res.data.role;
        localStorage.setItem('role', role); // Store the role in local storage
        dispatch(getUserRoleSuccess(role));
        // Update the auth state with the fetched role
        dispatch(authSuccess(getState().auth.token, role));
      })
      .catch(err => {
        dispatch(getUserRoleFail(err));
      });
  }
}


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    // setTimeout(() => {
    //   const users = [
    //     {
    //       role: 'student',
    //       username: 'jack',
    //       password: '123456'
    //     },
    //     {
    //       role: 'student',
    //       username: 'bob',
    //       password: '123456'
    //     },
    //     {
    //       role: 'teacher',
    //       username: 'John',
    //       password: '123456'
    //     }
    //   ];

    //   const user = users.find(item => item.username === username && item.password === password);
    //   if (!user) {
    //     dispatch(authFail(new Error("Username or password is invalid!")));
    //   } else {
    //     localStorage.setItem("token", "token from be");
    //     localStorage.setItem("expirationDate", new Date("2023-12-12"));
    //     localStorage.setItem('role', user.role);
    //     dispatch(authSuccess("token from be", user.role));
    //     dispatch(checkAuthTimeout(3600));
    //   }
    // }, 1000)
    axios
      .post("http://127.0.0.1:8000/dj-rest-auth/login/", {
        username: username,
        password: password
      })
      .then(res => {
        console.log(res.data)
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token, null));
        dispatch(checkAuthTimeout(3600));
        dispatch(getUserRole());
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/dj-rest-auth/registration/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
        dispatch(registrationSuccess());
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const role = localStorage.getItem("role"); // retrieve role from local storage
        dispatch(authSuccess(token, role)); // pass the retrieved role
        dispatch(checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        ));
        axios.defaults.headers.common = {'Authorization': `Token ${token}`};
      }
    }
  };
};

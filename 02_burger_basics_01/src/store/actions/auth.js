import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
    loading: true
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    loading: false,
    token: token,
    userId: userId
  };
};

export const authFail = authFAil => {
  return {
    type: actionTypes.AUTH_FAIL,
    loading: true,
    authFAil: authFAil
  };
};

export const logout = () => {
  // calling logoutSaga
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  // return dispatch => {
  //     setTimeout(() => {
  //         dispatch(logout())
  //     }, expirationTime * 1000)
  // }
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
  };
};

export const setAuthRedirecPath = (path = "/") => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const auth = (email, password, isSingup) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSingup: isSingup
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };
};

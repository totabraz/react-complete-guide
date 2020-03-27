import { put, delay, call } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "axios";
import { URL_API_FIREBASE } from "../../utils/constants";

// Generator (function*)
export function* logoutSaga(action) {
  // yeild -> create a queue of each actions.
  // waiting each onde finish to go to the next

  // Why to yse call?  
  // to make it testable
  yield call([localStorage,"removeItem"],"token")
  yield call([localStorage,"removeItem"],"expirationDate")
  yield call([localStorage,"removeItem"],"userId")
//   yield localStorage.removeItem("token");
//   yield localStorage.removeItem("expirationDate");
//   yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecurityToken: true
  };
  const api_key = "AIzaSyCnkA2HRk_n2edF5KmNhLIobTNQ9ZbMpEY";
  let url = URL_API_FIREBASE + "accounts:signUp?key=" + api_key;
  if (!action.isSingup)
    url = URL_API_FIREBASE + "accounts:signInWithPassword?key=" + api_key;
  try {
    const response = yield axios.post(url, authData);
    const expirationTime = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationTime);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    //  'new Date(...)' because this date come as string when called from  getItem.
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate <= new Date()) {
      yield put(actions.authSuccess());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}

import * as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
        loading: true,
    }
}
export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        loading: false,
        authData: authData,

    }
}
export const authFail = (authFAil) => {
    return {
        type: actionTypes.AUTH_FAIL,
        loading: true,
        authFAil: authFAil
    }
}

export const auth =(email, password) => {
    return dispatch => (
        dispatch(authStart())
    )
}
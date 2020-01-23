import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
        loading: true,
    }
}
export const authSuccess = (token, userID) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        loading: false,
        token: token,
        userID: userID,

    }
}
export const authFail = (authFAil) => {
    return {
        type: actionTypes.AUTH_FAIL,
        loading: true,
        authFAil: authFAil
    }
}

export const logout = () => { 
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthtimeout = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSingup) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecurityToken: true,
        }
        const api_key = 'AIzaSyCnkA2HRk_n2edF5KmNhLIobTNQ9ZbMpEY'
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + api_key
        if (!isSingup)
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + api_key

        axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthtimeout(response.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}

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

    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const setAuthRedirecPath = (path = "/") => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            //  'new Date(...)' because this date come as string when called from  getItem.
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(authSuccess())
            } else {
                const userID = localStorage.getItem('userId')
                dispatch(authSuccess(token, userID))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
            }
        }
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
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationDate', expirationTime)
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err.response.data.error)
                dispatch(authFail(err.response.data.error))
            })
    }
}

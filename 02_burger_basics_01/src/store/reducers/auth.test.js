import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe('Auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/",
        })
    })

    it('should store the token login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/"
        }, {
            type: actionTypes.AUTH_SUCCESS,
            token: 'token',
            userId: 'userId'
        })).toEqual({
            token: 'token',
            userId: 'userId',
            error: null,
            loading: false,
            authRedirectPath: "/"
        })

    })
})

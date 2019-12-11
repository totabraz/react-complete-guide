import * as actionsTypes from "./actionTypes";

// ??? actionCreator ? 
//  Great to run AsyncCode 
export const storeResult = (result) => {
    // using therd lib "thunk"
    // handling Asynchronous code
    return dispatch => {
        setTimeout(() => {
            dispatch(saveResult(result))
        }, 2000)
    }
}

export const saveResult = (result) => {
    return {
        type: actionsTypes.STORE_RESULT,
        result: result,
    }
}

export const deleteResult = (resultElmentID) => {
    return {
        type: actionsTypes.DELETE_RESULT,
        resultElmentID: resultElmentID,
    }
}
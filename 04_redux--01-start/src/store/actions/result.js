import * as actionsTypes from "./actionTypes";

// ??? actionCreator ? 
//  Great to run AsyncCode 
export const storeResult = (result) => {
    // using therd lib "thunk"
    // handling Asynchronous code

    // you can manipulate the datas too. 
    // const updateResult = result * 2;
    // result  = updateResult + 2;
    
    /**
     * Getting the state
     */
    // return (dispatch, getState) => {
    //     setTimeout(() => {
    //         const oldCounter = getState().ctr.counter
    //         console.log('[oldCounter] ', oldCounter)
    //         dispatch(saveResult(result))
    //     }, 2000)
    // }
    return (dispatch, getState) => {
        setTimeout(() => {
            dispatch(saveResult(result))
        }, 500)
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
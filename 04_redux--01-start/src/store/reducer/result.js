import * as actionType from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    results: [],
}

const deleteReducer = (state, action) => {
    const updateArray = state.results.filter(result => { result.id !== action.resultElmentID })
    return updateObject(state, {results: updateArray})
}

const result = (state = initialState, action) => {
    switch (action.type) {
        case actionType.STORE_RESULT:
            // using concat unless push, you DONT mutate the state;    
            return updateObject(state, {
                results: state.results.concat({
                    id: new Date(),
                    value: action.result,
                })
            })
        case actionType.DELETE_RESULT:
            // const newResults = [...state.results]
            // newResults.splice(id,1)
            // return {
            //     ...state,
            //         results: newResults
            //         }
            //     }            
            // using filter unless splice, you DONT mutate the state;
            return deleteReducer( state,action)
        default:
            return state;
    }
}

export default result;
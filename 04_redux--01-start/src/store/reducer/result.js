
import * as actionType from '../actions/actionTypes'

const initialState = {
    results: [],
}

const result =  ( state = initialState, action) => {
    switch (action.type) {
        case actionType.STORE_RESULT:
            // using concat unless push, you DONT mutate the state;    
            return {
                ...state,
                    results: state.results.concat({
                        id: new Date(),
                        value: action.result,
                    })
                    
                }
        case actionType.DELETE_RESULT:
            // const newResults = [...state.results]
            // newResults.splice(id,1)
            // return {
            //     ...state,
            //         results: newResults
            //         }
            //     }            
            // using filter unless splice, you DONT mutate the state;
            const updateResult = state.results.filter(
                result => (result.id !== action.resultElmentID))
            return {
                ...state,
                results: updateResult
            }
    
        default:
            return state;
    }
}

export default result;

import * as actionType from '../actions/actions'

const initialState = {
    counter: 0,
}

const counter =  ( state = initialState, action) => {
    switch (action.type) {
        case actionType.INCREMENT:
            const newState = Object.assign({}, state)
            newState.counter = state.counter +1
            console.log(newState)
            return newState
        case actionType.DECREMENT:
            if (state.counter > 0) {
                return {
                    ...state,
                    counter: state.counter - 1
                }
            } else {
                return state
            } 
        case actionType.ADD:
            return { 
                ...state,
                counter: state.counter + action.value 
            }
        case actionType.SUBTRACT:
            if (state.counter>5) {
                return { 
                    ...state,
                    counter: state.counter - action.value 
                }
            } else {
                return { 
                    ...state,
                    counter: 0 
                }
            }    
        default:
            return state;
    }
}

export default counter;
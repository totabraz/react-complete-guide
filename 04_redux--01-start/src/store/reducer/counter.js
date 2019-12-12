import * as actionType from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    counter: 0,
}

const counter =  ( state = initialState, action) => {
    switch (action.type) {
        case actionType.INCREMENT:
            return updateObject(state,  {counter: state.counter + 1})
        case actionType.DECREMENT:
            if (state.counter > 0) {
                return updateObject(state,  {counter: state.counter - 1})
            } else {
                return state
            } 
        case actionType.ADD:
            return updateObject(state,  {counter: state.counter + action.value })
        case actionType.SUBTRACT:
            if (state.counter>5) {
                return updateObject(state,  {counter: state.counter - action.value })
            } else {
                return updateObject(state,  {counter: 0 })
            }    
        default:
            return state;
    }
}

export default counter;
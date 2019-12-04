// Store

// Reducer 

// Substription

// Dispatching Action

const redux = require('redux')

const createStore = redux.createStore;

const initialState = {
    counter: 0
}


// ===========================
//        REDUCER 
// ===========================
/**
 * @param {*} state //Current state 
 * @param {*} action  //Action to do
 * and return the updated state
 */
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INCREMENT_COUNTER":
            return{
                ...state,
                counter: state.counter++
            }
            break
        case "ADD_COUNTER":
            return{
                ...state,
                counter: state.counter + action.value
            }
            break
        case "IDENTIFIER":
            return{

            }
            break
    }
}

 const rootReducer2 = (state = initialState, action) => {
    switch (action.type) {
        case "INCREMENT_COUNTER":
            // Why to return as new state?
            // to NOT  
            return {
                ...state,
                counter: state.counter++
            }
            break

        case "ADD_COUNTER":
            return {
                ...state,
                counter: state.counter + action.value
            }
            break

        case "IDENTIFIER":
            break

    }
    return state
}


// ===========================
//           STORE
// ===========================
const store = createStore(rootReducer)
console.log(store.getState())


// ===========================
//       SUBSCRIPTION
// ===========================
// Its run when EVERY states update 
store.subscribe(() => {
    console.log('[subscribe]: ',store.getState())
})


// ===========================
//     DISPATCHING ACTION 
// ===========================
store.dispatch({ type: 'INCREMENT_COUNTER' })
store.dispatch({ type: 'ADD_COUNTER', value: 2 })
store.dispatch({ type: 'IDENTIFIER', payload: {} })
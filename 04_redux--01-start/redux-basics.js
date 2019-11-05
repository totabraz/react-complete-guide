const redux = require('redux');

const createStore = redux.createStore;

const initialState = {
    counter: 0

}
// Reducer 

const rootReducer =  (state = initialState, action ) => {
    switch(action.type) {
        case "INCREMENT_COUNTER":
            return {...state,
            counter: state.counter++}
        break

        case "ADD_COUNTER":
                return {...state,
                    counter: state.counter + action.value}
        break

        case "IDENTIFIER":
        break

    }
    return state
}
// Store
const store = createStore (rootReducer)
console.log(store.getState())

// Subscription
// When EVERY states update 
store.subscribe(() => {
    console.log('[subscribe]: ' + store.getState())
})

// Dispatching Action 
store.dispatch({type: 'INCREMENT_COUNTER', value:10 })
store.dispatch({type: 'ADD_COUNTER', value:{}})
store.dispatch({type: 'IDENTIFIER', payload: {}})

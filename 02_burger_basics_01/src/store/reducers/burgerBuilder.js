import * as actionType from '../actions/actionTypes'

const INGREDIENTS_PRICES = {
    salad: 0.25,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.5,
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: true
}

// action come here as a payload
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            }
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    //overiding deep 
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
            }
        case actionType.SET_INGREDIENT:
            console.log(action.ingredients)
            return {
                ...state,
                ingredients: action.ingredients
            }
            case actionType.FETCH_INGREDIENT_FAILED:
                    console.log(action)
            return {
                ...state,
                error: true,
            }
        default:
            return state
    }
}


export default reducer
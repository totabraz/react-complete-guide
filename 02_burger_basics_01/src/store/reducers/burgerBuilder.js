import * as actionType from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const INGREDIENTS_PRICES = {
    salad: 0.25,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.5,
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: true,
    building: false
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject(state.ingredients, updatedIng)
    const updtedStatet = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
    }
    return updateObject(state, updtedStatet)
}

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: initialState.totalPrice,
        error: false,
        building: false

    })
}

const fetchIngredientFailed = (state, action) => {
    return updateObject(state, { error: true })
}

// action come here as a payload
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT: return addIngredient(state, action)
        case actionType.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionType.SET_INGREDIENT: return setIngredient(state, action)
        case actionType.FETCH_INGREDIENT_FAILED: return fetchIngredientFailed(state, action)
        default: return state
    }
}


export default reducer
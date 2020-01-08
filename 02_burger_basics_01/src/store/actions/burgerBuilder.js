import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    // console.log('[setIngredients]')

    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients,
    }
}

export const fetchIngredientsFailed = () => {
    // console.log('[fetchIngredientsFailed]')

    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED,

    }
}

export const initIngredients = () => {
    // console.log('[initIngredients]')
    return dispatch => {
        // axios.get('https://react-my-burger-cc06d.firebaseio.com/ingredients.json')
        axios.get('ingredients.json')
            .then(response => {
                // console.log('[initIngredients] =', response.data)
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                // console.log('[initIngredients] =', error)
                dispatch(fetchIngredientsFailed())
            })
    }
}



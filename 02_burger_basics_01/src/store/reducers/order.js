import * as actionType from '../actions//actionTypes'
import { updateObject } from '../../store/utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
}


const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false })
}

const purchaseBurguerStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const purchaseBurguerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId })
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
    })
}
const purchaseBurguerFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const fetchOrdersStart = (state, action) => {
    return updateObject(state, { loading: true, })
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, { orders: action.orders, loading: false })
}

const fetchOrdersFail = (state, action) => {
    return updateObject(state, { loading: false, })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_INIT: return purchaseInit(state, action)
        case actionType.PURCHASE_BURGUER_START: return purchaseBurguerStart(state, action)
        case actionType.PURCHASE_BURGUER_SUCCESS: return purchaseBurguerSuccess(state, action)
        case actionType.PURCHASE_BURGUER_FAIL: return purchaseBurguerFail(state, action)
        case actionType.FETCH_ORDERS_START: return fetchOrdersStart(state, action)
        case actionType.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
        case actionType.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action)
        default:return state

    }

}



export default reducer;
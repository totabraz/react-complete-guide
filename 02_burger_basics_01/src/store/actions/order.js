import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_SUCCESS,
        orderId: id, 
        orderData: orderData,
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGUER_START,

    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData)
        .then(response => {
            dispatch( purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch( purchaseBurgerSuccess(error))
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
     
}


export const fetchOrderStart =  () => {
    return { 
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrderSuccess =  (orders) => {
    return { 
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    }
}

export const fetchOrderFail =  (error) => {
    return { 
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error,
    }
}

export const fetchOrder = () => {
    return dispatch => {
        dispatch(fetchOrderStart())
        axios.get('/orders.json')
        .then(resp =>  {
            this.setState({loading: false})
            const fetchOrders = []
            for (let key in resp.data) {
                fetchOrders.push({
                    ...resp.data[key],
                    id:key})
            }
            dispatch(fetchOrderSuccess(fetchOrders))
            })
        .catch( error => {
            dispatch(fetchOrderFail(error))
        })
    }
}
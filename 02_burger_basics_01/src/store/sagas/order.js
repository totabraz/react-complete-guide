import { put } from "redux-saga/effects";
import axios from "../../axios-orders";
import * as actions from "../actions/index";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (error) {
    yield put(actions.purchaseBurgerSuccess(error));
  }
}

export function* fetchOrderSaga(action) {
  yield put(actions.fetchOrderStart());
  const queryParams = yield "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  try {
    const resp = yield axios.get("/orders.json" + queryParams);
    const fetchOrders = [];
    for (let key in resp.data) {
      fetchOrders.push({
        ...resp.data[key],
        id: key
      });
    }
    yield put(actions.fetchOrderSuccess(fetchOrders));
  } catch (error) {
    yield put(actions.fetchOrderFail(error));
  }
}

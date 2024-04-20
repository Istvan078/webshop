import { createAction, props } from "@ngrx/store"
import { Order } from "../../../models/order.model"


export const ADD_ORDER = '[ORDER] Add Order'
export const GET_ORDERS = '[ORDER] Get Orders'
export const GET_ORDERS_SUCCESS = '[ORDER] Get Orders Success'



export const addOrder = createAction(ADD_ORDER, props<Order>())
export const getOrders = createAction(GET_ORDERS)
export const getOrdersSuccess = createAction(GET_ORDERS_SUCCESS, props<{payload: Order[]}>())
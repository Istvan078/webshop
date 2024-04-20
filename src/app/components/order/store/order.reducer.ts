import { createReducer, on } from "@ngrx/store";
import { Order } from "../../../models/order.model";
import * as OrderActions from './order.actions'



export interface State {
    orders: Order[]
} 

export const initialState: State = {
    orders: []
}

export const orderReducer = createReducer(
    initialState,
    on(OrderActions.getOrders, (state) => {
       return {...state}
    }),
    on(OrderActions.getOrdersSuccess, (state, action) => {
        console.log('****SIKERES RENDELÉSLEKÉRÉS****')
        return {...state, orders: [...action.payload]}
     }),
    on(OrderActions.addOrder, (state, action) => {
        return {...state, orders: [...state.orders, action]}
    })
)
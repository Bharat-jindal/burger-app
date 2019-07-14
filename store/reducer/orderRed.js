import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'


const initialState = {
    order:[],
    loading: false,
    purchased:false
}

const initPurchase = (state,action) => {
    return updateObject(state,{purchased:false})
}

const purchaseBurgerStart =(state,action) => {
    return updateObject(state,{loading: true})
}

const purchaseBurgerSuccess = (state,action) => {
    const newOrder= updateObject(action.orderData,{id:action.orderId})
        return updateObject(state,{
            loading: false,
            purchased: true,
            order: state.order.concat(newOrder)})
}

const purchaseBurgerFail =(state,action) => {
    return updateObject(state,{loading: false})
}
const fetchOrdersStart = (state,action) => {
    return updateObject(state,{loading: true})
}
const fetchOrdersSuccess = (state,action) => {
    return updateObject(state,{loading: false,order:action.orders})   
}
const fetchOrdersFail = (state,action) => {
    return updateObject(state,{loading: false})
}
const reducer = (state=initialState,action) =>{
    switch(action.type){
        case actionTypes.INIT_PURCHASE: return initPurchase(state,action)
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state,action)
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action)
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state,action)
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state,action)
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state,action)
        case actionTypes.FETCH_ORDERS_FAIL:return fetchOrdersFail(state,action)
        default: return state
    }
}

export default reducer;
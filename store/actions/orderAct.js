import * as actionTypes from './actionTypes';
import axios from '../../axiosOreders';

const purchaseBurgerSuccess = (id,orderData) => {
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderData: orderData,
        orderId: id
    }
}

const purchaseBurgerFail = (error) => {
    return {
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

const purchaseBurgerStart = () => {
    return {
        type:actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger= (orderData,token) => {
    return (dispatch) => {
    dispatch(purchaseBurgerStart())
    axios.post('/orders.json?auth='+token,orderData)
    .then(response => {
        return dispatch(purchaseBurgerSuccess(response.data.name,orderData))
    })
    .catch(error => {
       return dispatch(purchaseBurgerFail(error))
    })
}
}

export const purchaseInit = () => {
    return {
        type:actionTypes.INIT_PURCHASE
    }
}

const fetchOrderStart = () => {
    return{
        type:actionTypes.FETCH_ORDERS_START
    }
}

const fetchOrderSuccess = (orders) => {
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

const fetchOrderFail = (error) => {
    return{
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}

export const fetchOrders = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        const queryParams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryParams)
        .then(res=>{
            const fetchedOrders=[];
            for(let key in res.data){
                fetchedOrders.push({...res.data[key],
                    id:key})
            }
            return dispatch(fetchOrderSuccess(fetchedOrders))
            //this.setState({loading:false,orders:fetchedOrders})
        })
        .catch(err => {
            return dispatch(fetchOrderFail(err))
        })
    }
}
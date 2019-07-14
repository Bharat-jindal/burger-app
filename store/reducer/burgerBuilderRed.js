import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'

const initialState={
    ingredients:null,
    totalPrice:4,
    error: false
}

const priceList ={
    cheese:0.5,
    bacon:0.8,
    salad:0.4,
    meat:1.1
}

const addIngerdients = (state,action) => {
    const updatedIngredient={[action.ingredientName]:state.ingredients[action.ingredientName]+1}
        const updatedIngredients =updateObject(state.ingredients,updatedIngredient);
        const updatedState = {
            ingredients: updatedIngredients,
            totalPrice:state.totalPrice+priceList[action.ingredientName]
        }
        return updateObject(state,updatedState);
}
const removeIngredients = (state,action) => {
    const updatedIng={[action.ingredientName]:state.ingredients[action.ingredientName]-1}
        const updatedIngs =updateObject(state.ingredients,updatedIng);
        const updatedSt= {
            ingredients: updatedIngs,
            totalPrice:state.totalPrice-priceList[action.ingredientName]
        }
        return updateObject(state,updatedSt);
}
const initIngredients = (state,action) => {
    return updateObject(state,{
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
    })
}
const fetchStateError = (state,action) => {
    return updateObject(state,{error:true})
}

const reducer = (state=initialState,action) => {
    
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS: return addIngerdients(state,action)
        // return {
        //     ...state,
        //     ingredients:{
        //         ...state.ingredients,
        //         [action.ingredientName]:state.ingredients[action.ingredientName]+1,
                
        //     },
        //     totalPrice:state.totalPrice+priceList[action.ingredientName]
        // };
        case actionTypes.REMOVE_INGREDIENTS: return removeIngredients(state,action)
        case actionTypes.INIT_INGREDIENTS: return initIngredients(state,action)
        case actionTypes.FETCH_STATE_ERROR: return fetchStateError(state,action)
        default:return state;
    }
};


export default reducer;
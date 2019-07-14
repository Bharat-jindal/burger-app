import * as actionTypes from './actionTypes';
import axios from '../../axiosOreders';

export const addIngredient = (ingName) => {
    return {
        type:actionTypes.ADD_INGREDIENTS,
            ingredientName:ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type:actionTypes.REMOVE_INGREDIENTS,
            ingredientName:ingName
    }
}

const setIngredients =(ingredients) => {
    return{
        type:actionTypes.INIT_INGREDIENTS,
            ingredients:ingredients
    }
}

const fetchStateError = () => {
    return {
        type:actionTypes.FETCH_STATE_ERROR,
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('https://react-burger-app-773ea.firebaseio.com/ingredients.json')
        .then(response => {
            return dispatch(setIngredients(response.data))
            })
            .catch(error => {console.log(error)
                return dispatch(fetchStateError());
            }
            )
    
}
}
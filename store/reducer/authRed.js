import {updateObject} from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState ={
    idToken:null,
    userId: null,
    loading: false,
    error: null,
    redirectPath: '/'
}

const authStart = (state,action) => {
    return updateObject(state,{loading: true,error: null})
}
const authSuccess = (state,action) => {
    return updateObject(state,{
        idToken:action.idToken,
        userId: action.userId,
        loading:false,
        error: null
    })
}
const authFail = (state,action) => {
    return updateObject(state,{
        loading: false,
        error: action.error
    })
}
const authLogout = (state,action) => {
    return updateObject(state,{
        idToken:null,
        userId:null
    })
}
const setRedirectPath = (state,action) => {
    return updateObject(state,{redirectPath:action.path})
}
const reducer = (state=initialState,action) => {
    switch(action.type) {
        case actionTypes.AUTH_START : return authStart(state,action)
        case actionTypes.AUTH_SUCCESS : return authSuccess(state,action)
        case actionTypes.AUTH_FAIL: return authFail(state,action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action)
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setRedirectPath(state,action)
        default: return state
    }
}

export default reducer
import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
};

const authSuccess= (idToken,userId) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
};

const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
};

export const authLogout = () => {
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('idToken');
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            return dispatch(authLogout())
        },expirationTime*1000)
    }
}

export const authentication = (email,password,isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const reqPayload={
            email:email,
            password: password,
            returnSecureToken: true
        }
        let URL ='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCKXyGN9Vm7nGSNPtYv9z09fBGS33FI9LM'
        if(!isSignUp){
            URL='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCKXyGN9Vm7nGSNPtYv9z09fBGS33FI9LM'
        }
        axios.post(URL,reqPayload)
        .then(response=> {
            const expirationTime=new Date(new Date().getTime()+response.data.expiresIn*1000);
            localStorage.setItem('idToken',response.data.idToken);
            localStorage.setItem('expirationTime',expirationTime);
            localStorage.setItem('userId',response.data.localId)
            dispatch(checkAuthTimeOut(response.data.expiresIn))
            return dispatch(authSuccess(response.data.idToken,response.data.localId))
        })
        .catch(err =>{
            let error= err
            if(err.response){
                error=err.response.data.error
            }
            return dispatch(authFail(error.message))
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState = () => {
    return dispatch => {
       const idToken = localStorage.getItem('idToken')
       if(!idToken){
        return dispatch(authLogout())
       }else{
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if(expirationTime < new Date()){
            return dispatch(authLogout())
        }else{
            const userId=localStorage.getItem('userId')
            dispatch(authSuccess(idToken,userId))
            return dispatch(checkAuthTimeOut((expirationTime.getTime()-new Date().getTime())/1000))
        }
       }
    }
}
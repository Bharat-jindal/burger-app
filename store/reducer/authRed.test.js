import reducer from './authRed.js';
import * as actionTypes from '../actions/actionTypes';

describe('authRed',()=>{
    it('should return initial state if we pass no ingredients',()=>{
        expect(reducer(undefined,{})).toEqual({
            idToken:null,
            userId: null,
            loading: false,
            error: null,
            redirectPath: '/'
        })
    })

    it('should return initial state if we pass no ingredients',()=>{
        expect(reducer({idToken:null,
            userId: null,
            loading: false,
            error: null,
            redirectPath: '/'
        },{
            type: actionTypes.AUTH_SUCCESS,
            idToken:'some-token',
            userId: 'some-userid'
        })).toEqual({
            idToken:'some-token',
            userId: 'some-userid',
            loading: false,
            error: null,
            redirectPath: '/'
        })
    })
})
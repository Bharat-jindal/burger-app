import React , { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Auth.css' ;
import * as actions from '../../store/actions/index';
import {updateObject,checkValidity} from '../../shared/utility'

class Auth extends Component {
 state= {
     config:{
        email:{
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder: 'Enter Your Mail'
            },
            value:'',
            validation:{
                required: true,
                isMail: true
            },
            isValid: false,
            touched: false,
        },
        password:{
            elementType:'input',
            elementConfig:{
                type:'password',
                placeholder: 'Enter Password'
            },
            value:'',
            validation:{
                required: true,
                minLength:6
            },
            isValid: false,
            touched: false,
        }
     },
     formIsValid: false,
     isSignUp: true
 }

 componentDidMount(){
     if(!this.props.buildingBurger && this.props.authRedirectPath!=='/'){
         this.props.onSetAuthRedirectPath('/')
     }
     
 }

 clickChangeHandler(event,formElementId){
     const updatedFormElement =updateObject(this.state.config[formElementId],{
        value: event.target.value,
        isValid: checkValidity(event.target.value,this.state.config[formElementId].validation),
        touched: true
     })
     const updatedConfig=updateObject(this.state.config,{
        [formElementId]:updatedFormElement
    });
    let formValidation=true;
        for(let inputidentifier in updatedConfig){
            formValidation=updatedConfig[inputidentifier].isValid&&formValidation;
        }
    this.setState({config:updatedConfig,formIsValid:formValidation})
 }

onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onauth(this.state.config.email.value,this.state.config.password.value,this.state.isSignUp)
}

switchAuthHandler =() => {
    this.setState(prevState=> {
        return {isSignUp: !prevState.isSignUp}
    })
}

 render() {
    let formElementArray=[];
    for(let key in this.state.config){
        formElementArray.push({
            id: key,
            config:this.state.config[key]
        })
    }

    let form =formElementArray.map(formElement => (
        <Input 
        key={formElement.id}
        elementType={formElement.config.elementType}
         elementConfig={formElement.config.elementConfig} 
         value={formElement.config.value}
         validation={formElement.config.isValid}
         shouldValidate={formElement.config.validation}
         touched={formElement.config.touched}
         changed={(event) =>this.clickChangeHandler(event,formElement.id)} />      
    ))
    if(this.props.loading){
        form =<Spinner />
    }

    let errorMessage = null;
    if(this.props.error){
        errorMessage = (
            <p>{this.props.error}</p>
        )
    }

    let redirectAuth=null;
    if(this.props.isAuthenticated){
        redirectAuth= <Redirect to={this.props.authRedirectPath} />
    }
     return(
         <div className="Auth">
         {redirectAuth}
             {errorMessage}
             <form onSubmit={this.onSubmitHandler}>
                 {form}
                 <Button btnType="Success" disabled={!this.state.formIsValid}>{this.state.isSignUp ? 'SignUp' : 'SignIn'}</Button>
             </form>
             <Button btnType="Danger"
                clicked={this.switchAuthHandler} >
                Switch To {this.state.isSignUp ? 'SignIn' : 'SignUp'}
             </Button>
         </div>
     )
 }
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated:state.auth.idToken!==null,
        authRedirectPath: state.auth.redirectPath,
        buildingBurger: state.burgerBuilder.totalPrice > 4 
    }
}

const mapDispatchToProps= dispatch => {
    return {
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path)),
        onauth: (email,password,isSignUp) => dispatch(actions.authentication(email,password,isSignUp))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
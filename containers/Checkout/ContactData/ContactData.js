import React,{Component} from 'react';
import './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axiosOreders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject,checkValidity} from '../../../shared/utility'

class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Your Name'
                },
                value:'',
                validation:{
                    required: true
                },
                isValid: false,
                touched: false,
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Street Name'
                },
                value:'',
                validation:{
                    required: true
                },
                isValid: false,
                touched: false,
            },
            pincode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'PIN CODE'
                },
                value:'',
                validation:{
                    required: true,
                    minLength:6,
                    maxLength:6
                },
                isValid: false,
                touched: false,
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'E-mail'
                },
                value:'',
                validation:{
                    required: true,
                    isMail: true
                },
                isValid: false,
                touched: false,
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Country'
                },
                value:'',
                validation:{
                    required: true
                },
                isValid: false,
                touched: false,
            },
            delieveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value:'fastest',
                validation:{},
                isValid: true,
                touched: false,
            },
            
        },
        formIsValid: false
    }

    orderHandler= (event)=> {
        event.preventDefault();
        const formData = {};
        for(let inputNameIdentifier in this.state.orderForm){
            formData[inputNameIdentifier]=this.state.orderForm[inputNameIdentifier].value;
        }

        const order ={
            ingredients:this.props.ings,
            price:this.props.price,
            consumerDetails:formData,
            userId: this.props.userId
        }

        this.props.onOrderButton(order,this.props.token);
    }

    clickChangeHandler=(event,inputIdentifier) =>{
        const updatedElement= updateObject(this.state.orderForm[inputIdentifier],{
            value:event.target.value,
            isValid:checkValidity(event.target.value,this.state.orderForm[inputIdentifier].validation),
            touched:true
        })
        const updatedOrderForm=updateObject(this.state.orderForm,{
            [inputIdentifier]:updatedElement
        });
        let formValidation=true;
        for(let inputidentifier in updatedOrderForm){
            formValidation=updatedOrderForm[inputidentifier].isValid&&formValidation;
        }
        
        this.setState({orderForm:updatedOrderForm,formIsValid:formValidation});
    }

    render(){
        
        let formElementArray=[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config:this.state.orderForm[key]
            })
        }
        let form=(<form onSubmit={this.orderHandler}>
            
            {formElementArray.map(formElement => (
                <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                 elementConfig={formElement.config.elementConfig} 
                 value={formElement.config.value}
                 validation={formElement.config.isValid}
                 touched={formElement.config.touched}
                 changed={(event) =>this.clickChangeHandler(event,formElement.id)} />
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>)
        if(this.props.loading){
            form=<Spinner />
        }
        return(
            <div className="ContactData">
                <h4>Enter your contact detail</h4>
                {form}
            </div>
        )
        }
};

const mapStateToProps= state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderButton: (orderData,token)=> dispatch(actions.purchaseBurger(orderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
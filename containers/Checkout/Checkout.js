import React ,{Component} from 'react';
import CheckOutSummary from '../../components/Order/OrderSummary/CheckOutSummary'
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux'

class Checkout extends Component {
    state={
        ingredients:{
            bacon:1,
            cheese:1,
            meat:1,
            salad:1
        },
        totalPrice:0,
    }

    // componentWillMount() {
    //     const query =new URLSearchParams(this.props.location.search);
    //     const ingredients={
    //         bacon:1,
    //         cheese:1,
    //         meat:1,
    //         salad:1
    //     };
    //     let price=0;
    //     for(let params of query.entries()){
    //         if(params[0]==='price'){
    //             price=params[1];
    //         }
    //         else{
    //             ingredients[params[0]]=+[params[1]];
    //         }
    //     }
    //     this.setState({ingredients:ingredients,totalPrice:price})
        
    // }

    checkoutCancelHandler=()=>{
        this.props.history.goBack();
    }
    checkoutContinueHandler=()=>{
        this.props.history.replace('/checkout/contact-data')
    }
    render(){
        let summary = <Redirect to="/"/>
        if(this.props.ings){
            summary =this.props.purchased ? <Redirect to="/"/> :
            (
                <div>
                <CheckOutSummary ingredients={this.props.ings} 
                checkoutCancel={this.checkoutCancelHandler}
                checkoutContinue={this.checkoutContinueHandler}/>
                <Route path={this.props.match.path+'/contact-data' }
                component={ContactData} />
                </div>
            )
        } 

        return(
            <div>
                {summary}
            </div>
            
        )

    }
}

const mapStateToProps = state => {
    return{
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}
export default connect(mapStateToProps)(Checkout);
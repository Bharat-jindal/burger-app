import React , {Component} from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axiosOreders';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

class Orders extends Component {

    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId);
        
    }
    render(){
        let orders =(
            this.props.orders.map(order => (
                <Order ingredients={order.ingredients}
                price={order.price}
                key={order.id}/>
            ))
        )
        if(this.props.loading){
            orders=<Spinner />
        }
        return(
            <div>
                {orders}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.order,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps =dispatch => {
    return {
        onFetchOrders : (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));
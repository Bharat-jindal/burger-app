import React , {Component} from 'react';
import Aux from '../../hoc/Auxe/Auxilliary'
import Burger from '../../components/Burger/Burger'
import BuildControl from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axiosOreders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';




export class BurgerBuilder extends Component{
    state ={
        purchasing: false,
    }
    componentDidMount(){
        this.props.setInitialState()
    }

    updatedPurchaseSatate =(ingredients) => {
        const sum= Object.keys(ingredients).map(
            igkey => {
                return ingredients[igkey]}
        ).reduce((sum,el)=> {
            return sum+el;
        },0);
        return sum>0
    }

    purchaseHandler= () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing:true})
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    cancelPurchaseHandler= () => {
        this.setState({purchasing:false})
    }

    continuePurchaseHandler= () => {
        // this.setState({spinner:true})
        // const order ={
        //     ingredients:this.state.ingredients,
        //     price:this.state.price,
        //     customer:{
        //         name:'Bharat Jindal',
        //         address:{
        //             street:'Testrdsdsdvv',
        //             pincode:'saefsfav',
        //         },
        //         email:'adkvjdsfnkjvn@ajcndj.com',
        //     },
        //     delieveryMethod: 'Fastest'
        // }
        // axios.post('/orders.json',order)
        // .then(response => {
        //     this.setState({spinner:false,purchasing:false});
        //     console.log('Post order response',response);
        // })
        // .catch(error => {
        //     this.setState({spinner:false,purchasing:false})
        // })
        this.props.onInitPurchase()
        this.props.history.push('/checkout');
        
    }

    

    render(){
        const disabledInfo={
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        let burgerBuilder =<Spinner />;
        if(this.props.error){
            burgerBuilder=<p>The page can't be loaded</p>
        }
        let order= null;
    if(this.props.ings){
        burgerBuilder=(<Aux>
            <Burger ingredients={this.props.ings} />
                <BuildControl addIngredient={this.props.onIngredientAdded}
                 removeIngredient={this.props.onIngredientRemoved}
                 disabled={disabledInfo}
                 price={this.props.price}
                 purchasable={this.updatedPurchaseSatate(this.props.ings)}
                 purchasingNow={this.purchaseHandler} />
        </Aux>)
        order =<OrderSummary ingredients={this.props.ings}
        cancelPurchase={this.cancelPurchaseHandler}
        continuePurchase={this.continuePurchaseHandler}
        price={this.props.price}/>
    }
        
        if(this.state.spinner){
            order=<Spinner />
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {order}
                </Modal>
                {burgerBuilder}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.idToken !==null
    }
}

const mapDispatchToProps =dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        setInitialState : () => dispatch(actions.initIngredient()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
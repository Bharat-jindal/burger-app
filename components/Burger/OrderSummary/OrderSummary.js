import React from 'react';
import Aux from '../../../hoc/Auxe/Auxilliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) =>{
    const ingredientSummary = Object.keys(props.ingredients).map(
        (igkey) => (
            <li key={igkey}>
            <span style={{textTransform:"capitalize"}}>{igkey}</span>:
            {props.ingredients[igkey]}
            </li>
        )
    )
    return(
        <Aux>
            <p>YOUR ORDER</p>
            <p>Your delecious burger is ready</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price:{props.price.toFixed(2)}</strong></p>
            <p>Proceed to checkout!!</p>
            <Button btnType={'Danger'} clicked={props.cancelPurchase}>CANCEL</Button>
            <Button btnType={'Success'} clicked={props.continuePurchase}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;
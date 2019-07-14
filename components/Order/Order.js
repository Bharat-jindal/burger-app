import React from 'react';
import './Order.css';

const Order =(props) => {
    const ingredients=[];
    for(let ingname in props.ingredients){
        ingredients.push(
            {
                name:ingname,
                amount: props.ingredients[ingname]
            }
        )
    };

    const ingredientOutput = ingredients.map(ig => (
        <span 
        style={{textTransform:"capitalize",
                display:'inline-block',
                margin:'0 8px',
                border:'1px solid #ccc',
                padding:'5px'}}
        key={ig.name}>{ig.name} ({ig.amount})</span>
    ));

    return(
        <div className='Order'>
        <p>ingredients:{ingredientOutput}</p>
        <p>Price <strong>USD{Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>

    )
};

export default Order;
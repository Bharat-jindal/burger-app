import React from 'react';
import './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igkey => {
        return [...Array(props.ingredients[igkey])].map((_,i) => (
            <BurgerIngredients key={igkey+i} type={igkey} />
        )
        )
    }

    ).reduce((arr,el) => {
        return arr=arr.concat(el);
    })

    if(transformedIngredients.length===0){
        transformedIngredients=<div>Please add the ingredients!</div>
    }
    return (
        <div className='Burger'>
        <BurgerIngredients type='bread-top'/>
        {transformedIngredients}
        <BurgerIngredients type='bread-bottom'/>
        </div>
    )
};

export default burger;
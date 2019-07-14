import React from 'react';
import './Buildcontrols.css';
import Buildcontrol from './BuildControl/BuildControl';

const controls =[
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},
]

const buildcontrols = (props) => (
    <div className={'Buildcontrols'}>
    <p><strong>{props.price.toFixed(2)}</strong></p>
    {controls.map((ctrl) => (
        <Buildcontrol key={ctrl.label} label={ctrl.label} 
        addingIngredient={() => props.addIngredient(ctrl.type)}
        removingIngredient={() => props.removeIngredient(ctrl.type)}
        disabled={props.disabled[ctrl.type]}/>
    ))}
    <button className={'OrderButton'} disabled={!props.purchasable} onClick={props.purchasingNow}>ORDER NOW</button>
    </div>
);

export default buildcontrols;
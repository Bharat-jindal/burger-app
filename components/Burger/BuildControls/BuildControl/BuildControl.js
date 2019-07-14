import React from 'react';
import './BuildControl.css';

const buildcontrol = (props) => (
    <div className={'BuildControl'}>
        <div className={'Label'}>{props.label}</div>
        <button className={'Less'} onClick={props.removingIngredient}
         disabled={props.disabled}>Less</button>
        <button className={'More'} onClick={props.addingIngredient}>More</button>
    </div>
);

export default buildcontrol;


import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckOutSummary.css'


const CheckOutSummary =(props) => {
    return (
        <div className='CheckOutSummary'>
            <h1>WE hope you like the Burger</h1>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType='Danger' clicked={props.checkoutCancel}>CANCEL</Button>
            <Button btnType='Success' clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
    )
};

export default CheckOutSummary;
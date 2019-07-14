import React from 'react';
import imagelogo from '../../assets/images/burger-logo.png';
import './Logo.css'

const logo=() => (
    <div className={'Logo'}>
        <img src={imagelogo} alt='MyBurger'/>
    </div>
)
export default logo;
import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxe/Auxilliary';

const sideDrawer= (props) => {
    let classes = ['SideDrawer','Close'];
    if(props.show){
        classes = ['SideDrawer','Open'];
    }
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.clicked}/>
        <div className={classes.join(' ')} onClick={props.clicked}>
            <div className={'SideDrawerLogo'}>
            <Logo />
            </div>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </div>
        </Aux>
    )
}

export default sideDrawer
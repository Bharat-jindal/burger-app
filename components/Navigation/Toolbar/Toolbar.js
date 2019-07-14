import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToogle/DrawerTaggle'

const toolbar = (props) =>(
    <header className={'Toolbar'}>
        <DrawerToggle clicked={props.clicked}>MENU</DrawerToggle>
        <div className='ToolbarLogo'>
            <Logo/>
        </div>
        <nav className={'DesktopOnly'}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;
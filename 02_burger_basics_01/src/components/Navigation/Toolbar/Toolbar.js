import React from 'react';
import classes from './Toolbar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle drawerToggleClicked={props.openDrawer}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;
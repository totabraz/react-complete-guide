import React,  { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css'
import Toolbar from '../../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    constructor(props){
        super(props);
        this.state = {
            showSideDrawer: true
        }
    }

    
    showSideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
    }

    SideDrawerTogglerHandler = () => {
        this.setState(
            (prevState) => {return {showSideDrawer: !prevState.showSideDrawer}}
            )
            // to prevent unspected actions
    }

    render (){
        return (
            <Aux>
                <Toolbar openDrawer={this.SideDrawerTogglerHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.showSideDrawerHandler}/>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;
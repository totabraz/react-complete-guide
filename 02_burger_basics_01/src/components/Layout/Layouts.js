import React,  { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

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

    render (){
        return (
            <Aux>
                <Toolbar/>
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
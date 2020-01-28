import React,  { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'
class Layout extends Component {
    constructor(props){
        super(props);
        this.state = {
            showSideDrawer: false
        }
    }

    showSideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
    }

    SideDrawerTogglerHandler = () => {
        this.setState(
            (prevState) => {return {showSideDrawer: !prevState.showSideDrawer}}
            )
            // to prevent  unspected actions
    }

    render (){
        return (
            <Aux>
                <Toolbar
                    isAuthenticated={this.props.isAuthenticated}
                    openDrawer={this.SideDrawerTogglerHandler}/>
                <SideDrawer 
                    isAuthenticated={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.showSideDrawerHandler}/>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return { 
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
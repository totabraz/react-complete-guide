import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import * as actions from './store/actions/index'
import { connect } from 'react-redux';
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})
const asyncBurgerBuilder = asyncComponent(() => {
  return import('./containers/BurgerBuilder/BurgerBuilder')

})
const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')

})
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')

})
const asyncLogout = asyncComponent(() => {
  return import('./containers/Auth/Logout/Logout')

})
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSingup()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={asyncBurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={asyncLogout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={asyncBurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div className="App">
        <Layout>
          {routes}

        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSingup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

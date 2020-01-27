import React, { Component } from 'react';
// import logo from './logo.svg'; 
import './App.css';
import Layout from './hoc/Layout/Layout'
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import * as actions from './store/actions/index'
import Auth from './containers/Auth/Auth'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';


class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSingup()
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
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

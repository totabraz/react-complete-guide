import React, { Component } from 'react'
import { Link, Route, Switch } from "react-router-dom";

import Users from './containers/Users';
import asyncComponent from "./hoc/asyncComponent";

const AsyncPizza = asyncComponent(() => import('./containers/Pizza'))

class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to="/pizza">Pizza</Link>
                    <Link to="/">Users</Link>
                </div>
                <div>
                    <Route path="/" exact component={Users} />
                    <Route path="/pizza" exact component={AsyncPizza} />
                </div>
            </div>
        )
    }
}

export default App



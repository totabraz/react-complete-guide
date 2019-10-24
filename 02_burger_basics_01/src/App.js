import React from 'react';
// import logo from './logo.svg'; 
import './App.css';


import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout'
import Checkout from './containers/Checkout/Checkout';

import { Switch, Route } from "react-router-dom";
import Orders from './containers/Orders/Orders';

function App() {
  return (
    <div className="App">
      <Layout>
          <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/" component={BurgerBuilder} />
          </Switch>
      </Layout>
    </div>
  );
}

export default App;

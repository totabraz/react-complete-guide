import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'

import Blog from './containers/Blog/Blog';
class App extends Component {
  render() {
    return (
        // Basename, to correct the URL dir on server.
        // <BrowserRouter basename="/folder-name">
        <BrowserRouter basename="/">
            <div className="App">
                <Blog />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;

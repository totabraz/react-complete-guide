import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import axios from "axios";

// Setting default and global configurations to axios
// Help to you ptimize your code a lot.
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * IMPORTANT TO REMEMBER
 * ALL interceptors MUST TO HAVE the return
 */
// axios.interceptors.request.use();
axios.interceptors.request.use(request => {
    console.log(request)
    return request;
}, error => {
    // This error is from requests Errors
    // Like NO CONNECTIONS
    console.log(error)
    return error;
});

// Now, we con intercept the responses..
// and fetch erros correctly 
axios.interceptors.response.use(response => {
    console.log(response)
    return response
}, error => {
    console.log(error)
    return Promise.reject(error)
})
ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();

import axios from "axios";
/**
 * ======== IMPORTANT ======== 
 * In this case. 
 * you will create another instance.. 
 * so have to import it instead normal 'axios'
 * - removing the global: 
 * ----  import axios from "axios";
 * - and importing this new component
 * ---- import axios from "../..../axios";
 * 
 */

 // Why? 
 // To use a differente configuration eg.
 // Another route from tha default. 
 // to intercept some data.. 
 // ...
 
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

/**
 * And you can use interceptors too.
 */
// axios.interceptors......
// axios.interceptors.request......
// axios.interceptors.response......

axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN  FROM INSTANCE';

export default instance;
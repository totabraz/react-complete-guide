import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
// import axios from "axios";
  
import Posts from './Posts/Posts'
import NewPost from './NewPost/NewPost'

import  './Blog.module.css'

class Blog extends Component {
  
    

    render () {
  

        return (
            <div>
                <header className="Blog">
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to={
                                {
                                    pathname: '/new-post',
                                    hash: '#submit',
                                    search: '?quick-submit'
                                }
                            }>New Posts</Link></li>
                        </ul>
                    </nav>
                </header>
                {/*
                <Route path="/" exact render={ () => {
                    return(
                    <Posts/>
                        )
                }}/>
                <Route path="/new-post/"  exact render={ () => {
                    return(
                        <div></div>
                        )
                    }}/>
                */}
                

                <Route path="/" exact component={Posts}/>
                <Route path="/new-post/"  exact component={NewPost}/>
       
            </div>
        );
    }
}

export default Blog;
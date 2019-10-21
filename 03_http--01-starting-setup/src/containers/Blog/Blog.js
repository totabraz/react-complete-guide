import React, { Component } from 'react';
import { Route, NavLink, Switch } from "react-router-dom";
// import axios from "axios";
  
import Posts from './Posts/Posts'
import NewPost from './NewPost/NewPost'

import  './Blog.module.css'
import FullPost from './FullPost/FullPost';

class Blog extends Component {
  
    constructor(props){
        super(props);
        this.state ={ }
    }

    render () {
  

        return (
            <div>
                <header className="Blog">
                    <nav>
                        <ul>
                            <li><NavLink
                            to="/posts/"
                            exact
                            activeClassName="my-active"
                            activeStyle={{
                                listStyle:"underline"
                            }}>Home</NavLink></li>
                            <li><NavLink 
                                activeClassName="my-active"
                                to={{
                                    pathname:'/new-post',
                                    hash: '#submit',
                                    search: '?quick-submit'
                                }}>New Posts</NavLink></li>
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
                {/* <Route path="/" exact component={Posts}/> */}
                
                {/* Switch helps to render correctly, if it was : '/:id', without post, it will render both */}
                <Switch>
                    <Route path="/new-post/"  exact component={NewPost}/>
                    <Route path="/posts/"  component={Posts}/>
                </Switch>

            </div>
        );
    }
}

export default Blog;
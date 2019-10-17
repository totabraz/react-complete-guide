import React, { Component } from 'react';
import axios from "axios";

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            selectPostID: null,
        }
    }
    
    componentDidMount () {
        // axios.get('https://jsonplaceholder.typicode.com/posts')
        // axios uses promisses 
        // so, asynchronous functions 
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then( response => {

                // Slice the array to 4 posts
                const posts = response.data.slice(0, 4);

                // My post doesnt have a author
                // But, we are working with  JS in the end
                // So, we can add any JS code we want..
                // As we are working with JS Object, we can manipulate it. 
                // for each post, we could add a author, eg.
                // See bellow. 
                const updatePosts =  posts.map( post => {
                    return {
                        ...post,
                        author: "Tota"
                    }
                });

                this.setState({posts: updatePosts})
            })
    }

    postClickedHandler = (postID) => {
        this.setState({selectPostID: postID})
    }

    render () {
        const posts = this.state.posts.map( post => {
            return <Post
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.postClickedHandler(post.id)}/>;
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectPostID}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
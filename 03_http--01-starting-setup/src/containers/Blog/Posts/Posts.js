import React, { Component } from 'react';
import axios from "../../../axios";
import Post from '../../../components/Post/Post'
import "./Posts.module.css";
// import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Fullpost from '../FullPost/FullPost'

class Posts extends Component {

    constructor(props){
        super(props);
        this.state = {
            posts: [],
            selectPostID: null,
            errorRequest: null
        }
    }

    componentDidMount () {
        // axios.get('https://jsonplaceholder.typicode.com/posts')
        // axios uses promisses 
        // so, asynchronous functions 
        axios.get('/posts')
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
            .catch(error => {
                // this.setState({errorRequest : true})
            })
    }

    postClickedHandler = (postID) => {
        // this.setState({selectPostID: postID})
        
        // Another option:
        // this.props.history.push("/posts/" + postID)
        this.props.history.push({pathname: "/posts/" + postID})
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        if (!this.state.errorRequest) {
            posts = this.state.posts.map( post => {
            // return <Link
            // to={"/fullpost/" + post.id}
            // key={post.id}>
            return  <Post      
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.postClickedHandler(post.id)}/>
                 // </Link>
            });
            
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url+ "/:id" } exact component={Fullpost}/>
            </div>
        )
    }
}

export default Posts;
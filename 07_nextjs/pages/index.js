import React, { Component } from 'react'
import Link from "next/link";
import Router from 'next/router';

class indexPage extends Component {

    static async getInitialProps(context) {
        console.log("context: ", context)
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({appName: "Super App"})
            }, 1000)
        })
        return promise
    }
    authIndexPage
    render() {
        return (
            <div>
    <h1>The Main Page of {this.props.appName}</h1>
                <p>Go to{" "}<Link href="/auth"><a>Auth</a></Link></p>
                <button onClick={() => { Router.push("/auth") }}>Go to Auth</button>
            </div>
        )
    }
}

export default indexPage
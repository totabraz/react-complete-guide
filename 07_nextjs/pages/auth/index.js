import React from 'react'
import Link from 'next/link'
import User from '../../components/User'

const authIndexPage = (props) => {
    return (
        <div>
            <h1>The Auth Page {props.appName}</h1>
            <p>Go to <Link href="/"><a>Home</a></Link></p>
            <div>
                <User name="Tota" age={28} />
            </div>
        </div>

    )
}

authIndexPage.getInitialProps = context => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ appName: "Super App (Auth)" })
        }, 1000)
    })
    return promise
}

export default authIndexPage


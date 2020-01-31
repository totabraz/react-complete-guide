import React from 'react'
import Link from 'next/link'

const errorPage = (props) => {
    return (
        <div>
            <h1>Ihhh, deu ruim</h1>
            <p>Go to <Link href="/"><a>Home</a></Link></p>
        </div>

    )
}

export default errorPage


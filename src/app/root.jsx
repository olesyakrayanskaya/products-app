import React from 'react'

import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

function root() {
    return (
        <div id="main">
            <div id="menu">
                <nav>
                    <Link to={'/products'}>Products</Link>
                    <a>Sellers</a>
                </nav>
            </div>
            <div id="main_page">
                <h2>Products App</h2>
                <hr></hr>
                <Outlet />
            </div>
        </div>
    )
}

export default root
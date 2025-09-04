import React from 'react'

import { Outlet, NavLink } from 'react-router-dom'

function root() {
    return (
        <div id="main">
            <div id="menu">
                <nav>
                    <NavLink to="/products" end>
                        Products
                    </NavLink>
                    <NavLink to="/sellers" end>
                        Sellers
                    </NavLink>
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
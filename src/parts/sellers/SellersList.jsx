import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllSellers } from './sellersSlice'

function SellersList() {
    const sellers = useSelector(selectAllSellers)
    const sellersToRender = sellers.map((seller) => (
        <li key={seller.id}>
            <Link to={`/sellers/${seller.id}`}>{seller.name}</Link>
        </li>
    ))
    return (
        <div>
            <h2>Sellers:</h2>
            <ul>{sellersToRender}</ul>
        </div>
    )
}

export default SellersList
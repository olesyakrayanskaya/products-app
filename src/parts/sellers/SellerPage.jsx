import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectSellerById } from './sellersSlice'
import { selectAllProducts } from '../products/productsSlice'
import { Link } from 'react-router-dom'
import { selectProductsBySeller } from '../products/productsSlice'

function SellerPage() {
    let params = useParams()
    const { sellerId } = params

    const seller = useSelector((state) => selectSellerById(state, sellerId))

    const productsOfSeller = useSelector((state) =>
        selectProductsBySeller(state, sellerId)
    )

    const productNames = productsOfSeller.map((product) => (
        <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
        </li>
    ))

    return (
        <div>
            <h2>Seller: {seller.name}</h2>
            <ul>{productNames}</ul>
        </div>
    )
}

export default SellerPage
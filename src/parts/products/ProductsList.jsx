import React from 'react'
import { useSelector } from 'react-redux'
import NewProductForm from './NewProductForm'
import { Link } from 'react-router-dom'
import SellerOfProd from './SellerOfProd'
import UserReactions from './UserReactions'

function ProductsList() {
    const products = useSelector((state) => state.products)
    const dispProducts = products.map((product) => (
        <div key={product.id} className="product-excerpt">
            <h3>{product.name}</h3>
            <SellerOfProd sellerId={product.seller} />
            <p>{product.desc.substring(0, 100)}</p>
            <UserReactions product={product} />
            <Link to={`/products/${product.id}`} className="link-btn">
                view
            </Link>
        </div>
    ))
    return (
        <div>
            <NewProductForm />
            <h2>Products</h2>
            {dispProducts}
        </div>
    )
}

export default ProductsList
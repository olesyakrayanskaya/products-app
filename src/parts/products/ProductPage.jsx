import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SellerOfProd from './SellerOfProd'
import UserReactions from './UserReactions'

function ProductPage() {

    let params = useParams()
    const { productId } = params

    const product = useSelector((state) =>
        state.products.find((product) => product.id === productId)
    )

    if (!product) {
        return <p>No such product</p>
    }

    return (
        <div>
            <h2>{product.name}</h2>
            <SellerOfProd sellerId={product.seller} />
            <p>Description: {product.desc}</p>
            <p>Price: {product.price}</p>
            <p>Amount:{product.amount}</p>
            <UserReactions product={product} />
            <Link to={`/editProduct/${product.id}`} className="link-btn">
                edit
            </Link>
        </div>
    )
}

export default ProductPage
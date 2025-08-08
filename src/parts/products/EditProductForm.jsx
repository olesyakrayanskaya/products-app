import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { productUpdated } from './productsSlice'

function EditProductForm() {

    let params = useParams()
    const { productId } = params

    const product = useSelector((state) =>
        state.products.find((product) => product.id === productId)
    )

    const [name, setName] = useState(product.name)
    const [desc, setDesc] = useState(product.desc)
    const [price, setPrice] = useState(product.price)
    const [amount, setAmount] = useState(product.amount)

    const onNameChanged = (e) => setName(e.target.value)
    const onDescChanged = (e) => setDesc(e.target.value)
    const onPriceChanged = (e) => setPrice(e.target.value)
    const onAmountChanged = (e) => setAmount(e.target.value)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const onSaveProductClick = () => {
        if (name && desc && price && amount) {
            dispatch(
                productUpdated({
                    id: productId,
                    name,
                    desc,
                    price,
                    amount
                })
            )
            navigate(`/products/${productId}`)
        }
    }

    return (
        <div>
            <div>
                <h2>Edit Product</h2>
                <form>
                    <fieldset>
                        <label htmlFor="productName">Name:</label>
                        <input
                            id="productName"
                            name="productName"
                            type="text"
                            value={name}
                            onChange={onNameChanged}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="productDesc">Description:</label>
                        <textarea
                            id="productDesc"
                            name="productDesc"
                            value={desc}
                            onChange={onDescChanged}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="productPrice">Price:</label>
                        <input
                            id="productPrice"
                            name="productPrice"
                            type="text"
                            value={price}
                            onChange={onPriceChanged}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="productAmount">Amount:</label>
                        <input
                            id="productAmount"
                            name="productAmount"
                            type="number"
                            value={amount}
                            onChange={onAmountChanged}
                        />
                    </fieldset>
                    <button type="button" onClick={onSaveProductClick}>save</button>
                </form>
            </div>
        </div>
    )
}

export default EditProductForm
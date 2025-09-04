import React from 'react'
import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { addProduct } from './productsSlice'
import { useSelector } from 'react-redux'

function NewProductForm() {

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(0)
    const [amount, setAmount] = useState(0)
    const [sellerId, setSellerId] = useState('')

    const [requestStatus, setRequestStatus] = useState('idle')

    const onNameChanged = (e) => setName(e.target.value)
    const onDescChanged = (e) => setDesc(e.target.value)
    const onPriceChanged = (e) => setPrice(e.target.value)
    const onAmountChanged = (e) => setAmount(e.target.value)
    const onSellerChanged = (e) => setSellerId(e.target.value)

    const dispatch = useDispatch()

    const sellers = useSelector((state) => state.sellers)

    const canBeSaved =
        [name, desc, price, amount, sellerId].every(Boolean) &&
        requestStatus === 'idle'

    const onSaveProductClick = async () => {
        if (canBeSaved) {
            try {
                setRequestStatus('in progress')
                await dispatch(
                    addProduct({ name, desc, price, amount, seller: sellerId })).unwrap()
                setName('')
                setDesc('')
                setPrice(0)
                setAmount(0)
                setSellerId('')
            } catch (err) {
                console.error('save product error: ', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const sellersList = sellers.map((seller) => (
        <option key={seller.id} value={seller.id}>
            {seller.name}
        </option>
    ))

    return (
        <div>
            <h2>Add a New Product</h2>
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
                    <label htmlFor="prodSeller">Seller:</label>
                    <select id="prodSeller" value={sellerId} onChange={onSellerChanged}>
                        <option value=""></option>
                        {sellersList}
                    </select>
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
    )
}

export default NewProductForm
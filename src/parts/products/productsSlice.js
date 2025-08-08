import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
    {
        id: '1',
        title: 'Product1',
        desc: 'This is an amazing product',
        price: '300',
        amount: '30',
    },
    {
        id: '2',
        title: 'Product2',
        desc: 'This is a nice product',
        price: '700',
        amount: '12',
    },
]

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(name, desc, price, amount) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        desc,
                        price,
                        amount,
                    },
                }
            },
        },
        productUpdated(state, action) {
            const { id, name, desc, price, amount } = action.payload
            const desiredProduct = state.find(product => product.id === id)
            if (desiredProduct) {
                desiredProduct.name = name
                desiredProduct.desc = desc
                desiredProduct.price = price
                desiredProduct.amount = amount
            }
        },
    }
})

export const { productAdded, productUpdated } = productsSlice.actions
export default productsSlice.reducer
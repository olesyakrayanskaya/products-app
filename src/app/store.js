import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../parts/products/productsSlice'

export default configureStore({
	reducer: {
        products: productsReducer,
    }
})
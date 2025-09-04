import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../parts/products/productsSlice'
import sellersReducer from '../parts/sellers/sellersSlice'

export default configureStore({
    reducer: {
        products: productsReducer,
        sellers: sellersReducer,
    }
})


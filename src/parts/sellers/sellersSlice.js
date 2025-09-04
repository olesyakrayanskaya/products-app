import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = []

export const fetchSellers = createAsyncThunk(
	'sellers/fetchSellers',
	async () => {
		const response = await client.get('/fakeServer/sellers')
		return response.data
	}
)

const sellersSlice = createSlice({
	name: 'sellers',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchSellers.fulfilled, (state, action) => {
			return action.payload
		})
	},
})

export const selectAllSellers = (state) => state.sellers

export const selectSellerById = (state, sellerId) =>
	state.sellers.find((seller) => seller.id === sellerId)

export default sellersSlice.reducer
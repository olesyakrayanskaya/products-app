import { createSlice } from '@reduxjs/toolkit'

const initialState = [
	{ id: '0', name: 'Super Power' },
	{ id: '1', name: 'Miracle Life' },
	{ id: '2', name: 'Dolls&Toys' },
	{ id: '3', name: 'Granny' },
]

const sellersSlice = createSlice({
	name: 'sellers',
	initialState,
	reducers: {},
})

export default sellersSlice.reducer
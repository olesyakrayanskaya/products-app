import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'

import store from './app/store'
import { Provider } from 'react-redux'

import { worker } from './api/server'

import { fetchSellers } from './parts/sellers/sellersSlice'

async function main() {
	await worker.start({ onUnhandledRequest: 'bypass' })
	store.dispatch(fetchSellers())

	ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</React.StrictMode>
	)
}

main()
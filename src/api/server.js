import { setupWorker } from 'msw/browser'
import { factory, oneOf, manyOf, primaryKey } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'
import { faker } from '@faker-js/faker'
import { http, HttpResponse, delay } from 'msw'

const NUM_SELLERS = 4
const PRODS_PER_SELLER = 3
const ARTIFICIAL_DELAY_MS = 2000

const selNames = ['Super Power', 'Miracle Life', 'Dolls&Toys', 'Granny']

export const db = factory({
	product: {
		id: primaryKey(nanoid),
		name: String,
		desc: String,
		price: Number,
		amount: Number,
		reactions: oneOf('reaction'),
		seller: oneOf('seller'),
	},
	seller: {
		id: primaryKey(nanoid),
		name: String,
		products: manyOf('product'),
	},
	reaction: {
		id: primaryKey(nanoid),
		good: Number,
		soso: Number,
		bad: Number,
		product: oneOf('product'),
	},
})

const createSellerData = (num) => {
	const name = selNames[num]

	return {
		name: `${name}`,
	}
}

function getRandInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const createProductData = (seller) => {
	return {
		name: `Product${getRandInt(0, 100)}`,
		desc: faker.lorem.sentences({ min: 3, max: 5 }),
		price: getRandInt(100, 2000),
		amount: getRandInt(1, 50),
		reactions: db.reaction.create(),
		seller,
	}
}

for (let i = 0; i < NUM_SELLERS; i++) {
	const newSeller = db.seller.create(createSellerData(i))

	for (let j = 0; j < PRODS_PER_SELLER; j++) {
		const newProduct = createProductData(newSeller)
		db.product.create(newProduct)
	}
}

const serializeProduct = (product) => ({
	...product,
	seller: product.seller.id,
})

export const handlers = [
	http.get('/fakeServer/products', async () => {
		const products = db.product.getAll().map(serializeProduct)
		await delay(ARTIFICIAL_DELAY_MS)
		return HttpResponse.json(products)
	}),
	http.get('/fakeServer/sellers', async () => {
		await delay(ARTIFICIAL_DELAY_MS)
		return HttpResponse.json(db.seller.getAll())
	}),
	http.post('/fakeServer/products', async ({ request }) => {
		const data = await request.json()

		if (data.content === 'error') {
			await delay(ARTIFICIAL_DELAY_MS)

			return new HttpResponse('server save error', {
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			})
		} else {
			const seller = db.seller.findFirst({
				where: { id: { equals: data.seller } },
			})
			data.seller = seller
			data.reactions = db.reaction.create()
			const product = db.product.create(data)
			await delay(ARTIFICIAL_DELAY_MS)
			return HttpResponse.json(serializeProduct(product))
		}
	})
]

export const worker = setupWorker(...handlers)
worker.listHandlers().forEach((handler) => {
	console.log(handler.info.header)
})
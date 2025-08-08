import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './app/root'
import ProductsList from './parts/products/ProductsList'

const router = createBrowserRouter([
  {
    path: '/', element: <Root />,
    children: [{
      path: '/products',
      element: <ProductsList />,
    },]
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
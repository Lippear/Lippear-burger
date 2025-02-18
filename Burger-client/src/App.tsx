import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { FetchMenu } from './store/thunks/fetchMenu'
import { setAddedItemsFromSession } from './store/slices/cartSlice'
import { CartItem } from './interfaces/CartInterface'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './store/store'
import Main from './pages/main/Main'
import Cart from './pages/cart/Cart'
import CheckOut from './pages/cart/Checkout'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  const getSessionAddedCartItems = () => {
    const cartData = sessionStorage.getItem('cart')
    if (cartData) {
      const addedItems: CartItem[] = JSON.parse(cartData)
      dispatch(setAddedItemsFromSession(addedItems))
    }
  }

  useEffect(() => {
    dispatch(FetchMenu())
    getSessionAddedCartItems()
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App

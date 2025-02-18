import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MenuItem } from '../../interfaces/MenuInterface'
import { CartItem, CartState } from '../../interfaces/CartInterface'

const initialState: CartState = {
  addedItems: [],
}

const updateSessionStorage = (addedItems: CartItem[]) => {
  sessionStorage.removeItem('cart')
  sessionStorage.setItem('cart', JSON.stringify(addedItems))
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<MenuItem>) => {
      const existingItem = state.addedItems.find(cartItem => cartItem.item.name === action.payload.name)
      !existingItem && state.addedItems.push({ item: action.payload, count: 1 })
      updateSessionStorage(state.addedItems)
    },
    removeItemFromCart: (state, action: PayloadAction<MenuItem>) => {
      state.addedItems = state.addedItems.filter(addedItem => addedItem.item.name !== action.payload.name)
      updateSessionStorage(state.addedItems)
    },
    setItemCountInCart: (state, action: PayloadAction<{ item: MenuItem; count: number }>) => {
      const existingItem = state.addedItems.find(cartItem => cartItem.item.name === action.payload.item.name)
      if (existingItem) {
        existingItem.count = action.payload.count
      }
      updateSessionStorage(state.addedItems)
    },
    clearCart: state => {
      sessionStorage.removeItem('cart')
      state.addedItems = []
    },
    setAddedItemsFromSession: (state, action: PayloadAction<CartItem[]>) => {
      state.addedItems = action.payload
    },
  },
})

export const { addItemToCart, removeItemFromCart, setItemCountInCart, setAddedItemsFromSession, clearCart } =
  cartSlice.actions
export default cartSlice.reducer

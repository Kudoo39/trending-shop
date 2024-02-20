import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartType, ProductType, UpdateQuantity } from '../../misc/type'

type InitialState = {
  cart: CartType[]
  loading: boolean
  error?: string
}

const initialState: InitialState = {
  cart: [],
  loading: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        const tempProduct = { ...action.payload, quantity: 1 }
        state.cart.push(tempProduct)
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(item => item.id !== action.payload)
    },

    updateQuantity(state, action: PayloadAction<UpdateQuantity>) {
      const { id, quantity } = action.payload
      const updateItem = state.cart.find(item => item.id === id)
      if (updateItem) {
        updateItem.quantity += quantity
      }
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions

export default cartSlice.reducer

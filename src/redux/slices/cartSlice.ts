import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartType } from '../../misc/type'

type InitialState = {
  carts: CartType[]
  quantity: number
  loading: boolean
  error?: string
}

const initialState: InitialState = {
  carts: [],
  quantity: 0,
  loading: false
}

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartType>) => {
      state.carts.push(action.payload)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.carts = state.carts.filter(item => item.product.id !== action.payload)
    }
  }
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer

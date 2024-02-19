import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartType } from '../../misc/type'

type InitialState = {
  carts: CartType[]
  loading: boolean
  error?: string
}

const initialState: InitialState = {
  carts: [],
  loading: false
}

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartType>) => {
      state.carts.push(action.payload)
    }
  }
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer

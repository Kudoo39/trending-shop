import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import categoryReducer from './slices/categorySlice'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'

// store all states
const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
    carts: cartReducer
  }
})
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export default store

import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import categoryReducer from './slices/categorySlice'
import productReducer from './slices/productSlice'

// store all states
const store = configureStore({
  reducer: { category: categoryReducer, products: productReducer }
})
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export default store

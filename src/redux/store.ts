import { configureStore } from '@reduxjs/toolkit'

import categoryReducer from './slices/categorySlice'

// store all states
const store = configureStore({
  reducer: { category: categoryReducer }
})
export type AppState = ReturnType<typeof store.getState>

export default store

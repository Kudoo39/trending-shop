import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category } from '../../misc/type'

type InitialState = {
  selectedCategory: Category
}

const initialState: InitialState = {
  selectedCategory: 'All'
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<Category>) {
      state.selectedCategory = action.payload
    }
  }
})

export const { setSelectedCategory } = categorySlice.actions

export default categorySlice.reducer

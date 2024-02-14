import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Category } from '../../misc/type'

const url = 'https://fakestoreapi.com/products/categories'

export const fetchCategoryAsync = createAsyncThunk('fetchCategoryAsync', async () => {
  try {
    const response = await axios.get<Category[]>(url)
    return response.data
  } catch (e) {
    const error = e as Error
    return error
  }
})

interface CategoryState {
  categories: Category[] | Error
  loading: boolean
  error: string | null
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategoryAsync.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchCategoryAsync.fulfilled, (state, action) => {
      state.loading = false
      state.categories = action.payload
    })
    builder.addCase(fetchCategoryAsync.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? 'An error occurred'
    })
  }
})

export default categorySlice.reducer

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category } from '../../misc/type'
import axios, { AxiosError } from 'axios'

const url = 'https://api.escuelajs.co/api/v1/categories'

type InitialState = {
  categories: Category[]
  selectedCategory: number
  loading: boolean
  error: string | null
}

const initialState: InitialState = {
  categories: [],
  selectedCategory: 0,
  loading: false,
  error: null
}

export const fetchCategoriesAsync = createAsyncThunk('fetchCategoriesAsync', async () => {
  try {
    const response = await axios.get<Category[]>(url)
    return response.data
  } catch (e) {
    const error = e as AxiosError
    return error
  }
})

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<number>) {
      state.selectedCategory = action.payload
    }
  },
  extraReducers(builder) {
    // fetchCategoriesAsync
    builder.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        state.categories = [{ id: 0, name: 'All', image: 'https://i.imgur.com/cLBhSOG.png' }, ...action.payload]
      }
      state.loading = false,
      state.error = null
    })
    builder.addCase(fetchCategoriesAsync.pending, state => {
      return {
        ...state,
        loading: true,
        error: null
      }
    })
    builder.addCase(fetchCategoriesAsync.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? 'error'
      }
    })
  }
})

export const { setSelectedCategory } = categorySlice.actions

export default categorySlice.reducer

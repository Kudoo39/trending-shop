import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Product } from '../../misc/type'

const url = 'https://fakestoreapi.com/products'

type InitialState = {
  products: Product[]
  loading: boolean
  error?: string
}

const initialState: InitialState = {
  products: [],
  loading: false
}

export const fetchProductsAsync = createAsyncThunk('fetchProductsAsync', async () => {
  try {
    const response = await axios.get<Product[]>(url)
    return response.data
  } catch (e) {
    const error = e as Error
    return error
  }
})

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload,
          loading: false
        }
      }
    })
    builder.addCase(fetchProductsAsync.pending, (state) => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export default productSlice.reducer

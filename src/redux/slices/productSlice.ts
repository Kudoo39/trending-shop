import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { ProductType } from '../../misc/type'

const url = 'https://fakestoreapi.com/products'

type InitialState = {
  products: ProductType[]
  product: ProductType | null
  loading: boolean
  error?: string
}

const initialState: InitialState = {
  products: [],
  product: null,
  loading: false
}

export const fetchProductsAsync = createAsyncThunk('fetchProductsAsync', async () => {
  try {
    const response = await axios.get<ProductType[]>(url)
    return response.data
  } catch (e) {
    const error = e as AxiosError
    return error
  }
})

export const fetchSingleProductAsync = createAsyncThunk('fetchSingleProductAsync', async (id: number) => {
  try {
    const response = await axios.get<ProductType>(`${url}/${id}`)
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
    // fetchProductsAsync
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload,
          loading: false
        }
      }
    })
    builder.addCase(fetchProductsAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message
        }
      }
    })
    // fetchSingleProductAsync
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          product: action.payload,
          loading: false
        }
      }
    })
    builder.addCase(fetchSingleProductAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(fetchSingleProductAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message
        }
      }
    })
  }
})

export default productSlice.reducer

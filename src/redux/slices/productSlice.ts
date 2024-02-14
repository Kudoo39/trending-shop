import { createSlice } from '@reduxjs/toolkit'

const url = 'https://api.escuelajs.co/api/v1/products'

const productSlice = createSlice({
  name: 'products',
  initialState: {},
  reducers: {}
})

// export const {} = productSlice.actions

export default productSlice.reducer

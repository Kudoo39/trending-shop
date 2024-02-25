import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { User } from '../../misc/type'

const url = 'https://fakestoreapi.com/auth/login'

let userState: User | null = null
const data = localStorage.getItem('userInformation')

if (data) {
  userState = JSON.parse(data)
}

type InitialState = {
  user: User | null
  loading: boolean
  error?: string
}

const initialState: InitialState = {
  user: userState,
  loading: false
}

export const loginUserAsync = createAsyncThunk('loginUserAsync', async (userCredential: User) => {
  try {
    const request = await axios.post(url, userCredential)
    const response = await request.data.data
    localStorage.setItem('user', JSON.stringify(response))
    return response
  } catch (e) {
    const error = e as Error
    return error
  }
})

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    saveUserInformation: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        loading: false
      }
    })
    builder.addCase(loginUserAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(loginUserAsync.rejected, (state, action) => {
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

export const { saveUserInformation } = userSlice.actions
export default userSlice.reducer

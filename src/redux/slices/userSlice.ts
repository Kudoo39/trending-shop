import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { User, UserCredential, UserRegister } from '../../misc/type'

const userUrl = 'https://api.escuelajs.co/api/v1/users'
const loginUrl = 'https://api.escuelajs.co/api/v1/auth/login'
const profileUrl = 'https://api.escuelajs.co/api/v1/auth/profile'

const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

type InitialState = {
  user?: User | null
  users: User[]
  loading: boolean
  error: string | null
  isAuthenticated: boolean
}

const initialState: InitialState = {
  users: [],
  loading: false,
  error: null,
  isAuthenticated: isAuthenticated
}

export const registerUserAsync = createAsyncThunk('registerUserAsync', async (userData: UserRegister) => {
  try {
    const response = await axios.post(userUrl, userData)
    toast.success('Account created successfully!', { position: 'bottom-left' })
    return response.data
  } catch (e) {
    const error = e as AxiosError
    toast.error('Registration failed. Please try again.', { position: 'bottom-left' })
    return error
  }
})

export const authenticateUserAsync = createAsyncThunk('authenticateUserAsync', async (access_token: string) => {
  try {
    const authentication = await axios.get(profileUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    return authentication.data
  } catch (e) {
    const error = e as AxiosError
    return error
  }
})

export const loginUserAsync = createAsyncThunk(
  'loginUserAsync',
  async (userCredential: UserCredential, { dispatch }) => {
    try {
      const response = await axios.post<{ access_token: string }>(loginUrl, userCredential)
      toast.success('Login successfully!', { position: 'bottom-left' })
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('access_token', response.data.access_token)

      const authentication = await dispatch(authenticateUserAsync(response.data.access_token))
      return authentication.payload as User
    } catch (e) {
      const error = e as Error
      toast.error('Login failed. Please try again!', { position: 'bottom-left' })
      return error
    }
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem('access_token')
      localStorage.removeItem('isAuthenticated')
      toast.success('Logout successfully!', { position: 'bottom-left' })
    }
  },
  extraReducers(builder) {
    builder.addCase(authenticateUserAsync.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      }
    })
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload as User,
        loading: false
      }
    })
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        loading: false
      }
    })
    builder.addCase(registerUserAsync.pending, state => {
      return {
        ...state,
        loading: true
      }
    })
    builder.addCase(registerUserAsync.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error.message ?? 'error'
      }
    })
  }
})

export const { logout } = userSlice.actions
export default userSlice.reducer

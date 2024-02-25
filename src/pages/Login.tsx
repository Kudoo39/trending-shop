import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link as RouterLink } from 'react-router-dom'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import FormControl from '@mui/material/FormControl'
import { loginUserAsync } from '../redux/slices/userSlice'
import { AppState, useAppDispatch } from '../redux/store'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loading = useSelector((state: AppState) => state.users.loading)
  const error = useSelector((state: AppState) => state.users.error)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // const handleLoginEvent = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   let userCredential = {
  //     email,
  //     password
  //   }
  //   dispatch(loginUserAsync(userCredential)).then(result => {
  //     if (result.payload) {
  //       setEmail('')
  //       setPassword('')
  //       navigate('/')
  //     }
  //   })
  // }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: '600' }}>
        Log In
      </Typography>
      <FormControl
        component="form"
        // onSubmit={handleLoginEvent}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <TextField
          variant="outlined"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          sx={{ marginBottom: 2, width: '300px' }}
        />

        <TextField
          variant="outlined"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{ marginBottom: 2, width: '300px' }}
        />

        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: 1 }} disabled={loading}>
          {loading ? 'Loading...' : 'Log In'}
        </Button>
        {error && <Typography sx={{ color: 'red', marginTop: 1 }}>{error}</Typography>}
      </FormControl>
      <Link component={RouterLink} to="/register" sx={{ marginTop: 1 }}>
        Create a new account!
      </Link>
    </Box>
  )
}

export default Login

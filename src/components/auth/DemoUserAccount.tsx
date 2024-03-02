import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import { UserCredential } from '../../misc/type'
import { loginUserAsync } from '../../redux/slices/userSlice'
import { AppState, useAppDispatch } from '../../redux/store'

const DemoUserAccount = () => {
  const loading = useSelector((state: AppState) => state.users.loading)
  const error = useSelector((state: AppState) => state.users.error)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: 'john@mail.com',
      password: 'changeme'
    },

    onSubmit: (userCredential: UserCredential) => {
      dispatch(loginUserAsync(userCredential))
      navigate('/profile')
    }
  })

  return (
    <Box>
      <FormControl
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
          sx={{ marginTop: 1, width: '360px' }}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Log In With A Demo Account As A User'}
        </Button>
        {error && <Typography sx={{ color: 'red', marginTop: 1 }}>{error}</Typography>}
      </FormControl>
    </Box>
  )
}

export default DemoUserAccount

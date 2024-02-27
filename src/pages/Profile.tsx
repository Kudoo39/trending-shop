import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '../redux/store'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import { logout } from '../redux/slices/userSlice'

const Profile = () => {
  const user = useSelector((state: AppState) => state.users.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: '12px auto 0',
        padding: 3,
        boxShadow: 1,
        borderRadius: 4
      }}
    >
      {user && (
        <>
          <Box sx={{ margin: '8px 0 8px 0' }}>
            <img src={user.avatar} alt="Avatar" style={{ width: 120, height: 120, borderRadius: '50%' }} />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h5" component="h1" sx={{ marginBottom: 1 }}>
              {user.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              {user.email}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="body1">Role: {user.role}</Typography>
              <Typography variant="body1">ID: {user.id}</Typography>
            </Box>
            <Button variant="contained" onClick={handleLogout}>
              Log Out
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}

export default Profile

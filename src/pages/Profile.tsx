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
        margin: '8px auto 0',
        padding: 3,
        boxShadow: 1,
        borderRadius: 4,
        backgroundColor: 'background.paper'
      }}
    >
      {user && (
        <>
          <Box sx={{ margin: '8px 0 8px 0' }}>
            <img src={user.avatar} alt="Avatar" style={{ width: 100, height: 100, borderRadius: '50%' }} />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h5" component="h1" sx={{ marginBottom: 1 }}>
              {user.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              {user.email}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1">Role: {user.role}</Typography>
            <Typography variant="body1">ID: {user.id}</Typography>
            <Button onClick={handleLogout}>Log Out</Button>
          </Box>
        </>
      )}
    </Box>
  )
}

export default Profile

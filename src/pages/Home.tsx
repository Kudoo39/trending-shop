import { Link as RouterLink } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Background from '../assets/images/background.jpg'

const Home = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '530px',
        width: '100%',
        display: 'flex',
        marginBottom: '100px'
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '20px' }}>
            Best Place to Buy Products
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: '40px',
              marginBottom: '20px'
            }}
          >
            Trending Shop
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 400, margin: '0px 20px 30px 20px' }}>
            Hello World, cause you are my world :3
          </Typography>
          <Link component={RouterLink} to="/products" sx={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ fontWeight: 400, padding: '20px' }}>
              <span>Explore Our Products</span>
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Home

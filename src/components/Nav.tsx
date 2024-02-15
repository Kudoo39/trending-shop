import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import SvgIcon from '@mui/material/SvgIcon'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { ReactComponent as ShopIcon } from '../assets/icons/shop.svg'

const MyComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        backgroundColor: '#f0f0f0',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}
      >
        <SvgIcon component={ShopIcon} inheritViewBox sx={{ cursor: 'pointer' }} />
        <Box sx={{ cursor: 'pointer', fontWeight: '600' }}>All</Box>
        <Box sx={{ cursor: 'pointer', fontWeight: '500' }}>Electronics</Box>
        <Box sx={{ cursor: 'pointer', fontWeight: '500' }}>Jewelery</Box>
        <Box sx={{ cursor: 'pointer', fontWeight: '500' }}>Men&apos;s clothing</Box>
        <Box sx={{ cursor: 'pointer', fontWeight: '500' }}>Women&apos;s clothing</Box>
      </Box>

      <Box sx={{ display: 'flex' }}>
        <Tooltip title="Carts">
          <ShoppingCartIcon sx={{ fontSize: '30px', cursor: 'pointer' }} />
        </Tooltip>
        <Tooltip title="Profiles">
          <PersonOutlineIcon sx={{ fontSize: '30px', cursor: 'pointer', margin: '0 10px' }} />
        </Tooltip>
      </Box>
    </Box>
  )
}

export default MyComponent

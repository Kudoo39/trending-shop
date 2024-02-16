import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import SvgIcon from '@mui/material/SvgIcon'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import { ReactComponent as ShopIcon } from '../assets/icons/shop.svg'

const Nav = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

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
          gap: '25px',
          flexWrap: 'wrap'
        }}
      >
        <SvgIcon component={ShopIcon} inheritViewBox sx={{ cursor: 'pointer', fontSize: '32px', margin: '0 10px' }} />
        <Link component={RouterLink} to="/" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              'cursor': 'pointer',
              'fontWeight': '600',
              'color': 'black',
              '&:hover': { color: 'navy', fontWeight: 650 }
            }}
          >
            Home
          </Box>
        </Link>
        <Link component={RouterLink} to="/products" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              'cursor': 'pointer',
              'fontWeight': '600',
              'color': 'black',
              '&:hover': { color: 'navy', fontWeight: 650 }
            }}
          >
            Products
          </Box>
        </Link>
        {/* <Box sx={{ cursor: 'pointer', fontWeight: '500' }}>Jewelery</Box>
        <Box sx={{ cursor: 'pointer', fontWeight: '500' }}>Men&apos;s clothing</Box>
        <Box sx={{ cursor: 'pointer', fontWeight: '500' }}>Women&apos;s clothing</Box> */}
      </Box>

      <Box sx={{ display: 'flex' }}>
        <Tooltip title="Carts">
          <ShoppingCartIcon sx={{ fontSize: '30px', cursor: 'pointer' }} />
        </Tooltip>
        <Tooltip title="Profiles">
          <Button onClick={handleClick} sx={{ minWidth: 'unset', padding: 0, color: 'inherit' }}>
            <PersonOutlineIcon sx={{ fontSize: '30px', margin: '0 17px' }} />
          </Button>
        </Tooltip>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <Typography sx={{ p: '6px' }}>Register</Typography>
          <Typography sx={{ p: '6px' }}>Log In</Typography>
        </Popover>
      </Box>
    </Box>
  )
}

export default Nav

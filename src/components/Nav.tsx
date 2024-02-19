import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Badge from '@mui/material/Badge'
import { AppState } from '../redux/store'
import { ReactComponent as ShopIcon } from '../assets/icons/shop.svg'

const Nav = () => {
  const cartItems = useSelector((state: AppState) => state.carts.carts)
  const numberOfItems = cartItems.length

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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
        <SvgIcon
          component={ShopIcon}
          inheritViewBox
          sx={{ cursor: 'pointer', fontSize: '32px', margin: '0 10px' }}
        />
        <Link component={RouterLink} to="/" sx={{ textDecoration: 'none' }}>
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
        <Link
          component={RouterLink}
          to="/products"
          sx={{ textDecoration: 'none' }}
        >
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
      </Box>

      <Box sx={{ display: 'flex' }}>
        <Tooltip title="Carts">
          <Badge badgeContent={numberOfItems} color="primary">
            <Link
              component={RouterLink}
              to="/cart"
              sx={{
                display: 'flex',
                verticalAlign: 'middle',
                color: 'inherit'
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: '30px', cursor: 'pointer' }} />
            </Link>
          </Badge>
        </Tooltip>
        <Tooltip title="Profiles">
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ minWidth: 'unset', padding: 0, color: 'inherit' }}
          >
            <PersonOutlineIcon sx={{ fontSize: '30px', margin: '0 17px' }} />
          </Button>
        </Tooltip>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ 'aria-labelledby': 'basic-button' }}
        >
          <MenuItem onClick={handleClose}>Register</MenuItem>
          <MenuItem onClick={handleClose}>Log In</MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}

export default Nav

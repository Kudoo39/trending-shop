import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice'
import { AppState } from '../redux/store'

const Cart = () => {
  const cartItems = useSelector((state: AppState) => state.cart.cart)
  const loading = useSelector((state: AppState) => state.cart.loading)
  const error = useSelector((state: AppState) => state.cart.error)
  const dispatch = useDispatch()

  const totalPrice = cartItems.reduce((total, currentItem) => total + currentItem.price * currentItem.quantity, 0)

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id))
  }

  const handleIncrease = (id: number) => {
    dispatch(updateQuantity({ id, quantity: 1 }))
  }

  const handleDecrease = (id: number) => {
    dispatch(updateQuantity({ id, quantity: -1 }))
  }

  if (loading) {
    return <Box>Loading...</Box>
  }

  if (error) {
    return <Box>Error: {error}</Box>
  }

  return (
    <Box>
      <Typography variant="h5">Cart Items</Typography>
      {cartItems.map(cart => (
        <Box key={cart.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            {cart.title}
          </Typography>
          <Typography variant="body2" sx={{ marginRight: 2 }}>
            Price: €{cart.price}
          </Typography>
          <Typography variant="body2" sx={{ marginRight: 2 }}>
            <IconButton onClick={() => handleDecrease(cart.id)} disabled={cart.quantity === 1}>
              <RemoveIcon />
            </IconButton>
            Quantity: {cart.quantity}
            <IconButton onClick={() => handleIncrease(cart.id)}>
              <AddIcon />
            </IconButton>
          </Typography>
          <IconButton onClick={() => handleRemove(cart.id)}>
            <DeleteOutlineIcon sx={{ '&:hover': { color: 'red' } }} />
          </IconButton>
        </Box>
      ))}
      <Typography variant="body1">total: €{totalPrice.toFixed(2)}</Typography>
    </Box>
  )
}

export default Cart

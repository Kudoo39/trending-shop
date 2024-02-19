import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import IconButton from '@mui/material/IconButton'
import { AppState } from '../redux/store'
import { removeFromCart } from '../redux/slices/cartSlice'

const Cart = () => {
  const carts = useSelector((state: AppState) => state.carts.carts)
  const loading = useSelector((state: AppState) => state.carts.loading)
  const error = useSelector((state: AppState) => state.carts.error)
  const dispatch = useDispatch()

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id))
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
      {carts.map(cart => (
        <Box key={cart.product.id}>
          <Typography variant="body1">{cart.product.title}</Typography>
          <Typography variant="body2">Price: ${cart.product.price}</Typography>
          <IconButton onClick={() => handleRemove(cart.product.id)}>
            <DeleteOutlineIcon sx={{ '&:hover': { color: 'red' } }} />
          </IconButton>
        </Box>
      ))}
    </Box>
  )
}

export default Cart

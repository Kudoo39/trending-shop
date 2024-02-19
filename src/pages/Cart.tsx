import { useSelector } from 'react-redux'

import { AppState } from '../redux/store'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Cart = () => {
  const carts = useSelector((state: AppState) => state.carts.carts)
  const loading = useSelector((state: AppState) => state.carts.loading)
  const error = useSelector((state: AppState) => state.carts.error)

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
        </Box>
      ))}
    </Box>
  )
}

export default Cart

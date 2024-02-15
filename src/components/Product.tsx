import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from '../redux/store'
import { fetchProductsAsync } from '../redux/slices/productSlice'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Product = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProductsAsync())
  }, [dispatch])

  const products = useSelector((state: AppState) => state.products.products)
  const loading = useSelector((state: AppState) => state.products.loading)
  const error = useSelector((state: AppState) => state.products.error)

  if (loading) {
    return <Box>Loading...</Box>
  }

  if (error) {
    return <Box>Error: {error}</Box>
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
      {products.map((product) => (
        <Box
          key={product.id}
          sx={{
            border: '1px solid black',
            padding: 2,
            marginBottom: 2
          }}
        >
          <Typography variant="h6">{product.title}</Typography>
          <Typography variant="body1">€{product.price}</Typography>
          <Typography variant="body2">{product.description}</Typography>
        </Box>
      ))}
    </Box>
  )
}

export default Product

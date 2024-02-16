import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { fetchSingleProductAsync } from '../redux/slices/productSlice'
import { AppState, useAppDispatch } from '../redux/store'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchSingleProductAsync(Number(id)))
  }, [dispatch, id])

  const product = useSelector((state: AppState) => state.products.product)
  const loading = useSelector((state: AppState) => state.products.loading)
  const error = useSelector((state: AppState) => state.products.error)

  if (loading) {
    return <Box>Loading...</Box>
  }

  if (error) {
    return <Box>Error: {error}</Box>
  }

  return (
    <Box>
      {product ? (
        <Card key={product.id} sx={{ border: '1px solid black', padding: 2 }}>
          <Typography variant="h6">{product.title}</Typography>
          <Typography variant="body1">€{product.price}</Typography>
          <Typography variant="body2">{product.description}</Typography>
          <CardMedia
            component="img"
            alt="Product Images"
            image={product.image}
            sx={{ maxWidth: '100%', height: 'auto', display: 'block' }}
          />
          <CardActions>
            <Button size="small">Add to cart</Button>
          </CardActions>
        </Card>
      ) : (
        <Box>Product not found</Box>
      )}
    </Box>
  )
}

export default ProductDetail

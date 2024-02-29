import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useParams } from 'react-router-dom'

import ReplyIcon from '@mui/icons-material/Reply'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import defaultImage from '../assets/images/default_image.jpg'
import DeleteProduct from '../components/DeleteProduct'
import UpdateProduct from '../components/UpdateProduct'
import { ProductType } from '../misc/type'
import { addToCart } from '../redux/slices/cartSlice'
import { fetchSingleProductAsync } from '../redux/slices/productSlice'
import { AppState, useAppDispatch } from '../redux/store'
import { checkImage } from '../utils/checkImage'
import { cleanImage } from '../utils/cleanImage'

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const cartDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSingleProductAsync(Number(id)))
  }, [dispatch, id])

  const product = useSelector((state: AppState) => state.products.product)
  const loading = useSelector((state: AppState) => state.products.loading)
  const error = useSelector((state: AppState) => state.products.error)

  const handleAddToCart = (product: ProductType) => {
    cartDispatch(addToCart(product))
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={80} />
      </Box>
    )
  }

  if (error) {
    return <Box>Error: {error}</Box>
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {product ? (
        <Card
          key={product.id}
          sx={{
            maxWidth: 500,
            width: '100%',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: 2
          }}
        >
          <CardMedia
            component="img"
            alt="Product Images"
            image={checkImage(cleanImage(product.images[0])) ? cleanImage(product.images[0]) : defaultImage}
            sx={{ maxHeight: 400, objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
          />

          <Box sx={{ padding: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Product ID: {product.id}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Product:{' '}
              <Typography component="span" sx={{ fontWeight: 'normal' }}>
                {product.title}
              </Typography>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Price:{' '}
              <Typography component="span" sx={{ fontWeight: 'normal' }}>
                €{product.price}
              </Typography>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Category:{' '}
              <Typography component="span" sx={{ fontWeight: 'normal' }}>
                {product.category.name}
              </Typography>
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', marginTop: 1 }}>
              Description:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'normal' }}>
              {product.description}
            </Typography>

            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <IconButton
                component={RouterLink}
                to="/products"
                sx={{ minWidth: 'unset', padding: 0, color: 'inherit' }}
              >
                <ReplyIcon sx={{ fontSize: 40 }} />
              </IconButton>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(product)}
                sx={{ marginLeft: 1 }}
              >
                Add to cart
              </Button>
              <Box>
                <UpdateProduct />
                <DeleteProduct />
              </Box>
            </CardActions>
          </Box>
        </Card>
      ) : (
        <Box>Product not found</Box>
      )}
    </Box>
  )
}

export default ProductDetail

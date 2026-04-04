import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { debounce } from 'lodash'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import { AppState, useAppDispatch } from '../redux/store'
import { fetchProductsAsync } from '../redux/slices/productSlice'
import { addToCart } from '../redux/slices/cartSlice'
import { ProductType } from '../misc/type'
import { checkImage } from '../utils/checkImage'
import { cleanImage } from '../utils/cleanImage'
import defaultImage from '../assets/images/default_image.jpg'

const FeaturedProducts = () => {
  const dispatch = useAppDispatch()
  const allProducts = useSelector((state: AppState) => state.products.allProducts)
  const loading = useSelector((state: AppState) => state.products.loading)

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProductsAsync())
    }
  }, [dispatch, allProducts.length])

  const handleAddToCart = debounce((product: ProductType) => {
    dispatch(addToCart(product))
  }, 300)

  const featuredProducts = allProducts.slice(0, 4)

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ padding: { xs: '20px', md: '40px 60px' }, backgroundColor: '#f9f9f9' }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          marginBottom: '30px',
          fontWeight: 'bold',
          color: 'text.primary'
        }}
      >
        Featured Products
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 3,
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >
        {featuredProducts.map(product => (
          <Card
            key={product.id}
            sx={{
              'border': '1px solid #ddd',
              'borderRadius': '8px',
              'boxShadow': '0 2px 4px rgba(0,0,0,0.1)',
              'transition': 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
              },
              'display': 'flex',
              'flexDirection': 'column',
              'justifyContent': 'space-between'
            }}
          >
            <CardMedia
              component="img"
              alt={product.title}
              image={checkImage(cleanImage(product.images[0])) ? cleanImage(product.images[0]) : defaultImage}
              sx={{ height: 250, objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                gutterBottom
                variant="h6"
                component="h3"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {product.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                €{product.price}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                justifyContent: 'space-between',
                borderTop: '1px solid #ddd',
                padding: '10px'
              }}
            >
              <Button
                size="small"
                color="primary"
                variant="outlined"
                component={RouterLink}
                to={`/products/${product.id}`}
                sx={{ fontWeight: 'bold', padding: '6px 12px' }}
              >
                View
              </Button>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => handleAddToCart(product)}
                sx={{ fontWeight: 'bold', padding: '6px 12px' }}
              >
                Add to cart
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default FeaturedProducts

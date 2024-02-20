import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Categories from '../components/Categories'
import { ProductType, Sort } from '../misc/type'
import { addToCart } from '../redux/slices/cartSlice'
import { fetchProductsAsync } from '../redux/slices/productSlice'
import { AppState, useAppDispatch } from '../redux/store'
import { sortByHighest, sortByLowest } from '../utils/sort'

const Products = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedSort, setSelectedSort] = useState<Sort>('Default')
  const open = Boolean(anchorEl)

  const products = useSelector((state: AppState) => state.products.products)
  const selectedCategory = useSelector((state: AppState) => state.categories.selectedCategory)
  const loading = useSelector((state: AppState) => state.products.loading)
  const error = useSelector((state: AppState) => state.products.error)
  const dispatch = useAppDispatch()
  const cartDispatch = useDispatch()

  const handleAddToCart = (product: ProductType) => {
    cartDispatch(addToCart(product))
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    dispatch(fetchProductsAsync())
  }, [dispatch])

  let filteredProducts =
    selectedCategory === 'All' ? products : products.filter(product => product.category === selectedCategory)

  let sortProducts =
    selectedSort === 'Default'
      ? filteredProducts
      : selectedSort === 'Highest Price'
      ? sortByHighest(filteredProducts, 'price')
      : sortByLowest(filteredProducts, 'price')

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
    <Box
      sx={{
        display: 'flex'
      }}
    >
      <Categories />
      <Box>
        <Box sx={{ margin: '10px 0 0 10px' }}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              minWidth: 'unset',
              padding: 1,
              color: 'inherit',
              fontWeight: '500',
              border: '1px solid black'
            }}
          >
            Sort by: {selectedSort}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem
              onClick={() => {
                setSelectedSort('Default')
              }}
            >
              Default
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSelectedSort('Highest Price')
              }}
            >
              Highest Price
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSelectedSort('Lowest Price')
              }}
            >
              Lowest Price
            </MenuItem>
          </Menu>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 2,
            margin: '10px',
            justifyContent: 'center'
          }}
        >
          {sortProducts.map(product => (
            <Card
              key={product.id}
              sx={{
                'border': '1px solid #ddd',
                'borderRadius': '8px',
                'boxShadow': '0 2px 4px rgba(0,0,0,0.1)',
                'transition': 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' },
                'display': 'flex',
                'flex-direction': 'column',
                'justifyContent': 'space-between'
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={product.title}
                  image={product.image}
                  sx={{ height: 300, objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {product.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ maxHeight: 60, overflow: 'hidden' }}>
                    €{product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>

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
                  sx={{ fontWeight: 'bold', padding: 1 }}
                >
                  More detail
                </Button>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => handleAddToCart(product)}
                  sx={{ fontWeight: 'bold', padding: 1 }}
                >
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Products

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Link from '@mui/material/Link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Categories from '../components/Categories'
import { ProductType, Sort } from '../misc/type'
import { addToCart } from '../redux/slices/cartSlice'
import { fetchProductsAsync } from '../redux/slices/productSlice'
import { AppState, useAppDispatch } from '../redux/store'
import { sortByHighest, sortByLowest } from '../utils/sort'

const Products = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedSort, setSelectedSort] = useState<Sort>('Original')
  const open = Boolean(anchorEl)

  const products = useSelector((state: AppState) => state.products.products)
  const selectedCategory = useSelector((state: AppState) => state.categories.selectedCategory)
  const loading = useSelector((state: AppState) => state.products.loading)
  const error = useSelector((state: AppState) => state.products.error)
  const dispatch = useAppDispatch()
  const cartDispatch = useDispatch()

  const handleAddToCart = (product: ProductType) => {
    cartDispatch(
      addToCart({
        product
      })
    )
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
    selectedSort === 'Original'
      ? filteredProducts
      : selectedSort === 'Highest Price'
      ? sortByHighest(filteredProducts, 'price')
      : sortByLowest(filteredProducts, 'price')

  if (loading) {
    return <Box>Loading...</Box>
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
        <Box
          sx={{
            margin: '10px 0 0 10px'
          }}
        >
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
                setSelectedSort('Original')
              }}
            >
              Original
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
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 2,
            margin: '10px'
          }}
        >
          {sortProducts.map(product => (
            <Card
              key={product.id}
              sx={{
                border: '1px solid black',
                padding: 2
              }}
            >
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body1">€{product.price}</Typography>
              <Typography variant="body2">{product.description}</Typography>
              <CardMedia
                component="img"
                alt="Product Images"
                image={product.image}
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
              <CardActions>
                <Link component={RouterLink} to={`/products/${product.id}`}>
                  <Button size="small">More details</Button>
                </Link>
                <Button
                  size="small"
                  onClick={() => {
                    handleAddToCart(product)
                  }}
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

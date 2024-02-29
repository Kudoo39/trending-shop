import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import defaultImage from '../assets/images/default_image.jpg'
import Categories from '../components/Categories'
import CreateProduct from '../components/CreateProduct'
import { ProductType, Sort } from '../misc/type'
import { addToCart } from '../redux/slices/cartSlice'
import {
  fetchProductsAsync,
  fetchProductsCategoryAsync,
  fetchProductsCategoryPageAsync,
  fetchProductsPageAsync
} from '../redux/slices/productSlice'
import { AppState, useAppDispatch } from '../redux/store'
import { checkImage } from '../utils/checkImage'
import { cleanImage } from '../utils/cleanImage'
import { sortByHighest, sortByLowest } from '../utils/sort'

const Products = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedSort, setSelectedSort] = useState<Sort>('Default')
  const open = Boolean(anchorEl)
  const [page, setPage] = useState(1)
  const productsPerPage = 8

  const allProducts = useSelector((state: AppState) => state.products.allProducts)
  const products = useSelector((state: AppState) => state.products.products) //page
  const selectedCategory = useSelector((state: AppState) => state.categories.selectedCategory)
  const loading = useSelector((state: AppState) => state.products.loading)
  const error = useSelector((state: AppState) => state.products.error)
  const dispatch = useAppDispatch()
  const cartDispatch = useDispatch()

  const offset = (page - 1) * productsPerPage
  const limit = productsPerPage
  let numberOfPages = Math.ceil(allProducts.length >= 0 ? allProducts.length / productsPerPage : 0)
  numberOfPages = numberOfPages === 0 ? 1 : numberOfPages

  const handleAddToCart = (product: ProductType) => {
    cartDispatch(addToCart(product))
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  useEffect(() => {
    if (selectedCategory === 0) {
      dispatch(fetchProductsAsync())
    } else {
      dispatch(fetchProductsCategoryAsync(selectedCategory))
    }
  }, [dispatch, selectedCategory])

  useEffect(() => {
    if (selectedCategory === 0) {
      dispatch(fetchProductsPageAsync({ offset, limit }))
    } else {
      dispatch(fetchProductsCategoryPageAsync({ categoryId: selectedCategory, offset, limit }))
    }
  }, [dispatch, selectedCategory, offset, limit])

  let sortProducts =
    selectedSort === 'Default'
      ? products
      : selectedSort === 'Highest Price'
        ? sortByHighest(products, 'price') // prettier-ignore
        : sortByLowest(products, 'price') // prettier-ignore

  if (loading) {
    return (
      <Box sx={{ marginTop: '10px', marginLeft: '2px' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Box>Error: {error}</Box>
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: { xxs: 'column', xs: 'row' } }}>
      <Categories />
      <Box>
        <Box sx={{ display: 'flex' }}>
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
          <CreateProduct />
        </Box>

        {products.length === 0 ? (
          <Box sx={{ fontSize: '18px', margin: '10px 0 0 10px' }}>There are no items in this category :/</Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
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
                  'flexDirection': 'column',
                  'justifyContent': 'space-between'
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={product.title}
                    image={checkImage(cleanImage(product.images[0])) ? cleanImage(product.images[0]) : defaultImage}
                    sx={{ height: 300, objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {product.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold', color: '#333' }}>
                      Price:{' '}
                      <Typography component="span" sx={{ fontWeight: 'normal' }}>
                        €{product.price}
                      </Typography>
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
        )}

        {numberOfPages === 1 ? null : (
          <Pagination
            count={numberOfPages}
            page={page}
            defaultPage={1}
            color="primary"
            sx={{ padding: 4 }}
            onChange={handlePageChange}
          />
        )}
      </Box>
    </Box>
  )
}

export default Products
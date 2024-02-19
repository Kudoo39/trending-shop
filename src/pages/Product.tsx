import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import DiamondIcon from '@mui/icons-material/Diamond'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import ManIcon from '@mui/icons-material/Man'
import SubjectIcon from '@mui/icons-material/Subject'
import WomanIcon from '@mui/icons-material/Woman'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CheckIcon from '@mui/icons-material/Check'
import { Category, ProductType, Sort } from '../misc/type'
import { fetchProductsAsync } from '../redux/slices/productSlice'
import { AppState, useAppDispatch } from '../redux/store'
import { sortByLowest, sortByHighest } from '../utils/sort'
import { addToCart } from '../redux/slices/cartSlice'

const Product = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const [selectedSort, setSelectedSort] = useState<Sort>('Original')
  const open = Boolean(anchorEl)

  const products = useSelector((state: AppState) => state.products.products)
  const loading = useSelector((state: AppState) => state.products.loading)
  const error = useSelector((state: AppState) => state.products.error)
  const dispatch = useAppDispatch()
  const cartDispatch = useDispatch()

  const handleAddToCart = (product: ProductType) => {
    cartDispatch(addToCart({ product }))
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
    selectedCategory === 'All'
      ? products
      : products.filter(product => product.category === selectedCategory)

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
    <Box sx={{ display: 'flex' }}>
      <List sx={{ minWidth: '200px', marginLeft: '10px' }}>
        <ListItem disablePadding onClick={() => setSelectedCategory('All')}>
          <ListItemButton>
            <ListItemIcon>
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText primary="All" />
            {selectedCategory === 'All' ? <CheckIcon /> : null}
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          onClick={() => setSelectedCategory('electronics')}
        >
          <ListItemButton>
            <ListItemIcon>
              <ElectricBoltIcon />
            </ListItemIcon>
            <ListItemText primary="Electronics" />
            {selectedCategory === 'electronics' ? <CheckIcon /> : null}
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          onClick={() => setSelectedCategory('jewelery')}
        >
          <ListItemButton>
            <ListItemIcon>
              <DiamondIcon />
            </ListItemIcon>
            <ListItemText primary="Jewelery" />
            {selectedCategory === 'jewelery' ? <CheckIcon /> : null}
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          onClick={() => setSelectedCategory('men\u0027s clothing')}
        >
          <ListItemButton>
            <ListItemIcon>
              <ManIcon />
            </ListItemIcon>
            <ListItemText primary="Men" />
            {selectedCategory === 'men\u0027s clothing' ? <CheckIcon /> : null}
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          onClick={() => setSelectedCategory('women\u0027s clothing')}
        >
          <ListItemButton>
            <ListItemIcon>
              <WomanIcon />
            </ListItemIcon>
            <ListItemText primary="Women" />
            {selectedCategory === 'women\u0027s clothing' ? (
              <CheckIcon />
            ) : null}
          </ListItemButton>
        </ListItem>
      </List>

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
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
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
              sx={{ border: '1px solid black', padding: 2 }}
            >
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

export default Product

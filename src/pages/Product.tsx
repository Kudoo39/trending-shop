import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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
import { Category } from '../misc/type'
import { fetchProductsAsync } from '../redux/slices/productSlice'
import { AppState, useAppDispatch } from '../redux/store'

const Product = () => {
  const dispatch = useAppDispatch()
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')

  useEffect(() => {
    dispatch(fetchProductsAsync())
  }, [dispatch])

  const products = useSelector((state: AppState) => state.products.products)
  const loading = useSelector((state: AppState) => state.products.loading)
  const error = useSelector((state: AppState) => state.products.error)

  let filteredProducts =
    selectedCategory === 'All' ? products : products.filter((product) => product.category === selectedCategory)

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
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => setSelectedCategory('electronics')}>
          <ListItemButton>
            <ListItemIcon>
              <ElectricBoltIcon />
            </ListItemIcon>
            <ListItemText primary="Electronics" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => setSelectedCategory('jewelery')}>
          <ListItemButton>
            <ListItemIcon>
              <DiamondIcon />
            </ListItemIcon>
            <ListItemText primary="Jewelery" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => setSelectedCategory('men\u0027s clothing')}>
          <ListItemButton>
            <ListItemIcon>
              <ManIcon />
            </ListItemIcon>
            <ListItemText primary="Men" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => setSelectedCategory('women\u0027s clothing')}>
          <ListItemButton>
            <ListItemIcon>
              <WomanIcon />
            </ListItemIcon>
            <ListItemText primary="Women" />
          </ListItemButton>
        </ListItem>
      </List>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, margin: '10px' }}>
        {filteredProducts.map((product) => (
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
              <Link component={RouterLink} to={`/products/${product.id}`}>
                <Button size="small">More details</Button>
              </Link>
              <Button size="small">Add to cart</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default Product

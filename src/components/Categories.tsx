import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CheckIcon from '@mui/icons-material/Check'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import CircularProgress from '@mui/material/CircularProgress'
import ListItemText from '@mui/material/ListItemText'
import { fetchCategoriesAsync, setSelectedCategory } from '../redux/slices/categorySlice'
import { AppState, useAppDispatch } from '../redux/store'

const Categories = () => {
  const categories = useSelector((state: AppState) => state.categories.categories)
  const selectedCategory = useSelector((state: AppState) => state.categories.selectedCategory)
  const loading = useSelector((state: AppState) => state.categories.loading)
  const error = useSelector((state: AppState) => state.categories.error)
  const dispatch = useAppDispatch()
  const categoryDispatch = useDispatch()

  const handleCategory = (category: number) => {
    categoryDispatch(setSelectedCategory(category))
  }

  useEffect(() => {
    dispatch(fetchCategoriesAsync())
  }, [dispatch])

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
    <List
      sx={{
        width: { xxs: '100%', xs: '200px' },
        marginLeft: '10px'
      }}
    >
      {categories.map(category => (
        <ListItem key={category.id} disablePadding onClick={() => handleCategory(category.id)}>
          <ListItemButton>
            <ListItemText primary={category.name} />
            {selectedCategory === category.id ? <CheckIcon /> : null}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default Categories
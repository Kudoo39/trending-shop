import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CheckIcon from '@mui/icons-material/Check'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
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
      <Stack spacing={1} sx={{ marginTop: '10px', marginLeft: '2px' }}>
        <Skeleton variant="rectangular" width={210} height={40} />
        <Skeleton variant="rectangular" width={210} height={40} />
        <Skeleton variant="rectangular" width={210} height={40} />
        <Skeleton variant="rectangular" width={210} height={40} />
        <Skeleton variant="rectangular" width={210} height={40} />
        <Skeleton variant="rectangular" width={210} height={40} />
        <Skeleton variant="rectangular" width={210} height={40} />
        <Skeleton variant="rectangular" width={210} height={40} />
      </Stack>
    )
  }

  if (error) {
    return <Box>Error: {error}</Box>
  }

  return (
    <List sx={{ minWidth: '200px', maxWidth: '220px', marginLeft: '10px' }}>
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

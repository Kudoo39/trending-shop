import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import CheckIcon from '@mui/icons-material/Check'
import DiamondIcon from '@mui/icons-material/Diamond'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import ManIcon from '@mui/icons-material/Man'
import SubjectIcon from '@mui/icons-material/Subject'
import WomanIcon from '@mui/icons-material/Woman'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Category } from '../misc/type'
import { setSelectedCategory } from '../redux/slices/categorySlice'
import { AppState } from '../redux/store'

const Categories = () => {
  const selectedCategory = useSelector((state: AppState) => state.categories.selectedCategory)
  const dispatch = useDispatch()

  const handleCategory = (category: Category) => {
    dispatch(setSelectedCategory(category))
  }

  return (
    <List sx={{ minWidth: '200px', marginLeft: '10px' }}>
      <ListItem disablePadding onClick={() => handleCategory('All')}>
        <ListItemButton>
          <ListItemIcon>
            <SubjectIcon />
          </ListItemIcon>
          <ListItemText primary="All" />
          {selectedCategory === 'All' ? <CheckIcon /> : null}
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding onClick={() => handleCategory('electronics')}>
        <ListItemButton>
          <ListItemIcon>
            <ElectricBoltIcon />
          </ListItemIcon>
          <ListItemText primary="Electronics" />
          {selectedCategory === 'electronics' ? <CheckIcon /> : null}
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding onClick={() => handleCategory('jewelery')}>
        <ListItemButton>
          <ListItemIcon>
            <DiamondIcon />
          </ListItemIcon>
          <ListItemText primary="Jewelery" />
          {selectedCategory === 'jewelery' ? <CheckIcon /> : null}
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding onClick={() => handleCategory('men\u0027s clothing')}>
        <ListItemButton>
          <ListItemIcon>
            <ManIcon />
          </ListItemIcon>
          <ListItemText primary="Men" />
          {selectedCategory === 'men\u0027s clothing' ? <CheckIcon /> : null}
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding onClick={() => handleCategory('women\u0027s clothing')}>
        <ListItemButton>
          <ListItemIcon>
            <WomanIcon />
          </ListItemIcon>
          <ListItemText primary="Women" />
          {selectedCategory === 'women\u0027s clothing' ? <CheckIcon /> : null}
        </ListItemButton>
      </ListItem>
    </List>
  )
}

export default Categories

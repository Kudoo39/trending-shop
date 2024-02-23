import { useDispatch, useSelector } from 'react-redux'

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

  const categories = [
    { id: 'All', icon: <SubjectIcon />, label: 'All' },
    { id: 'electronics', icon: <ElectricBoltIcon />, label: 'Electronics' },
    { id: 'jewelery', icon: <DiamondIcon />, label: 'Jewelery' },
    { id: 'men\u0027s clothing', icon: <ManIcon />, label: 'Men' },
    { id: 'women\u0027s clothing', icon: <WomanIcon />, label: 'Women' }
  ]

  return (
    <List sx={{ minWidth: '200px', marginLeft: '10px' }}>
      {categories.map(category => (
        <ListItem key={category.id} disablePadding onClick={() => handleCategory(category.id as Category)}>
          <ListItemButton>
            <ListItemIcon>{category.icon}</ListItemIcon>
            <ListItemText primary={category.label} />
            {selectedCategory === category.id ? <CheckIcon /> : null}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default Categories

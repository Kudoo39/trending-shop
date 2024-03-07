import { memo } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { SearchProps } from '../misc/type'

const Search = ({ searchValue, setSearchValue }: SearchProps) => {
  return (
    <Box sx={{ margin: '11.5px 10.5px 0 10px' }}>
      <TextField
        label="Search..."
        type="text"
        size="small"
        value={searchValue}
        onChange={e => {
          setSearchValue(e.target.value)
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.primary' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <CloseIcon
                onClick={() => {
                  setSearchValue('')
                }}
                fontSize="small"
                sx={{ color: 'text.primary', cursor: 'pointer', display: searchValue.length <= 0 ? 'none' : 'block' }}
              />
            </InputAdornment>
          )
        }}
        sx={{
          '& label': { color: 'text.primary' },
          '& input': { color: 'text.primary' },
          '& label.Mui-focused': { color: 'text.primary' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'text.primary'
            },
            '&:hover fieldset': {
              borderColor: 'text.primary'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'text.primary'
            }
          }
        }}
      />
    </Box>
  )
}

export default memo(Search)

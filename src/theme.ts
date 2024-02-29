import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Define your custom theme
const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 300,
      xs: 500,
      sm: 700,
      md: 900,
      lg: 1200,
      xl: 1536
    } as any
  },
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    }
  }
})

export default theme

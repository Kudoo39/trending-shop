import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
  breakpoints: {
    values: {
      xxs: 300,
      xsm: 400,
      xs: 500,
      sm: 700,
      md: 900,
      lg: 1200,
      xl: 1536
    } as any
  },
  typography: {
    fontFamily: [
      'Karla',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif'
    ].join(',')
  }
})

export default theme

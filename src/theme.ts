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
  }
})

export default theme

import { memo } from 'react'

import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'

const Footer = () => {
  return (
    <Box
      sx={{
        padding: '20px',
        textAlign: 'center',
        borderTop: '1px solid #ddd',
        bottom: '0',
        width: '100%'
      }}
    >
      <Typography variant="body2" sx={{ marginRight: 1, fontWeight: 'bold', marginBottom: '20px' }}>
        Data provided by{' '}
        <Link
          href="https://fakestoreapi.com/"
          target="_blank"
          rel="noreferrer"
          sx={{ 'textDecoration': 'none', 'listStyle': 'none', '&:hover': { color: '#255c99' } }}
        >
          Fake Store API
        </Link>
      </Typography>
      <Typography variant="body2">© 2024 - Khang Nguyen</Typography>
    </Box>
  )
}

export default memo(Footer)

import { Route, Routes } from 'react-router-dom'

import Nav from './components/Nav'
import Home from './pages/Home'
import Product from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import User from './components/User'
import Footer from './components/Footer'
import Box from '@mui/material/Box'
import './App.css'

const App = () => {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />
      <Box style={{ flex: '1' }}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Product />}></Route>
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/user" element={<User />}></Route>
        </Routes>
      </Box>
      <Footer />
    </Box>
  )
}

export default App

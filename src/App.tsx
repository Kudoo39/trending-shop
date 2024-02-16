import { Route, Routes } from 'react-router-dom'

import Nav from './components/Nav'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import User from './components/User'
import Footer from './components/Footer'
import './App.css'

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App

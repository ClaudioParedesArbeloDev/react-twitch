import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'


import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
       <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
       </BrowserRouter>
  </StrictMode>,
)

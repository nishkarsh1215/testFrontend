import React from 'react'
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Hexagon from './Hexagon'
import Home from './Home'
import MyThree from './MyThree'
import AppCard from './ReactiveCard/src/AppCard'
import ResponsiveAppBar from './ResponsiveAppBar'
import SwipeableEdgeDrawer from './SwipeableEdgeDrawer'
import ScrollOne from './ScrollOne'
import ProductPage from './ProductPage'

const App = () => {
  console.log('App Loaded')
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/hexagon" element={<Hexagon />} />
        <Route path="/home" element={<Home />} />
        <Route path="/three" element={<MyThree />} />
        <Route path="/card" element={<AppCard />} />
        <Route path="/scroll" element={<ScrollOne />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="*" element={<Navigate to="/hexagon" replace />} />
      </Routes>
      <SwipeableEdgeDrawer />
    </Router>
  )
}

export default App

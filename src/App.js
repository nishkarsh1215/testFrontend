import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
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
        <Route path="/" element={<Hexagon />} />
        <Route path="/home" element={<Home />} />
        <Route path="/three" element={<MyThree />} />
        <Route path="/card" element={<AppCard />} />
        <Route path="/scroll" element={<ScrollOne />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
      <SwipeableEdgeDrawer />
    </Router>
  )
}

export default App

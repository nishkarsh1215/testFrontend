import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import Hexagon from './Hexagon'
import Home from './Home'
import MyThree from './MyThree'
import AppCard from './ReactiveCard/src/AppCard'
import ResponsiveAppBar from './ResponsiveAppBar'
import SwipeableEdgeDrawer from './SwipeableEdgeDrawer'
import ScrollOne from './ScrollOne'
import ProductPage from './ProductPage'
import ReactGA from 'react-ga4'
import QuilBot from './QuilBot'
import SaveBlog from './SaveBlog'
import { FullBlog } from './FullBlog'

// Utility function to generate a random ID
const generateRandomId = () => Math.floor(Math.random() * 1000000)

const App = () => {
  console.log('App Loaded')
  ReactGA.initialize('G-0BR3YV9YHM')
  return (
    <Router>
      <Main />
    </Router>
  )
}

const Main = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isBlogPage =
    location.pathname.startsWith('/blog') && location.pathname !== '/blog'

  useEffect(() => {
    if (location.pathname === '/blog') {
      const randomId = generateRandomId()
      navigate(`/blog/${randomId}`, { replace: true }) // Redirect to /blog/id
    }
  }, [location.pathname, navigate])

  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Hexagon />} />
        <Route path="/home" element={<Home />} />
        <Route path="/three" element={<MyThree />} />
        <Route path="/card" element={<AppCard />} />
        <Route path="/scroll" element={<ScrollOne />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/blogs" element={<FullBlog />} />
        <Route path="/blog/:id" element={<QuilBot />} />
        <Route path="/saveblog/:id" element={<SaveBlog />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Catch-all route */}
      </Routes>
      <SwipeableEdgeDrawer />
    </>
  )
}

export default App

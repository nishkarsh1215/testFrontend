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
import Card from './Card'
import AppCard from './ReactiveCard/src/AppCard'
import ResponsiveAppBar from './ResponsiveAppBar'

// import MyComponent from './MyComponent'

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

        <Route path="*" element={<Navigate to="/hexagon" replace />} />
      </Routes>
    </Router>
  )
}

export default App

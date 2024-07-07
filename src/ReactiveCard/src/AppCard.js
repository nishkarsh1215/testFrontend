import React, { useState, useEffect } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../LoginFirebase'
import AdvancedResults from './examples/AdvancedResults'

function AppCard() {
  const [showAdvanced, setShowAdvanced] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/home')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  return (
    <div className="app">
      <AdvancedResults />
    </div>
  )
}

export default AppCard

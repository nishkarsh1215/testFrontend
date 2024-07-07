import React, { useState } from 'react'
import './App.css'
import Switch from 'react-ios-switch'

import Advanced from './examples/Advanced'
import AdvancedResults from './examples/AdvancedResults'
import Simple from './examples/Simple'

function AppCard() {
  const [showAdvanced, setShowAdvanced] = useState(true)

  return (
    <div className="app">
      <AdvancedResults />
    </div>
  )
}

export default AppCard

/////newone correct one

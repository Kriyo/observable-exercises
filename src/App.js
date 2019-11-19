import React from 'react'

import { Observe } from './components/observing_numbers'
import { PokeApp } from './components/pokemon'

import logo from './logo.svg'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Observe />
        <PokeApp />
      </header>
    </div>
  )
}

export default App

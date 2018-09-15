import React from 'react'
import Nav from './components/Nav'
import SearchBar from './components/SearchBar'
import Repos from './components/Repos'
import Favourites from './components/Favourites'
import './App.css'

const App = () => (
  <div className="App">
    <Nav />
    <SearchBar />
    <Repos />
    <Favourites />
  </div>
)

export default App
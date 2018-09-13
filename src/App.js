import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    searchTerm: '',
    repos: []
  }
  
  findRepos = () => {
    const { searchTerm } = this.state

    fetch(`https://api.github.com/search/repositories?q=${searchTerm}&per_page=10`)
      .then(res => res.json())
      .then(data => console.log(data))
  }
  
  render() {
    const { searchTerm } = this.state

    return (
      <div className="App">
        <h1>My Github Favorites</h1>
        <input 
          type="text"
          placeholder="search for a repo..."
          value={searchTerm}
          onChange={e => this.setState({ searchTerm: e.target.value })}
        />
        <button type="submit" onClick={this.findRepos}>Search</button>

         <div className="category-container">
          <h5>Name</h5>
          <h5>Language</h5>
          <h5>Latest Tag</h5>    
        </div>
      </div>
    )
  }
}

export default App
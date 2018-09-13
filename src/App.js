import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    searchTerm: '',
    repos: []
  }

  handleChange = e => {
    const { searchTerm } = this.state

    this.setState({ searchTerm: e.target.value })
    
    if (searchTerm === '') {
      this.setState({ repos: [] })
    }
  }

  findRepos = () => {
    const { searchTerm } = this.state

    fetch(`https://api.github.com/search/repositories?q=${searchTerm}&per_page=10&access_token=${process.env.REACT_APP_TOKEN}
`)
      .then(res => res.json())
      .then(data => {
        this.setState({ repos: data.items })
      })
  }
  
  render() {
    const { searchTerm, repos } = this.state

    return (
      <div className="App">
        <h1>My Github Favorites</h1>
        <input 
          type="text"
          placeholder="search for a repo..."
          value={searchTerm}
          onChange={e => this.handleChange(e)}
          onKeyPress={e => e.key === 'Enter' && this.findRepos()}
        />
        <button 
          type="submit" 
          onClick={this.findRepos}>
          Search
        </button>

         <div className="category-container">
          <h5>Name</h5>
          <h5>Language</h5>
          <h5>Latest Tag</h5>

          {repos.map(repo => (
            <div key={repo.id}>
              <a href={repo.html_url}>{repo.full_name}</a>
              <p>{repo.language}</p>
              <p>v1</p>
              <a href="#" onClick={this.addToFavs}>Add</a>
            </div>
          ))}   
        </div>
      </div>
    )
  }
}

export default App
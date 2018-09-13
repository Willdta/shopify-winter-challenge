import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    searchTerm: '',
    repos: [],
    favourites: []
  }

  handleChange = e => {
    const { searchTerm } = this.state

    this.setState({ searchTerm: e.target.value })
    
    if (searchTerm.split('').length - 1 === 0) {
      this.setState({ repos: [] })
    }
  }

  findRepos = () => {
    const { searchTerm } = this.state

    fetch(`https://api.github.com/search/repositories?q=${searchTerm}&per_page=10&access_token=${process.env.REACT_APP_TOKEN}
    `)
      .then(res => res.json())
      .then(data => {
        const repos = data.items.map(item => {
          const { id, full_name, html_url, language } = item

          const obj = {
            id,
            full_name,
            html_url,
            language,
            isFavourite: false
          }

          return obj
        })
        
        this.setState({ repos })
      })
  }
    
  addToFavs = repo => {
    const { favourites } = this.state
    
    this.setState({
      favourites: [...favourites, 
        {  
          id: repo.id, 
          html_url: repo.html_url,
          full_name: repo.full_name, 
          language: repo.language,
          isFavourite: true
        }]
    })
  }

  render() {
    const { searchTerm, repos, favourites } = this.state

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
          <div className="labels">
            <h5>Name</h5>
            <h5>Language</h5>
            <h5>Latest Tag</h5>          
          </div>

          {repos.map(repo => (
            <div key={repo.id}>
              <a href={repo.html_url}>{repo.full_name}</a>
              <p>{repo.language}</p>
              <p>v1</p>
              <button onClick={() => this.addToFavs(repo)}>Add</button>
            </div>
          ))}   
          
          <h1>Favourites</h1>
          {favourites.map(repo => (
            <div key={repo.id}>
              <a href={repo.html_url}>{repo.full_name}</a>
              <p>{repo.language}</p>
              <p>v1</p>
              <button>Remove</button>
            </div>
          ))}   
        </div>
      </div>
    )
  }
}

export default App
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

  findRepos = async () => {
    const { searchTerm } = this.state

    const response = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}&per_page=10&access_token=${process.env.REACT_APP_TOKEN}`)
    const data = await response.json()
    
    const repos = data.items.map(async item => {
      const { id, full_name, html_url, language } = item
      const obj = {
        id,
        full_name,
        html_url, 
        language,
        isFavourite: false
      }
      
      const tagResponse = await fetch(`https://api.github.com/repos/${full_name}/tags`)
      const tagData = await tagResponse.json()
      
      if (tagData[0] && tagData[0].name) {
        obj.latest_tag = tagData[0].name
      }

      return obj
    })

    Promise.all(repos).then(repos => this.setState({ repos }))
  }
    
  addToFavs = repo => {
    const { favourites, repos } = this.state
    const i = repos.findIndex(repoIndex => repoIndex.id === repo.id)

    this.setState({
      favourites: [...favourites, { ...repo, isFavourite: true }],
      repos: [
        ...repos.slice(0, i),
        { ...repo, isFavourite: true },
        ...repos.slice(i + 1)
      ]
    })
  }
  
  removeFromFavs = id => {
    const { favourites } = this.state
    
    this.setState({ 
      favourites: favourites.filter(repo => repo.id !== id)
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
              {repo.latest_tag ? <p>{repo.latest_tag}</p> : <p>-</p>}
              {repo.isFavourite ? null : <button onClick={() => this.addToFavs(repo)}>Add</button>}
            </div>
          ))}   
            
          <h1>Favourites</h1>
          {favourites.map(repo => (
            <div key={repo.id}>
              <a href={repo.html_url}>{repo.full_name}</a>
              <p>{repo.language}</p>
              <p>{repo.latest_tag}</p>
              <button onClick={() => this.removeFromFavs(repo.id)}>Remove</button>
            </div>
          ))}   
        </div>
      </div>
    )
  }
}

export default App
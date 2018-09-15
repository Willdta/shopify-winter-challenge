import React, { Component } from 'react'
import { fetchRepos, addToFavs, removeFromFavs, resetSearch } from './actions/reposActions'
import { connect } from 'react-redux'
import './App.css'

class App extends Component {
  state = {
    searchTerm: ''
  }

  handleChange = e => {
    const { searchTerm } = this.state

    this.setState({ searchTerm: e.target.value })
    
    if (searchTerm.split('').length - 1 === 0) {
      this.props.resetSearch()
    }
  }

  findRepos = e => {
    const { searchTerm } = this.state

    if (searchTerm === '') {
      e.preventDefault()
    } else { 
      this.props.fetchRepos(searchTerm)
    }
  }
    
  addToFavs = repo => {
    const { repos } = this.props
    const i = repos.findIndex(repoIndex => repoIndex.id === repo.id)

    this.props.addToFavs(repo, i)
  }
  
  removeFromFavs = repo => {
    const { favourites, repos } = this.props
    const { id } = repo

    const foundRepo = favourites.find(repoIndex => repoIndex.id === repo.id)
    const i = repos.findIndex(repoIndex => repoIndex.id === repo.id) 

    this.props.removeFromFavs(foundRepo, id, i)
  }

  render() {
    const { searchTerm } = this.state    
    const { repos, favourites } = this.props

    return (
      <div className="App">
        <nav>
          <h1>My Github Favorites</h1>
        </nav>

        <div className="input-container">
          <input 
            type="text"
            placeholder="search for a repo..."
            value={searchTerm}
            onChange={e => this.handleChange(e)}
            onKeyPress={e => e.key === 'Enter' && this.findRepos(e)}
          />
          <button 
            type="submit" 
            onClick={this.findRepos}>
            Search
          </button>
        </div>

        <section>
          <div className="repo-labels labels">
            <h5 className="label-font">Name</h5>
            <h5 className="label-font">Language</h5>
            <h5 className="label-font">Latest Tag</h5>          
          </div>

            {repos.map(repo => (
              <div key={repo.id} className="repo-data">
                <a className="data-font" href={repo.html_url}>{repo.full_name}</a>
                <p className="data-font">{repo.language}</p>
                {repo.latest_tag ? <p className="data-font">{repo.latest_tag}</p> : <p className="data-font">-</p>}
                {repo.isFavourite ? <p className="placeholder">add</p> : <p className="data-font" onClick={() => this.addToFavs(repo)}>Add</p>}
              </div>
            ))}   
        </section>        

        <section className="favourites-container">
          <div className="favourites-labels labels">
            <h5 className="label-font">Name</h5>
            <h5 className="label-font">Language</h5>
            <h5 className="label-font">Latest Tag</h5>          
          </div>

          <div className="favourites-data">
            {favourites.map(repo => (
              <div key={repo.id} className="repo-data">
                <a className="data-font" href={repo.html_url}>{repo.full_name}</a>
                <p className="data-font">{repo.language}</p>
                {repo.latest_tag ? <p className="data-font">{repo.latest_tag}</p> : <p className="data-font">-</p>}
                <p className="data-font" onClick={() => this.removeFromFavs(repo)}>Remove</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = ({ repos }) => ({
  repos: repos.repos,
  favourites: repos.favourites
})

export default connect(mapStateToProps, { fetchRepos, addToFavs, removeFromFavs, resetSearch })(App)
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
      this.setState({ repos: [], favourites: [] })
    }
  }

  findRepos = async e => {
    const { searchTerm } = this.state

    if (searchTerm === '') {
      e.preventDefault()
    } else { 
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
  }
    
  addToFavs = async repo => {
    const { favourites, repos } = this.state
    const i = await repos.findIndex(repoIndex => repoIndex.id === repo.id)

    this.setState({
      favourites: [...favourites, { ...repo }],
      repos: [
        ...repos.slice(0, i),
        { ...repo, isFavourite: true },
        ...repos.slice(i + 1)
      ]
    })
  }
  
  removeFromFavs = async repo => {
    const { favourites, repos } = this.state
    const { id } = repo

    const findRepo = await favourites.find(repoIndex => repoIndex.id === repo.id)
    const i = await repos.findIndex(repoIndex => repoIndex.id === repo.id) 

    this.setState({ 
      favourites: favourites.filter(repo => repo.id !== id),
      repos: [
        ...repos.slice(0, i),
        { ...findRepo, isFavourite: false },
        ...repos.slice(i + 1)
      ]
    })
  }

  render() {
    const { searchTerm, repos, favourites } = this.state    

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

            {/* {repos.map(repo => ( */}
              {/* <div key={repo.id} className="repo-data"> */}
              <div className="repo-data">
                {/* <a className="data-font" href={repo.html_url}>{repo.full_name}</a> */}
                <a className="data-font">full_name</a>
                <p className="data-font">language</p>
                {/* <p className="data-font">{repo.language}</p> */}
                {/* {repo.latest_tag ? <p className="data-font">{repo.latest_tag}</p> : <p className="data-font">-</p>} */}
               <p className="data-font">latest_tag</p>
                {/* {repo.isFavourite ? <p className="placeholder">add</p> : <p className="data-font" onClick={() => this.addToFavs(repo)}>Add</p>} */}
                <p className="data-font">Add</p>
              </div>
            {/* ))}    */}
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
              {/* // <div className="repo-data"> */}
                <a className="data-font" href={repo.html_url}>{repo.full_name}</a>
                {/* <a className="data-info font">full_name</a> */}
                <p className="data-font">{repo.language}</p>
                {/* <p className="data-info font">language</p> */}
                {repo.latest_tag ? <p className="data-font">{repo.latest_tag}</p> : <p className="data-font">-</p>}
                {/* <p className="data-info font">{repo.latest_tag}</p> */}
                {/* <p className="data-info font">latest_tag</p> */}
                <p className="data-font" onClick={() => this.removeFromFavs(repo)}>Remove</p>
                {/* <p className="data-info font">Remove</p> */}
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }
}

export default App
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRepos, resetSearch } from './actions/reposActions'
import Nav from './components/Nav'
import Repos from './components/Repos'
import Favourites from './components/Favourites'
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

  render() {
    const { searchTerm } = this.state    

    return (
      <div className="App">
        <Nav />

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

          <Repos />
        </section>        

        <section className="favourites-container">
          <div className="favourites-labels labels">
            <h5 className="label-font">Name</h5>
            <h5 className="label-font">Language</h5>
            <h5 className="label-font">Latest Tag</h5>          
          </div>

          <Favourites />
        </section>
      </div>
    )
  }
}

export default connect(null, { fetchRepos, resetSearch })(App)
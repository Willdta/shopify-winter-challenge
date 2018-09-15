import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRepos, resetSearch } from '../actions/reposActions'

class SearchBar extends Component {
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
          onClick={() => this.findRepos()}>
          Search
        </button>
      </div>
    )
  }
}

export default connect(null, { fetchRepos, resetSearch })(SearchBar)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRepos, resetSearch } from '../actions/reposActions'
import '../styles/searchbar.css'

class SearchBar extends Component {
  state = {
    searchTerm: '',
    error: null
  }

  handleChange = e => {
    const searchTerm = e.target.value

    this.setState({ searchTerm })

    if (searchTerm.trim() === '') {
      this.props.resetSearch()
    }
  }

  findRepos = e => {
    const { searchTerm } = this.state

    if (!searchTerm) {
      e.preventDefault()
      
      this.setState({
        error: true
      })
    } else { 
      this.setState({
        error: false
      })
      
      this.props.fetchRepos(searchTerm)
    }
  }

  render() {
    const { searchTerm, error } = this.state

    return (
      <div className="input-container">
        { error && <p className="invalid">Please Enter Something</p> }
        <input 
          type="text"
          placeholder="search for a repo..."
          value={searchTerm}
          onChange={e => this.handleChange(e)}
          onKeyPress={e => e.key === 'Enter' && this.findRepos(e)}
        />
        <button 
          type="submit" 
          onClick={e => this.findRepos(e)}>
          Search
        </button>
      </div>
    )
  }
}

export default connect(null, { fetchRepos, resetSearch })(SearchBar)
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

    e.preventDefault()

    if (!searchTerm) {
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
      <form className="input-container" onSubmit={e => this.findRepos(e)}>
        { error && <p className="invalid">Please Enter Something</p> }
        <input 
          type="text"
          placeholder="search for a repo..."
          value={searchTerm}
          onChange={e => this.handleChange(e)}
        />
        <button 
          type="submit"> 
          Search
        </button>
      </form>
    )
  }
}

export default connect(null, { fetchRepos, resetSearch })(SearchBar)
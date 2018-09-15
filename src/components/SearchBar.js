import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRepos, resetSearch } from '../actions/reposActions'
import '../styles/searchbar.css'

class SearchBar extends Component {
  state = {
    searchTerm: '',
    invalid: ''
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

    if (!searchTerm) {
      e.preventDefault()
      console.log('nah');
      
      // this.setState({
      //   invalid: 'invalid'
      // })
    } else { 
      this.props.fetchRepos(searchTerm)
    }
  }

  render() {
    const { searchTerm, invalid } = this.state

    return (
      <div className="input-container">
        <input 
          type="text"
          placeholder="search for a repo..."
          value={searchTerm}
          onChange={e => this.handleChange(e)}
          onKeyPress={e => e.key === 'Enter' && this.findRepos(e)}
          className={invalid}
        />
        <button 
          type="submit" 
          onClick={e=> this.findRepos(e)}>
          Search
        </button>
      </div>
    )
  }
}

export default connect(null, { fetchRepos, resetSearch })(SearchBar)
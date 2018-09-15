import React, { Component } from 'react'
import { connect } from 'react-redux';
import { removeFromFavs } from '../actions/reposActions'
import Favourite from './Favourite'

class Favourites extends Component {
  removeFromFavs = repo => {
   const { favourites, repos } = this.props
    const { id } = repo

    const foundRepo = favourites.find(repoIndex => repoIndex.id === repo.id)
    const i = repos.findIndex(repoIndex => repoIndex.id === repo.id) 

    this.props.removeFromFavs(foundRepo, id, i)
  }

  render() {
    const { favourites } = this.props
    
    return (
      <section className="favourites-container">
        <div className="favourites-labels labels">
          <h5 className="label-font">Name</h5>
          <h5 className="label-font">Language</h5>
          <h5 className="label-font">Latest Tag</h5>          
        </div>
        
        <div className="favourites-data">
          {favourites.map(repo => (
            <Favourite repo={repo} removeFromFavs={() => this.removeFromFavs(repo)} />
          ))}
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ repos }) => ({
  repos: repos.repos,
  favourites: repos.favourites
})


export default connect(mapStateToProps, { removeFromFavs })(Favourites)
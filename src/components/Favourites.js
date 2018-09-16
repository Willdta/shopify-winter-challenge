import React, { Component } from 'react'
import { connect } from 'react-redux';
import { removeFromFavs, removeFavOnly } from '../actions/reposActions'
import Favourite from './Favourite'
import '../styles/labels.css'

class Favourites extends Component {
  removeFromFavs = repo => {
   const { favourites, repos } = this.props
    const { id } = repo

    const foundRepo = favourites.find(repoIndex => repoIndex.id === repo.id)
    const i = repos.findIndex(repoIndex => repoIndex.id === repo.id) 

    const validRepo = repos.find(repoIndex => repoIndex.id === foundRepo.id) 

    if (validRepo) {
      this.props.removeFromFavs(foundRepo, id, i)
    } else {
      this.props.removeFavOnly(id)
    }
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
            <Favourite repo={repo} key={repo.id} removeFromFavs={() => this.removeFromFavs(repo)} />
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

export default connect(mapStateToProps, { removeFromFavs, removeFavOnly })(Favourites)
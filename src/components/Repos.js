import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToFavs } from '../actions/reposActions'
import Repo from './Repo'

class Repos extends Component {
  addToFavs = repo => {
    const { repos } = this.props
    const i = repos.findIndex(repoIndex => repoIndex.id === repo.id)

    this.props.addToFavs(repo, i)
  }

  render() {
    const { repos } = this.props

    return (
      <div>
        {repos.map(repo => (
          <Repo repo={repo} addToFavs={() => this.addToFavs(repo)} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ repos }) => ({
  repos: repos.repos
})

export default connect(mapStateToProps, { addToFavs })(Repos)
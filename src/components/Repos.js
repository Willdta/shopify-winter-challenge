import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToFavs } from '../actions/reposActions'
import Repo from './Repo'
import '../styles/labels.css'

class Repos extends Component {
  addToFavs = repo => {
    const { repos } = this.props
    const i = repos.findIndex(repoIndex => repoIndex.id === repo.id)

    this.props.addToFavs(repo, i)
  }

  render() {
    const { repos } = this.props

    return (
      <section>
        <div className="repo-labels labels">
          <h5 className="label-font">Name</h5>
          <h5 className="label-font">Language</h5>
          <h5 className="label-font">Latest Tag</h5>          
        </div>

        {repos.map(repo => (
          <Repo repo={repo} key={repo.id} addToFavs={() => this.addToFavs(repo)} />
        ))}
      </section>
    )
  }
}

const mapStateToProps = ({ repos }) => ({
  repos: repos.repos
})

export default connect(mapStateToProps, { addToFavs })(Repos)
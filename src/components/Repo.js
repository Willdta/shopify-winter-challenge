import React from 'react'
import '../styles/api-data.css'

const Repo = ({ repo , addToFavs }) => (
  <div className="repo-data">
    <a className="data-font" href={repo.html_url}>{repo.full_name}</a>
    <p className="data-font">{repo.language}</p>
    {repo.latest_tag ? <p className="data-font">{repo.latest_tag}</p> : <p className="data-font">-</p>}
    {repo.isFavourite ? <p className="placeholder">add</p> : <p className="data-font" onClick={addToFavs}>Add</p>}
  </div>
)

export default Repo
import React from 'react'
import '../styles/api-data.css'

const Favourite = ({ repo, removeFromFavs }) => (
  <div key={repo.id} className="repo-data">
    <a className="data-font" href={repo.html_url}>{repo.full_name}</a>
    <p className="data-font">{repo.language}</p>
    {repo.latest_tag ? <p className="data-font">{repo.latest_tag}</p> : <p className="data-font">-</p>}
    <p className="data-font" onClick={removeFromFavs}>Remove</p>
  </div>
)

export default Favourite
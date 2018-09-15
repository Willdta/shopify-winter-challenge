import React from 'react'

const Repo = ({ repo , addToFavs }) => (
  <div key={repo.id} className="repo-data">
    <a className="data-font" href={repo.html_url}>{repo.full_name}</a>
    <p className="data-font">{repo.language}</p>
    {repo.latest_tag ? <p className="data-font">{repo.latest_tag}</p> : <p className="data-font">-</p>}
    {repo.isFavourite ? <p className="placeholder">add</p> : <p className="data-font" onClick={addToFavs}>Add</p>}
  </div>
)

export default Repo
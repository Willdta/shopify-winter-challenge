import { FETCH_REPOS, ADD_TO_FAVS, RESET_SEARCH } from './types'

export const fetchRepos = searchTerm => async dispatch => {
  const response = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}&per_page=10&access_token=${process.env.REACT_APP_TOKEN}`)
  const data = await response.json()

  const repos = data.items.map(async item => {
    const {
      id,
      full_name,
      html_url,
      language
    } = item
    const obj = {
      id,
      full_name,
      html_url,
      language,
      isFavourite: false
    }

    const tagResponse = await fetch(`https://api.github.com/repos/${full_name}/tags`)
    const tagData = await tagResponse.json()

    if (tagData[0] && tagData[0].name) {
      obj.latest_tag = tagData[0].name
    }

    return obj
  })

  Promise.all(repos).then(repos => {
    dispatch({
      type: FETCH_REPOS,
      payload: repos
    })
  })
}

export const addToFavs = (repo, i) => dispatch => (
  dispatch({
    type: ADD_TO_FAVS,
    payload: { repo, i }
  })
)

export const resetSearch = () => dispatch => (
  dispatch({
    type: RESET_SEARCH
  })
)
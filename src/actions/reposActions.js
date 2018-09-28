import { FETCH_REPOS, ADD_TO_FAVS, REMOVE_FROM_FAVS, REMOVE_FAV_ONLY, RESET_SEARCH } from './types'

export const fetchRepos = searchTerm => async dispatch => {
  try {
    const initialResponse = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}&per_page=10&access_token=${process.env.REACT_APP_TOKEN}`)
    const initialData = await initialResponse.json()
    
    const repos = initialData.items.map(async item => {
      try {
        const {
          id,
          full_name,
          html_url,
          language
        } = item  
    
        const repoData = {
          id,
          full_name,
          html_url,
          language,
          isFavourite: false
        }
        
        const tagResponse = await fetch(`https://api.github.com/repos/${full_name}/tags`)        
        const tagData = await tagResponse.json()
    
        if (tagData[0] && tagData[0].name) {
          repoData.latest_tag = tagData[0].name
        }
    
        return repoData
      } catch (error) {
        return error
      }
    })
    
    const finalResponse = await Promise.all(repos)
    const finalData = await finalResponse

    dispatch({
      type: FETCH_REPOS,
      payload: finalData
    })
  } catch (error) {
    return error
  }
}

export const addToFavs = (repo, i) => dispatch => (
  dispatch({
    type: ADD_TO_FAVS,
    payload: { repo, i }
  })
)

export const removeFromFavs = (foundRepo, id, i) => dispatch => (
  dispatch({
    type: REMOVE_FROM_FAVS,
    payload: { foundRepo, id, i }
  })
)

export const removeFavOnly = id => dispatch => (
  dispatch({
    type: REMOVE_FAV_ONLY,
    payload: id
  })
)

export const resetSearch = () => dispatch => (
  dispatch({
    type: RESET_SEARCH
  })
)
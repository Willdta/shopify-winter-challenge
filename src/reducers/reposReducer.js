import { FETCH_REPOS, ADD_TO_FAVS } from '../actions/types'

const initialState = {
  repos: [],
  favourites: []
}

export default (state = initialState, action) =>  {
  switch (action.type) {
    case FETCH_REPOS:
      return {
        ...state,
        repos: action.payload
      }
      
    case ADD_TO_FAVS:
      return {
        ...state,
        repos: [
          ...state.repos.slice(0, action.payload.i),
          { ...action.payload.repo, isFavourite: true },
          ...state.repos.slice(action.payload.i + 1)
        ],
        favourites: [...state.favourites, { ...action.payload.repo }]
      }
      
    default:
      return state
  } 
}
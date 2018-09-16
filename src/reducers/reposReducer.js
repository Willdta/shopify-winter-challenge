import { FETCH_REPOS, ADD_TO_FAVS, REMOVE_FROM_FAVS,REMOVE_FAV_ONLY, RESET_SEARCH } from '../actions/types'

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
      
    case REMOVE_FROM_FAVS:
      return {
        ...state,
        favourites: state.favourites.filter(repo => repo.id !== action.payload.id),
        repos: [
          ...state.repos.slice(0, action.payload.i),
          { ...action.payload.foundRepo, isFavourite: false },
          ...state.repos.slice(action.payload.i + 1)
        ]
      }
      
    case REMOVE_FAV_ONLY: 
      return {
        ...state,
        favourites: state.favourites.filter(repo => repo.id !== action.payload)
      }

    case RESET_SEARCH:
      return {
        ...state,
        repos: [],
        // favourites: []
      }

    default:
      return state
  } 
}
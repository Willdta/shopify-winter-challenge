import { FETCH_REPOS } from '../actions/types'

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
      
    default:
      return state
  } 
}
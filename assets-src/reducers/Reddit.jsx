import {types} from 'actions'

export const redditReducer = (action) => (state) =>
{
  switch(action.type)
  {
    case types.REQUEST_REDDIT_THREADS:  return requestRedditThreadReducer(action, state)
    case types.RECEIVE_REDDIT_THREADS:  return receiveRedditThreadReducer(action, state)
    case types.ERROR_REDDIT_THREADS:    return errorRedditThreadReducer(action, state)
    default:                            return {...state}
  }
}

const requestRedditThreadReducer = (action, state) => ({
  // Set reddit collection to 'updating' state
  ...state,
  reddit: {
    ...state.reddit,
    updating: true,
  }
})

const receiveRedditThreadReducer = (action, state) => ({
  ...state,
  reddit: {
    ...state.reddit,
    updating: false,
    threads: action.threads, // Stomp old threads for now
  }
})

const errorRedditThreadReducer = (action, state) => ({
  // Set reddit collection to 'not-updating' state
  ...state,
  reddit: {
    ...state.reddit,
    updating: false,
  }
})
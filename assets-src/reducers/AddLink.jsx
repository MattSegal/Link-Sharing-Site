import {types} from 'actions'

export const addLinkReducer = (action) => (state) =>
{
  switch(action.type)
  {
    case types.REQUEST_ADD_LINK:    return requestAddLinkReducer(action, state)
    case types.RECEIVE_ADD_LINK:    return receiveAddLinkReducer(action, state)
    case types.ERROR_ADD_LINK:      return errorAddLinkReducer(action, state)
    default: return {...state}
  }
}
    
const requestAddLinkReducer = (action, state) =>  ({
  // Set link collection to 'updating' state
  ...state,
  links: {
    ...state.links,
    updating: true,
  }
})

const receiveAddLinkReducer = (action, state) => ({
  // Add link to list
  // Set link collection to 'not-updating' state
  ...state,
  links: {
    ...state.links,
    items: [...state.links.items, ensureScheme(action.link)],
    updating: false,
  }
})

const errorAddLinkReducer = (action, state) => ({
  // Set link collection to 'not-updating' state
  ...state,
  links: {
    ...state.links,
    updating: false,
  }
})

const HTTP = 'http://'
const HTTPS = 'https://'

const ensureScheme = link => {
  let url = link.url.trim()
  if (!url.startsWith(HTTP) || !url.startsWith(HTTPS)) {
    url = HTTP + url
  }
  link.url = url
  return link
} 
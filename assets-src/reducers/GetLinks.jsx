import {types} from 'actions'
import {pipe, setupLinkState} from 'utilities'
import {CLOSED} from 'constants'
import {closeAll} from 'utilities'


const getLinksReducer = (action) => (state) =>
{
    switch(action.type)
    {
        case types.REQUEST_LINKS:    return requestLinksReducer(action, state)
        case types.RECEIVE_LINKS:    return receiveLinksReducer(action, state)
        default:                     return {...state}
    }
}

const requestLinksReducer = (action, state) => ({
    ...state,
    links: {
        ...state.links,
        isFetching: true,
    }
})

const receiveLinksReducer = (action, state) => ({
    ...state,
    links: {
        ...state.links,
        items: action.links.map(link => ({...link, status: closeAll(link.status)})),
        isFetching: false,
    }
})

module.exports = {
    getLinksReducer,
}
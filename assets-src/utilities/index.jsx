import {NO_USER_SELECTED, OPEN, CLOSED, INACTIVE} from 'constants'

// Lets us use pipe syntax eg. pipe(f,g,h)(x)
const _pipe = (f, g) => (...args) => g(f(...args))
const pipe = (...fns) => fns.reduce(_pipe)

const setupState = (state) => ({
    ...state,
    currentUser: state.currentUser ? state.currentUser : {id: NO_USER_SELECTED},
    links: setupLinkState(state.links),
    users: setupUserState(state.users),
})

const setupLinkState = (links) => ({
    ...links,
    add: CLOSED,
    items: links.items.map(link =>
        ({
            ...link, 
            status: {edit: CLOSED, delete: CLOSED, details: CLOSED},
            bookmark: INACTIVE
        })
    ),
})

const setupUserState = (users) => ({
    ...users,
    activeUserId: NO_USER_SELECTED,
})

const getTimeSince = (date) => 
{
    var seconds = Math.floor((new Date() - new Date(date)) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) { return interval + " years" }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) { return interval + " months" }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) { return interval + " days" }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) { return interval + " hours" }
    interval = Math.floor(seconds / 60);
    if (interval > 1) { return interval + " minutes" }
    return Math.floor(seconds) + " seconds";
}

const closeAll = (status) => {
    var newStatus = {...status}
    Object.keys(newStatus).forEach(k => newStatus[k] = CLOSED)
    return newStatus
}
const closeAllExcept = (status, exceptKey, exceptStatus) => {
    var newStatus = {...status}
    Object.keys(newStatus).forEach(k => 
        k === exceptKey
        ? newStatus[k] = exceptStatus
        : newStatus[k] = CLOSED
    )
    return newStatus
}

module.exports = {
    pipe,
    setupState,
    getTimeSince,
    closeAll,
    closeAllExcept,
}
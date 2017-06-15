import axios from 'axios'
import Cookies from 'js-cookie'
import {types} from './types'
import {handleHttpError} from './utils'

export const fetchRedditThreads = (users) => (dispatch) => {
    const userString = users.reduce((acc, val) => acc ? `${acc},${val}` : val, '')
    dispatch(requestRedditThreads())
    return axios.get(`../api/reddit/threads?users=${userString}`)
        .then( response => response.data)
        .then( threads => dispatch(receiveRedditThreads(threads)))
        .catch( error => handleHttpError('Fetch Reddit Threads', error, fetchError))
}

export const requestRedditThreads = () => ({
    type: types.REQUEST_REDDIT_THREADS,
})

export const receiveRedditThreads = (threads) => ({
    type: types.RECEIVE_REDDIT_THREADS,
    threads: threads
})

export const fetchError = () => ({
    type: types.ERROR_REDDIT_THREADS,
})
// @flow
import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import {
  FaBook,
  FaLink,
  FaPlus,
  FaSyncAlt,
  FaCog,
  FaSearch,
} from 'react-icons/fa'
import styled from 'styled-components'

import { actions } from 'state'
import { Spinner } from './spinner'

const TITLE_ROUTES = [
  { path: '/search', text: 'Search' },
  { path: '/account', text: 'Account' },
  { path: '/bookmarks', text: 'Bookmarks' },
  { path: '/', text: 'Links' },
]

export const Header = () => {
  const dispatch = useDispatch()
  const fetchLinks = () => dispatch(actions.fetchLinks())
  const updating = useSelector(({ links }) => links.updating, shallowEqual)
  const isLoggedIn = useSelector(
    ({ loggedInUser }) => Boolean(loggedInUser),
    shallowEqual
  )
  return (
    <HeaderEl>
      <HeaderContentEl>
        <GroupEl>
          <Switch>
            {TITLE_ROUTES.map(r => (
              <Route path={r.path} key={r.path}>
                <Link to="/">
                  <h1>{r.text}</h1>
                </Link>
              </Route>
            ))}
          </Switch>
        </GroupEl>
        <GroupEl>
          <Route path="/(account|bookmarks|search)">
            <Link title="Links" to="/">
              <HeaderIcon Icon={FaLink} />
            </Link>
          </Route>
          {isLoggedIn && !updating && (
            <Route exact path="/">
              <Link title="Add New Link" to="/add">
                <HeaderIcon Icon={FaPlus} />
              </Link>
            </Route>
          )}
          {!updating && (
            <Route exact path="/">
              <HeaderIcon
                Icon={FaSyncAlt}
                title="Reload Links"
                onClick={fetchLinks}
              />
            </Route>
          )}
          {isLoggedIn && (
            <Link title="Bookmarks" to="/bookmarks">
              <HeaderIcon Icon={FaBook} />
            </Link>
          )}

          <Link title="Search" to="/search">
            <HeaderIcon Icon={FaSearch} />
          </Link>
          <Link title="Account" to="/account">
            <HeaderIcon Icon={FaCog} />
          </Link>
        </GroupEl>
      </HeaderContentEl>
    </HeaderEl>
  )
}

const HeaderIcon = ({ Icon, ...props }) => (
  <ButtonEl>
    <Icon {...props} />
  </ButtonEl>
)

const HeaderEl = styled.header`
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
  padding: 0 1em;
  user-select: none;
  h1 {
    display: inline-block;
    font-size: 1.5em;
    color: #333;
  }
`
const HeaderContentEl = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`

const GroupEl = styled.div`
  display: flex;
  align-items: center;
`

const ButtonEl = styled.div`
  font-size: 1.2em;
  min-width: 2.2em;
  cursor: pointer;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  height: 20px;
  color: #333;
`

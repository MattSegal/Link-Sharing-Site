//@flow
import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaBookmark } from 'react-icons/fa'
import styled from 'styled-components'

import { actions } from 'state'
import { HyperLink, Content } from 'comps'

export const BookmarkListContainer = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ loggedInUser }) => loggedInUser, shallowEqual)
  const removeBookmark = link => dispatch(actions.removeBookmark(link))
  const bookmarks = user.bookmarks.sort(sortByDate)
  if (bookmarks.length > 0) {
    return (
      <Content>
        {bookmarks.map(link => (
          <HyperLink key={link.id} link={link}>
            <div className="button" onClick={() => removeBookmark(link)}>
              <FaBookmark />
            </div>
          </HyperLink>
        ))}
      </Content>
    )
  } else {
    return <p>No bookmarks</p>
  }
}

const sortByDate = (link1, link2) =>
  new Date(link2.created) - new Date(link1.created)

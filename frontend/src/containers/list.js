//@flow
import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Waypoint } from 'react-waypoint'
import { Link } from 'react-router-dom'
import { MdEdit } from 'react-icons/md'
import { FaEllipsisH } from 'react-icons/fa'
import styled from 'styled-components'

import { actions } from 'state'
import { NO_USER_SELECTED } from 'consts'
import { Spinner, HyperLink, Content } from 'comps'

const style = {}
const linkStyle = {}

export const LinkListContainer = () => {
  const dispatch = useDispatch()
  const next = useSelector(({ links }) => links.next, shallowEqual)
  const links = useSelector(({ links }) => links.items, shallowEqual)
  const user = useSelector(({ loggedInUser }) => loggedInUser, shallowEqual)
  return (
    <Content>
      {links.map(link => (
        <HyperLink key={link.id} link={link}>
          <LinkOptions link={link} user={user} />
        </HyperLink>
      ))}
      {next && (
        <SpinnerWrapperEl>
          <Spinner size={70} />
        </SpinnerWrapperEl>
      )}
      <Waypoint
        onEnter={() => dispatch(actions.scrollLinksBottom())}
        topOffset="400px"
      />
    </Content>
  )
}

const LinkOptions = ({ link, user }) => {
  const hasViewOption = user || link.description
  const hasEditOption = user && link.user === user.id
  if (hasViewOption) {
    return (
      <Link to={`/link/${link.id}`} title="View" className="button">
        <FaEllipsisH />
      </Link>
    )
  } else if (hasEditOption) {
    return (
      <Link to={`/link/${link.id}`} title="Edit or View" className="button">
        <MdEdit />
      </Link>
    )
  } else {
    return null
  }
}
const SpinnerWrapperEl = styled.div`
  display: flex;
  justify-content: center;
`

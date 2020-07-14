//@flow
import React, { useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Waypoint } from 'react-waypoint'
import { MdEdit } from 'react-icons/md'
import { FaEllipsisH } from 'react-icons/fa'
import styled from 'styled-components'

import { actions } from 'state'
import { NO_USER_SELECTED } from 'consts'
import { Spinner, HyperLink, Content } from 'comps'

import { LinkDetailsContainer } from './link-details'

export const LinkListContainer = () => {
  const dispatch = useDispatch()
  const next = useSelector(({ links }) => links.next, shallowEqual)
  const links = useSelector(({ links }) => links.items, shallowEqual)
  const user = useSelector(({ loggedInUser }) => loggedInUser, shallowEqual)
  return (
    <Content>
      {links.map(link => (
        <ListItem key={link.id} link={link} user={user} />
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

const ListItem = ({ link, user }) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <div key={link.id}>
      <HyperLink key={link.id} link={link}>
        <LinkOptions link={link} user={user} onClick={() => setOpen(o => !o)} />
      </HyperLink>
      {isOpen && (
        <LinkDetailsContainer link={link} user={user} onClose={() => {}} />
      )}
    </div>
  )
}

const LinkOptions = ({ link, user, onClick }) => {
  const hasViewOption = link.description
  const hasEditOption = user && link.username === user.username
  if (hasEditOption) {
    return <MdEdit onClick={onClick} />
  } else if (hasViewOption) {
    return <FaEllipsisH onClick={onClick} />
  } else {
    return null
  }
}
const SpinnerWrapperEl = styled.div`
  display: flex;
  justify-content: center;
`

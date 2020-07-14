//@flow
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import { actions } from 'state'
import { Spinner, Button, LinkForm } from 'comps'

type Props = {
  link: any,
  user: any,
  onClose: () => void,
}

export const LinkDetailsContainer = ({ link, user, onClose }: Props) => {
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const onEditClick = () => setIsEdit(true)
  const onCancel = () => setIsEdit(false)
  const onDeleteClick = () => actions.deleteLink({ ...link })(dispatch)
  const onSubmit = (title, url, description) => {
    setIsEdit(false)
    const newLink = { ...link, user_id: user.id, title, url, description }
    actions.editLink(newLink)(dispatch)
  }
  if (!isEdit) {
    const isLinkOwner = user.username === link.username
    return (
      <DetailsBox>
        {link.description && (
          <Description>{parseDescription(link.description)}</Description>
        )}
        {isLinkOwner && (
          <ButtonBox>
            <Button onClick={onEditClick}>Edit</Button>
            <Button onClick={onDeleteClick}>Delete</Button>
          </ButtonBox>
        )}
      </DetailsBox>
    )
  } else {
    return (
      <DetailsBox>
        {link.description && (
          <Description>{parseDescription(link.description)}</Description>
        )}
        <LinkForm onSubmit={onSubmit} onCancel={onCancel} defaults={link} />
      </DetailsBox>
    )
  }
}

const DetailsBox = styled.div`
  box-sizing: border-box;
  border: 1px solid #333;
  padding: 1rem;
  margin-top: -1.5em;
  margin-bottom: 2em;
`

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`

const Description = styled.div`
  font-style: italic;
  overflow-wrap: break-word;
  margin-bottom: 1rem;
`

const parseDescription = (desc: string) => {
  return desc.split('\n').map((str, idx) => (
    <span key={idx}>
      {str.split(' ').map((s, i) => {
        if (s.match(new RegExp('https?://'))) {
          return (
            <a href={s} key={i} target="_blank" rel="noopener noreferrer">
              {s}{' '}
            </a>
          )
        } else {
          return `${s} `
        }
      })}
      <br />
    </span>
  ))
}

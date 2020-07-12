//@flow
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import { actions } from 'state'
import { Spinner, HyperLink, Content, Button } from 'comps'

export const LinkDetailsContainer = () => {
  let { linkId } = useParams()
  const links = useSelector(({ links }) => links.items, shallowEqual)
  const link = links.filter(l => l.id == linkId).pop()
  if (!link) return null
  return (
    <Content>
      <HyperLink link={link} />
      <Description>{parseDescription(link.description)}</Description>
    </Content>
  )
}

const Description = styled.div`
  font-style: italic;
  overflow-wrap: break-word;
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

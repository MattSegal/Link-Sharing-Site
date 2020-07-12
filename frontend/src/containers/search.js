// @flow
import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import { actions } from 'state'
import { debounce } from 'utilities'
import { HyperLink, Content } from 'comps'

const searchDebounce = debounce(300)

export const SearchContainer = () => {
  const dispatch = useDispatch()
  const searchLinks = query => {
    if (query.length > 2) {
      dispatch(actions.searchLinks(query))
    }
  }
  const handleInput = e => searchDebounce(searchLinks)(e.target.value)
  const { items, updating } = useSelector(({ search }) => search, shallowEqual)
  return (
    <Content>
      <InputBoxEl>
        <input type="text" onChange={handleInput} placeholder="Search links" />
        <div className="status">{updating && 'Searching...'}</div>
      </InputBoxEl>
      {items.length > 0 &&
        items.map(link => <HyperLink key={link.id} link={link} />)}
    </Content>
  )
}

const SearchListEl = styled.ul`
  padding: 0;
  list-style: none;
`

const InputBoxEl = styled.div`
  margin-bottom: 1rem;

  input {
    padding: 0.4rem;
    width: 260px;
    font-size: 1.2rem;
    border: 1px solid #ccc;
    margin-bottom: 0.2rem;
  }

  .status {
    height: 20px;
    color: $text-grey;
  }
`

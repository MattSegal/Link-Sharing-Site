//@flow
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import { actions } from 'state'
import { LinkForm, Content } from 'comps'

const FORM_DEFAULTS = {
  title: '',
  url: '',
  description: '',
}

export const LinkCreateContainer = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onSubmit = (title, url, description) => {
    actions
      .addLink({ title, url, description })(dispatch)
      .then(() => history.push('/'))
  }
  return (
    <Content>
      <LinkForm onSubmit={onSubmit} defaults={FORM_DEFAULTS} />
    </Content>
  )
}

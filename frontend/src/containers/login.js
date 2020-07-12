// @flow
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import { actions } from 'state'
import { Content, Input, Button } from 'comps'
import api from 'state/api'

export const LoginContainer = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [messages, setMessages] = useState([])
  const onUsernameChange = e => setUsername(e.target.value)
  const onPasswordChange = e => setPassword(e.target.value)
  const tryLogin = () => {
    setMessages([])
    actions.login(username, password)
    api.auth
      .login(username, password)
      .then(() => {
        dispatch(actions.login())
        history.push('/')
      })
      .catch(e => {
        if (e.response.status === 400) {
          const msgs = Object.keys(e.response.data).map(
            k => `${k}: ${e.response.data[k]}`
          )
          setMessages(msgs)
        } else if (e.response.status === 401) {
          setMessages(['user/password combo not found'])
        } else {
          throw e
        }
      })
  }
  return (
    <Content>
      <form onSubmit={e => e.preventDefault()}>
        <div>
          <Input
            type="text"
            value={username}
            onChange={onUsernameChange}
            placeholder="Enter your username"
          />
          <Input
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Enter your password"
          />
        </div>
        <Button type="submit" onClick={tryLogin}>
          Submit
        </Button>
      </form>
      {messages.map(m => (
        <MessageEl key={m}>{m}</MessageEl>
      ))}
    </Content>
  )
}

const MessageEl = styled.p`
  color: red;
`

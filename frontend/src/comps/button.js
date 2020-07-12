// @flow
import React from 'react'
import styled from 'styled-components'

export const Button = styled.button`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 0;
  border: 1px solid #333;
  cursor: pointer;
  & + button {
    margin-left: 0.5rem;
  }
`

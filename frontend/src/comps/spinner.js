// @flow
import React from 'react'
import { SPINNER_URL } from 'consts'

type Props = {
  size: number,
}

export const Spinner = ({ size }: Props) => (
  <img src={SPINNER_URL} width={size} height={size} />
)

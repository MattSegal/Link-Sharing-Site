//@flow
import React, { useState } from 'react'
import { Input, Button, Textarea } from 'comps'
import styled from 'styled-components'

type Props = {
  onSubmit: (string, string, string) => void,
  onCancel?: () => void,
  defaults: {
    title: string,
    url: string,
    description: string,
  },
}

export const LinkForm = ({ onSubmit, onCancel, defaults }: Props) => {
  const [title, setTitle] = useState(defaults.title)
  const [url, setUrl] = useState(defaults.url)
  const [description, setDescription] = useState(defaults.description)
  const onTitleChange = e => setTitle(e.target.value)
  const onUrlChange = e => setUrl(e.target.value)
  const onDescChange = e => setDescription(e.target.value)
  const onFormSubmit = e => {
    e.preventDefault()
    onSubmit(title, url, description)
  }
  const isSubmit = title && url
  return (
    <div>
      <div>
        <Input
          autoFocus
          type="text"
          value={title}
          onChange={onTitleChange}
          placeholder="My Cool Link"
        />
        <Input
          type="text"
          value={url}
          onChange={onUrlChange}
          placeholder="https://example.com"
        />
        <Textarea
          type="text"
          rows="6"
          placeholder="Description (Optional)"
          value={description}
          onChange={onDescChange}
        />
      </div>
      <ButtonBox>
        <Button disabled={!isSubmit} onClick={onFormSubmit}>
          Submit
        </Button>
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
      </ButtonBox>
    </div>
  )
}

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`

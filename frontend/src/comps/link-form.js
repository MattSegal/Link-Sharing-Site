//@flow
import React, { useState } from 'react'
import { Input, Button, Textarea } from 'comps'
import styled from 'styled-components'

type Props = {
  onSubmit: (string, string, string) => void,
  onCancel?: () => void,
}

export const LinkForm = ({ onSubmit, onCancel }: Props) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
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
          rows="3"
          placeholder="Description (Optional)"
          value={description}
          onChange={onDescChange}
        />
      </div>
      <Button disabled={!isSubmit} onClick={onFormSubmit}>
        Submit
      </Button>
      {onCancel && <Button onClick={onCancel}>Cancel</Button>}
    </div>
  )
}

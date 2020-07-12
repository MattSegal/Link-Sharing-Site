// @flow
import * as React from 'react'

import { getTimeSince } from 'utilities'
import { Spinner } from './spinner'
import styled from 'styled-components'

type Link = {
  title: string,
  url: string,
  created: string,
  updating: boolean,
  username: string,
  description: string,
}

type Props = {
  link: Link,
  children?: React.Node,
}

export const HyperLink = ({ link, children }: Props) => {
  const timeAgo = getTimeSince(link.created) + ' ago'
  const domain = getDomain(link.url)
  const description = link.description ? '- description' : ''
  return (
    <LinkEl>
      <div className="left">
        <a
          className="hyperlink"
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.title}
        </a>
        <p className="details">
          {link.username} - {timeAgo} - {domain} {description}
        </p>
      </div>
      {link.updating ? (
        <span className="button">
          <Spinner size={10} />
        </span>
      ) : (
        children
      )}
    </LinkEl>
  )
}

const getDomain = url =>
  url
    .replace('http://', '')
    .replace('https://', '')
    .split(/[/?#]/)[0]
    .replace('www.', '')

const LinkEl = styled.li`
  display: flex;
  justify-content: space-between;
  font-family: sans-serif;
  margin-bottom: 2em;
  text-decoration: none;

  .left {
    display: inline-block;
    max-width: 90%;
  }

  .hyperlink {
    text-decoration: none;
    font-weight: bold;
    color: #38c;
    &:visited {
      color: #38c;
    }
  }

  .details {
    color: #888;
    font-size: x-small;
    margin: 0;
  }

  .linkFormContainer {
    padding: 1em;
    max-width: 800px;
    p {
      line-height: 1.3em;
    }
  }

  .button,
  a.button {
    font-size: 1.1em;
    cursor: pointer;
    color: #888;
    &:hover {
      color: #333;
    }
  }

  span.button {
    position: relative;
    width: 1.3em;
    height: 1.3em;

    .spinner {
      width: 100%;
      height: 100%;
      left: 63%;
    }
  }
`

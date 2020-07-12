//@flow
import React, { useEffect, useState } from 'react'
import { FaAngleUp } from 'react-icons/fa'
import styled from 'styled-components'

export const ScrollFooter = () => {
  const [isVisible, setIsVisible] = useState(false)
  const handleScroll = () => {
    if (window.pageYOffset > 200) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }
  const handleClick = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])
  if (isVisible) {
    return (
      <React.Fragment>
        <FooterEl>
          <ButtonEl onClick={handleClick}>
            <FaAngleUp />
          </ButtonEl>
        </FooterEl>
        <FooterPaddingEl />
      </React.Fragment>
    )
  }
  return null
}

const FooterPaddingEl = styled.div`
  width: 100%;
  height: 38px;
`

const FooterEl = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #fff;
`

const ButtonEl = styled.div`
  font-size: 20px;
  max-width: 60px;
  cursor: pointer;
  margin: 0 auto;
  text-align: center;
  padding: 4px 0 8px 0;
`

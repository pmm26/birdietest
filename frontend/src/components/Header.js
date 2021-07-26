
import React from "react";
import { ReactComponent as Logo } from '../assets/logo.svg';
import styled from 'styled-components'

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 150px;
`

const Header = (props) => {
  return (
    <HeaderDiv>
      <Logo style={LogoStyle} />
    </HeaderDiv>
  )
}

const LogoStyle = {
  width: '500px',
  height: '300px'
}

export default Header
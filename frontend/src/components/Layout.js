import React from "react";
import styled from "styled-components";
import Header from "./Header";

const LayoutBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`
const Footer = styled.div`
  height: 100px;
  width: 100%;
`

const Layout = (props) => {
  return (
    <LayoutBox>
      <Header />
      {props.children}
      <Footer />
    </ LayoutBox>
  );

}

export default Layout;

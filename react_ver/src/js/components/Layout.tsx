import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <Wrapper>
        <Header>
          <HeaderWrapper>
            <Home></Home>
            <Menu>
              <MenuItems>HUGA</MenuItems>
              <MenuItems>FOGE</MenuItems>
            </Menu>
          </HeaderWrapper>
        </Header>
        <Body>{children}</Body>
        <Footer></Footer>
      </Wrapper>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const Header = styled.header`
  width: 100%;
  margin: 0;
  padding: 20px 10px;
  background-color: #fff;
`;

const HeaderWrapper = styled.div`
  padding: 0 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Home = styled.div`
  flex: 1;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-image: url('img/ks.png');
  background-size: contain;
  background-repeat: no-repeat;
  list-style: none;
`;

const Menu = styled.ul`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  list-style: none;
`;

const MenuItems = styled.li`
  font-size: 1.2em;
  margin-left: 20px;
`;

const Body = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

const Footer = styled.footer``;

export default Layout;

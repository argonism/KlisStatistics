﻿import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';
import { Link } from 'react-router-dom';
import media from 'styled-media-query';

import { Path } from '../routes';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <Wrapper>
        <Header>
          <HeaderWrapper>
            <Home to={Path.home}></Home>
            <Menu>
              <MenuItems>
                <a href='https://github.com/argonism/KlisStatistics'>
                  <i className='fab fa-github-square'></i>
                </a>
              </MenuItems>
              {/* <MenuItems>
                <a href='http://klis.tsukuba.ac.jp/'>Klis</a>
              </MenuItems> */}
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

  a {
    color: #333;
    text-decoration: none;
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Header = styled.header`
  margin: 0;
  padding: 20px 10px;
  background-color: #fff;
`;

const HeaderWrapper = styled.div`
  width: 70%;
  ${media.lessThan('small')`
    width: 90%;
    padding: 0;
  `};
  margin: auto;
  padding: 0 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Home = styled(Link)`
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
  color: #333;

  & i {
    font-size: 31px;
  }
`;

const Body = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

const Footer = styled.footer``;

export default Layout;

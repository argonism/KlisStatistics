/* eslint-disable react/prop-types */
import React from 'react';
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
            <Home to={Path.home}>
              <HomeImg src={Path.home + 'img/ks.png'}></HomeImg>
            </Home>
            <Menu>
              <MenuItems>
                <MenuItem to={Path.howto}>{'About'}</MenuItem>
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
        <HeaderPlaceHolder></HeaderPlaceHolder>
        <Body>{children}</Body>
        <Footer></Footer>
      </Wrapper>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
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
  width: 100vw;
  position: fixed;

  border-bottom: 1px solid #ddd;
  z-index: 9;
`;

const HeaderPlaceHolder = styled.div`
  margin: 0;
  padding: 35px 0px;
  background-color: #fff;
`;

const HeaderWrapper = styled.div`
  width: 70%;
  max-width: 800px;
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
  /* background-image: url('img/ks.png'});
  background-size: contain;
  background-repeat: no-repeat; */
  list-style: none;
`;

const HomeImg = styled.img`
  height: 100%;
`;

const Menu = styled.ul`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  list-style: none;

  font-size: 1.2em;
  & i {
    font-size: 31px;
  }
  color: #333;
`;

const MenuItems = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-around;
  list-style: none;
`;

const MenuItem = styled(Link)`
  margin-right: 20px;
`;

const Body = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

const Footer = styled.footer``;

export default Layout;

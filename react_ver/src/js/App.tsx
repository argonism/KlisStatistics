import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import logo from '../logo.svg';
import '../App.css';

function App() {
  return (
    <>
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
        <Body>
          <InputArea>
            <TextInput></TextInput>
          </InputArea>
        </Body>
      </Wrapper>
    </>
  );
}

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
  background-image: url('img/klis_statistics_2.png');
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

const InputArea = styled.div`
  width: 100%;
  padding: 30px;
  background-color: #ddd;
`;

const TextInput = styled.input.attrs({
  type: 'text',
})`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  padding: 0.4em 0.8em;
  width: 60%;
  height: 2em;
  /* background-color: rgba(0, 0, 0, 0.08); */
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50px;
  color: inherit;
  font-family: inherit;
  font-size: 1em;
  text-align: center;

  &:focus {
    box-shadow: 0 0 5px 0 rgba(255, 153, 0, 1);
    outline: none;
  }
`;

export default App;

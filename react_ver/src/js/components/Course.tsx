import React from 'react';
import styled from 'styled-components';

const Course: React.FC = () => {
  return (
    <InputArea>
      <TextInput></TextInput>
    </InputArea>
  );
};

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
    box-shadow: 0 0 5px 0 rgba(0, 153, 153, 1);
    outline: none;
  }
`;

export default Course;

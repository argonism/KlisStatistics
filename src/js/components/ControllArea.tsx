import React, { useState } from 'react';
import styled from 'styled-components';

import SearchEvaluation from '../data/search/Evaluation';

export type ControllAreaProps = {
  onTypeChange: Function;
  onYearChange: Function;
};

const ControllArea = (props: ControllAreaProps) => {
  const [year, setYear] = useState('2018');
  return (
    <Wrapper>
      <ControllSelect
        onChange={e => {
          props.onYearChange(e.target.value);
          setYear(e.target.value);
        }}
        defaultValue='2018'
      >
        <ResourceOption value='2020'>2020</ResourceOption>
        <ResourceOption value='2019'>2019</ResourceOption>
        <ResourceOption value='2018'>2018</ResourceOption>
        <ResourceOption value='2017'>2017</ResourceOption>
        <ResourceOption value='2016'>2016</ResourceOption>
        <ResourceOption value='2015'>2015</ResourceOption>
        <ResourceOption value='2014'>2014</ResourceOption>
      </ControllSelect>

      <ControllSelect
        onChange={e => {
          props.onTypeChange(e.target.value);
        }}
      >
        <ResourceOption value='Distribution'>成績分布</ResourceOption>
        {SearchEvaluation[year] && <ResourceOption value='Evaluation'>授業評価</ResourceOption>}
      </ControllSelect>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333;
`;

const ControllSelect = styled.select`
  /* cssクリア */
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;

  margin: 5px 15px;
  padding: 5px 10px;
  font-size: 18px;
  text-align: center;
  /* border: 1px solid #aaa; */
  border-radius: 5px;
  color: #aaa;

  &:hover {
    background-color: #444;
    transition: all 0.2s linear 0s;
  }
`;

const ResourceOption = styled.option`
  font-size: 20px;
  text-align: center;
`;

export default ControllArea;

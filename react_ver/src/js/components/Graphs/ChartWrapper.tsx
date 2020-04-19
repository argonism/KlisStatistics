import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import media from 'styled-media-query';

import { DeleteGraph } from '../../actions/GraphActions';

type ChartWrapperProps = {
  width: string;
  height: string;
  children: JSX.Element;
  id: number;
};

const ChartWrapper: React.FC<ChartWrapperProps> = (props: ChartWrapperProps): JSX.Element => {
  const dispatch = useDispatch();

  const OnDelete = (key: number): void => {
    dispatch(DeleteGraph(key));
  };

  return (
    <Wrapper width={props.width} height={props.height}>
      <ChartDeleteButton onClick={_ => OnDelete(props.id)}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </ChartDeleteButton>
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ width: string; height: string }>`
  width: ${({ width }) => (width ? width : '300px')};
  height: ${({ height }) => (height ? height : '300px')};
  ${media.lessThan('small')`
    width: 90vw;
  `};
  border-radius: 50px;
  transition: all 0.15s linear 0s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }

  &:hover > button {
    color: #aaa;
  }
  position: relative;
`;

const ChartDeleteButton = styled.button`
  /* cssクリア */
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;

  font-size: 25px;
  position: absolute;
  top: 15px;
  right: 15px;
  border-radius: 5px;
  z-index: 5;
  transition: all 0.15s linear 0s;
  color: transparent;
`;

export type ChartProps = {
  width: string;
  height: string;
  data: Array<any>;
  title: string;
};

export default ChartWrapper;

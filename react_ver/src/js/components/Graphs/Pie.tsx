import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import styled from 'styled-components';

import ChartWrapper from './ChartWrapper';

export type PieProps = {
  width: string;
  height: string;
  data: Array<any>;
  title: string;
  studentCount: number;
  year: string;
  id: number;
};

const PieWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const CenterInfoArea = styled.div`
  width: calc(100% * 0.5 - 40px);
  height: calc(100% * 0.5 - 50px);
  position: absolute;

  /* 基準点を要素の中央にずらす */
  transform: translate(-50%, -50%);
  top: 48%;
  left: 50%;
  border-radius: 50%;
  color: #aaa;
  font-size: 16px;
  background-color: transparent;
  word-wrap: break-word;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const SubjectYear = styled.div``;
const SubjectTitle = styled.div`
  margin: 10px;
  text-align: center;
`;

const StudentCount = styled.div``;

const PieChart = (props: PieProps) => (
  <ChartWrapper width={props.width} height={props.height} id={props.id}>
    <PieWrapper>
      <CenterInfoArea>
        <SubjectYear>{props.year}</SubjectYear>
        <SubjectTitle>{props.title}</SubjectTitle>
        <StudentCount>履修者数: {props.studentCount}</StudentCount>
      </CenterInfoArea>
      <ResponsivePie
        data={props.data}
        margin={{ top: 40, right: 40, bottom: 60, left: 40 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={0}
        radialLabelsTextColor='#333333'
        radialLabelsLinkOffset={-5}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor='#333333'
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        isInteractive={true}
        defs={[
          {
            id: 'big_dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 14,
            padding: 1,
            stagger: true,
          },
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 7,
            padding: 1,
            stagger: true,
          },
          {
            id: 'big_lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 14,
            spacing: 30,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
          {
            id: 'squares',
            type: 'patternSquares',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'A+',
            },
            id: 'big_dots',
          },
          {
            match: {
              id: 'A',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'B',
            },
            id: 'squares',
          },
          {
            match: {
              id: 'C',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'D',
            },
            id: 'big_lines',
          },
        ]}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            translateX: 10,
            translateY: 56,
            itemWidth: 50,
            itemHeight: 18,
            itemTextColor: '#999',
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </PieWrapper>
  </ChartWrapper>
);

export default PieChart;

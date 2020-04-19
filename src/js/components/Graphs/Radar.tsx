import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';

import ChartWrapper from './ChartWrapper';

export type RadarProps = {
  width: string;
  height: string;
  data: Array<any>;
  keys: Array<string>;
  id: number;
};

const RaderChart = (props: RadarProps) => (
  <ChartWrapper width={props.width} height={props.height} id={props.id}>
    <ResponsiveRadar
      data={props.data}
      keys={['平均', ...props.keys]}
      indexBy='qIndex'
      maxValue={4}
      margin={{ top: 40, right: 40, bottom: 70, left: 40 }}
      curve='linearClosed'
      borderWidth={2}
      borderColor={{ from: 'color' }}
      gridLevels={5}
      gridShape='linear'
      gridLabelOffset={20}
      enableDots={true}
      dotSize={10}
      dotColor={{ from: 'color' }}
      dotBorderWidth={2}
      dotBorderColor={{ from: 'color' }}
      enableDotLabel={true}
      dotLabel='value'
      dotLabelYOffset={-12}
      colors={{ scheme: 'nivo' }}
      fillOpacity={0.25}
      blendMode='multiply'
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      isInteractive={true}
      tooltipFormat={(value, key) => {
        return value;
      }}
      legends={[
        {
          anchor: 'bottom-left',
          direction: 'row',
          translateX: 0,
          translateY: -60,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: '#999',
          symbolSize: 12,
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
  </ChartWrapper>
);

export default RaderChart;

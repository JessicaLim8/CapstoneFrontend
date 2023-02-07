import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { contentQuotesLinter } from '@ant-design/cssinjs/lib/linters';

function createData(unformattedData) {
    const trendData = unformattedData.data.map(remap);
    console.log(trendData);
    return trendData;
}

function remap(force) {
    return {force};
}

export default function DetailedChart(props) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>
        {props.data.exercise} on {props.data.date}
      </Title>
      <ResponsiveContainer>
        <LineChart
          data={createData(props.data)}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Force (N)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="force"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

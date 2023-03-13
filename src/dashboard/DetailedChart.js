import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Title from './Title';
import { contentQuotesLinter } from '@ant-design/cssinjs/lib/linters';

function createData(unformattedData) {
    console.log("CRETE DATA")
    const trendData = unformattedData.data.map(remap);
    console.log(trendData)
    return trendData;
}

function remap(force) {
    return {force};
}

export default function DetailedChart(props) {
  const theme = useTheme();
  console.log(props)

  return (
    <React.Fragment>
      <Title>
        {props.left ? "Left" : "Right"} {props.exercise}
      </Title>
      <ResponsiveContainer>
        <LineChart
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
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
          <XAxis
            tick={false}
          />
          {props.right && 
            <Line
              data={createData(props.right)}
              isAnimationActive={false}
              type="monotone"
              datakey="force"
              stroke={theme.palette.primary.main}
              dot={false}
            />
          }
          {props.left && 
            <Line
              data={createData(props.left)}
              isAnimationActive={false}
              type="monotone"
              datakey="force"
              stroke={theme.palette.secondary.main}
              dot={false}
            />
          }
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

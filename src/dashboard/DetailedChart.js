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

const data1 = [ 
  { "force": 15 }, 
  { "force": 20 },
  { "force": 20 },
  { "force": 20 },
  { "force": 20 },
  { "force": 20 }
]

const data2 = [
  {
    "_id": "640e1c201d4999ef1daa2b89",
    "userId": "63e9465f72d20ccd12d7e316",
    "exerciseType": "plantarflexion",
    "side": "L",
    "max": 22,
    "avg": 21,
    "data": [
        10,
        17,
        15,
        18,
        13,
        15
    ],
    "date": "2023-03-12T18:38:24.544Z",
    "__v": 0
  },
  {
    "_id": "640e1c381d4999ef1daa2b8d",
    "userId": "63e9465f72d20ccd12d7e316",
    "exerciseType": "plantarflexion",
    "side": "L",
    "max": 19,
    "avg": 17,
    "data": [
        10,
        17,
        15,
        18,
        14,
        15
    ],
    "date": "2023-03-12T18:38:48.400Z",
    "__v": 0
}
]


export default function DetailedChart(props) {
  const theme = useTheme();
  console.log("this is props")
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
          {props.left != undefined && 
            <Line
              name="Left"
              data={createData(props.left)}
              isAnimationActive={false}
              type="monotone"
              dataKey={"force"}
              stroke={theme.palette.primary.main}
              dot={false}
            />
          }
          {props.right != undefined && 
            <Line
              name="Right"
              data={data2}
              isAnimationActive={false}
              type="monotone"
              datakey="max"
              stroke={theme.palette.primary.main}
              dot={false}
            />
          }
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

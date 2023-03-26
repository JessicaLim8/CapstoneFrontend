import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { add, format, differenceInCalendarDays, isFuture } from "date-fns";
import moment from 'moment';
import Title from './Title';

const dateFormatter = date => {
  return moment(date).format('DD/MM/YY');
};

const data = [
  {"avg": 21, "date": 10},
  {"avg": 21, "date": 12},
  {"avg": 21, "date": 16},
  {"avg": 21, "date": 10},
  {"avg": 21, "date": 10},
]

export default function TimeTrendLineChart(props) {
  const theme = useTheme();
  
  return (
    <React.Fragment>
      <Title>
        Trends: {props.exercise} {props.title}
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
          <XAxis
            dataKey={"date"}
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            tickFormatter={dateFormatter}

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
          <Tooltip 
            wrapperStyle={{fontSize: "1rem"}}
          />
          <Legend
            wrapperStyle={{fontSize: "1rem"}}
          />
          {props.left &&
            <Line
              name="Left"
              data={props.left}
              isAnimationActive={false}
              type="monotone"
              dataKey={props.dataKey}
              stroke={theme.palette.primary.main}
            />
          }
          {props.right &&
            <Line
              name="Right"
              data={props.right}
              isAnimationActive={false}
              type="monotone"
              dataKey={props.dataKey}
              stroke={theme.palette.secondary.main}
            />
          }
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

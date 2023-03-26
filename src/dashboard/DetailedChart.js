import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Title from './Title';
import Typography from '@mui/material/Typography';
import { add, format, differenceInCalendarDays, isFuture } from "date-fns";
import { contentQuotesLinter } from '@ant-design/cssinjs/lib/linters';

function createData(unformattedData) {
 if (unformattedData && unformattedData.data) {
    const trendData = unformattedData.data.map(remap);
    return trendData;
 }
 return unformattedData 
}

function remap(force) {
    return {force};
}

const dateFormatter = date => {
  const formatted = format(new Date(date), "MM/dd/yyyy");
  return formatted;
};

export default function DetailedChart(props) {
  const theme = useTheme();
  const leftProps = props.left && props.left.length !== 0;
  const rightProps = props.right && props.right.length !== 0;

  return (
    <React.Fragment>
      <Title>
        {leftProps ? "Left" : "Right"} {props.exercise}
      </Title>
      {props.showDate && 
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {leftProps ? dateFormatter(props.left.date) : rightProps ? dateFormatter(props.right.date) : "--"}
        </Typography>
      }
      {props.showSummary && 
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          Max Force: {leftProps ? props.left.max + "N"  : rightProps ? props.right.max + "N" : "--"}
        </Typography>
      }

      <ResponsiveContainer>
        <LineChart
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <Tooltip 
            wrapperStyle={{fontSize: "1rem"}}
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
          <XAxis
            tick={false}
          />
          { leftProps && 
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
          { rightProps && 
            <Line
              name="Right"
              data={createData(props.right)}
              isAnimationActive={false}
              type="monotone"
              dataKey={"force"}
              stroke={theme.palette.primary.main}
              dot={false}
            />
          }
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

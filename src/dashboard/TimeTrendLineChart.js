import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { add, format, differenceInCalendarDays, isFuture } from "date-fns";
import moment from 'moment';
import Title from './Title';

const dateFormatter = date => {
  return moment(date).format('DD/MM/YY');
};

const epochData = data => {
  if (!data || data.length == 0) return [];
  else {
    data.forEach(d => {
      d.date = moment(d.date).valueOf(); // date -> epoch
    });
    return data.sort(compare);
  }
}

function compare( a, b ) {
  if (!a || !b || !a.date || !b.date) return 0;
  if ( a.date < b.date ){
    return -1;
  }
  if ( a.date > b.date ){
    return 1;
  }
  return 0;
}

const calculateDomain = (leftData, rightData) => {
  let domainL, domainR;
  if (leftData && leftData.length !== 0) {
    domainL = [leftData[0].date, leftData[leftData.length - 1].date]

    if (rightData && rightData.length !== 0) {
      domainR =  [rightData[0].date, rightData[rightData.length - 1].date]
      const updatedDomain = [Math.min(domainL[0], domainR[0]), Math.max(domainL[1], domainR[1])];

      return updatedDomain;
    }

    return domainL;
  }
  if (rightData && rightData.length !== 0) {
    domainR =  [rightData[0].date, rightData[rightData.length - 1].date]
    return domainR;
  }
  return [];
}


export default function TimeTrendLineChart(props) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>
        Trends: {props.title} {props.exercise}
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
            domain={() => calculateDomain(props.left, props.right)}
            type="number"
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
              data={epochData(props.left)}
              isAnimationActive={false}
              type="monotone"
              dataKey={props.dataKey}
              stroke={theme.palette.primary.main}
            />
          }
          {props.right &&
            <Line
              name="Right"
              data={epochData(props.right)}
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

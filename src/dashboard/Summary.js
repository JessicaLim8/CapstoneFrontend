import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Title from './Title';
import {dataMax} from "./utilities";

function preventDefault(event) {
  event.preventDefault();
}

export default function Summary(props) {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography component="h6" variant="h6">
              Personal Details 
            </Typography>
            <Typography color="text.secondary" component="h6" variant="h6">
              Name: {props.user.firstName} {props.user.lastName}
            </Typography>
            <Typography color="text.secondary" component="h6" variant="h6">
              Sport: {props.user.sport}
            </Typography>
            <Typography color="text.secondary" component="h6" variant="h6">
              Year: {props.user.year}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="h6" variant="h6">
              Max Force Summary
            </Typography>
            <Grid container>
            <Grid item xs={6}>
              <Typography  component="h6" variant="h6">
                Left
              </Typography>
              <Typography color="text.secondary" component="h6" variant="h6">
                Week: {props.maxWeek && props.maxWeek.L ? dataMax(props.maxWeek.L) + " N" : "--"}
              </Typography>
              <Typography color="text.secondary" component="h6" variant="h6">
                Month: {props.maxMonth && props.maxMonth.L ? dataMax(props.maxMonth.L) + " N" : "--"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="h6" variant="h6">
                Right
              </Typography>
              <Typography color="text.secondary" component="h6" variant="h6">
                Week: {props.maxWeek && props.maxWeek && props.maxWeek.R ? dataMax(props.maxWeek.R) + " N" : "--"}
              </Typography>
              <Typography color="text.secondary" component="h6" variant="h6">
                Month: {props.maxMonth && props.maxMonth.R ? dataMax(props.maxMonth.R) + " N" : "--"}
              </Typography>
            </Grid>
            </Grid>
          </Grid>
      </Grid>
    </React.Fragment>
  );
}

import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Title from './Title';
import { dataMax, dataAvg } from "./utilities";

export default function TeamComparison(props) {
    return (
      <React.Fragment>
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography component="h6" variant="h6">
                Individual Max
              </Typography>
              <Grid container>
              <Grid item xs={6}>
                <Typography  component="h6" variant="h6">
                  Left
                </Typography>
                <Typography color="text.secondary" component="h6" variant="h6">
                  Week: {props.maxWeek && props.maxWeek.L ? dataMax(props.maxWeek.L) : "--"}
                </Typography>
                <Typography color="text.secondary" component="h6" variant="h6">
                  Month: {props.maxMonth && props.maxMonth.L ? dataMax(props.maxMonth.L) : "--"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component="h6" variant="h6">
                  Right
                </Typography>
                <Typography color="text.secondary" component="h6" variant="h6">
                  Week: {props.maxWeek && props.maxWeek && props.maxWeek.R ? dataMax(props.maxWeek.R) : "--"}
                </Typography>
                <Typography color="text.secondary" component="h6" variant="h6">
                  Month: {props.maxMonth && props.maxMonth.R ? dataMax(props.maxMonth.R) : "--"}
                </Typography>
              </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} md={4}>
              <Typography component="h6" variant="h6">
                Team Max
              </Typography>
              <Grid container>
              <Grid item xs={6}>
                <Typography  component="h6" variant="h6">
                  Left
                </Typography>
                <Typography color="text.secondary" component="h6" variant="h6">
                  Week: {props.teamWeek && props.teamWeek.L ? dataMax(props.teamWeek.L) : "--"}
                </Typography>
                <Typography color="text.secondary" component="h6" variant="h6">
                  Month: {props.teamMonth && props.teamMonth.L ? dataMax(props.teamMonth.L) : "--"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component="h6" variant="h6">
                  Right
                </Typography>
                <Typography color="text.secondary" component="h6" variant="h6">
                  Week: {props.teamWeek && props.teamWeek && props.teamWeek.R ? dataMax(props.teamWeek.R) : "--"}
                </Typography>
                <Typography color="text.secondary" component="h6" variant="h6">
                  Month: {props.teamMonth && props.teamMonth.R ? dataMax(props.teamMonth.R) : "--"}
                </Typography>
              </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} md={4}>
              <Typography component="h6" variant="h6">
                Team Avg
              </Typography>
              <Grid container>
              <Grid item xs={6}>
                <Typography  component="h6" variant="h6">
                  Left
                </Typography>
                <Typography color="text.secondary" component="h6" variant="h6">
                  Week: {props.teamWeek && props.teamWeek.L ? dataAvg(props.teamWeek.L) : "--"}
                </Typography>
                <Typography color="text.secondary" component="h6" variant="h6">
                  Month: {props.teamMonth && props.teamMonth.L ? dataAvg(props.teamMonth.L) : "--"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component="h6" variant="h6">
                  Right
                </Typography>
                <Typography color="text.secondary" component="h6" variant="h6">
                  Week: {props.teamWeek && props.teamWeek && props.teamWeek.R ? dataAvg(props.teamWeek.R) : "--"}
                </Typography>
                <Typography color="text.secondary" component="h6" variant="h6">
                  Month: {props.teamMonth && props.teamMonth.R ? dataAvg(props.teamMonth.R) : "--"}
                </Typography>
              </Grid>
              </Grid>
            </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  
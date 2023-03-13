import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Summary(props) {
  return (
    <React.Fragment>
      <Title>
        Last Attempt: Summary
      </Title>
      <Grid container spacing={3}>
        { props.left &&
          <Grid item xs={props.left && props.right ? 6 : 12}>
            <Typography component="p" variant="h6">
              Left
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Max Force
            </Typography>
            <Typography component="p" variant="h5">
              {props.left ? props.left.max + "N"  : "--"}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Avg Force
            </Typography>
            <Typography component="p" variant="h5">
              {props.left ? props.left.avg + "N" : "--"}
            </Typography>
          </Grid>
        }
        { props.right &&
          <Grid item xs={props.left && props.right ? 6 : 12}>
            <Typography component="p" variant="h6">
              Right
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Max Force
            </Typography>
            <Typography component="p" variant="h5">
              { props.right ? props.right.max + "N" : "--"}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Avg Force
            </Typography>
            <Typography component="p" variant="h5">
              {props.right ? props.right.avg + "N" : "--"}
            </Typography>
          </Grid>
        }
      </Grid>
    </React.Fragment>
  );
}

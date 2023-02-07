import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Summary(props) {
  return (
    <React.Fragment>
      <Title>Summary</Title>
      <Typography component="p" variant="h6">
        {props.exercise}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Max Force
      </Typography>
      <Typography component="p" variant="h5">
        {props.max}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Avg Force
      </Typography>
      <Typography component="p" variant="h5">
        {props.avg}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Details
        </Link>
      </div>
    </React.Fragment>
  );
}

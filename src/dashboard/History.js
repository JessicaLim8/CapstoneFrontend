import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Title from './Title';


function preventDefault(event) {
  event.preventDefault();
}

export default function History(props) {
  return (
    <React.Fragment>
      <Title>History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Max Value</TableCell>
            <TableCell>Average Value</TableCell>
            <TableCell>Exercise</TableCell>
            <TableCell align="right">Side</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Link color="primary" href="#" onClick={preventDefault} sx={{ m: 0, p: 0 }}>{row.date}</Link>
              </TableCell>
              <TableCell>{row.max} N</TableCell>
              <TableCell>{row.avg} N</TableCell>
              <TableCell>{row.exerciseType}</TableCell>
              <TableCell align="right">{row.side}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 2 }}>
        <Typography sx={{ flex: 1 }}>
            See more History
        </Typography>
      </Link>
    </React.Fragment>
  );
}

import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { DataGrid, useGridApiRef, gridFilteredSortedRowIdsSelector, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Toolbar from '@mui/material/Toolbar';
import Title from './Title';
import { add, format, differenceInCalendarDays, isFuture } from "date-fns";


function preventDefault(event) {
  event.preventDefault();
}

const dateFormatter = date => {
  const formatted = format(new Date(date), "MMM/dd/yyyy");
  return formatted;
};

const formatData = data => {
  if (data != undefined) {
    data.map(element => {
      element.date = dateFormatter(element.date)
    });
  }
  return data;
};

function CustomToolBar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const onRowsSelectionHandler = (ids, rows, setSelect) => {
  const selectedRowsData = ids.map((id) => rows.find((row) => row._id === id));
  setSelect(selectedRowsData)
};

const columns = [
  { field: 'date', headerName: 'Date', width: 200 },
  { field: 'max', headerName: 'Maximum', type: 'number', width: 100 },
  { field: 'avg', headerName: 'Average', type: 'number', width: 100, },
  { field: 'exerciseType', headerName: 'Exercise Type', width: 300, },
  { field: 'side', headerName: 'Side', width: 160 },
];

export default function History(props) {
  const apiRef = useGridApiRef();
  const data = formatData(props.data);

  return (
    <React.Fragment>
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row._id}
        components={{
          Toolbar: CustomToolBar,
        }}
        disableMultipleSelection
        onSelectionModelChange={(ids) => onRowsSelectionHandler(ids, data, props.setSelect)}
      />
      </div>
    </React.Fragment>
  );
}

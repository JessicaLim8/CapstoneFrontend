import React, { useState, useEffect, useParams } from 'react';
import axios from 'axios';
import Title from './Title';
import { Navigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const fetchUsers = (setUsers) => {
    const localURL = "http://localhost:3000/users";
    axios.get(localURL).then(data => {
        if (data.data.users) {
            setUsers(data.data.users)
        }
    });
}

const columns = [
    { field: 'firstName', headerName: 'First Name', width: 100 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'sport', headerName: 'Sport', width: 200 },
  ];

const onRowSelect = (row, setRowSelect) => {
    window.location.href = "/users/"+row.id;
};

function Users(props) {
    const [currentUsers, setUsers] = useState([]);
    const [rowSelect, setRowSelect] = useState(null)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = (event, reason) => 
    {
        if (reason && reason == "backdropClick") {
            return
        }
        setOpen(false)
    };

    useEffect(() => {
        // call an API and in the success or failure fill the data buy using setData function
        // it could be like below
        fetchUsers(setUsers);
      }, []);

    return (
        <div>
            <Title>Select Athlete</Title>
            {rowSelect ? 
                <Navigate to={"/users/"+rowSelect}/> 
                :
                <div style={{height: '500px', width: '100%', padding: "10px"}}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={currentUsers}
                        columns={columns}
                        onRowClick={props.onRowSelect ? props.onRowSelect : onRowSelect}
                    />
                </div>
            }
        </div>
    );
}

export default Users;
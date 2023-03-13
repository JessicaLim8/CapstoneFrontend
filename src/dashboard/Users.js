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
    { field: 'firstName', headerName: 'First Name'},
    { field: 'lastName', headerName: 'Last Name'},
    { field: 'sport', headerName: 'Sport'},
  ];

const onRowSelect = (row, setRowSelect) => {
    console.log(row.id)
    setRowSelect(row.id)
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Users(props) {
    const [currentUsers, setUsers] = useState([]);
    const [rowSelect, setRowSelect] = useState(null)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = (event, reason) => 
    {
        console.log(event)
        console.log(reason)
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
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                disableBackdropClick
            > 
                <Box sx={style}>
                    <IconButton onClick={() => handleClose()}>
                        <CloseIcon/>
                    </IconButton>
                    <Title>Select Athlete</Title>
                    {rowSelect ? 
                        <Navigate to={`/users/${rowSelect}`}/> :
                        <div style={{height: '500px', width: '100%', padding: "10px"}}>
                            <DataGrid
                                getRowId={(row) => row._id}
                                rows={currentUsers}
                                columns={columns}
                                onRowClick={(row) => onRowSelect(row, setRowSelect)}
                                width={700}
                            />
                        </div>
                    }
                </Box>
          </Modal>
        </div>
    );
}

export default Users;
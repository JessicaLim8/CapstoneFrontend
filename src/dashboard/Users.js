import React, { useState, useEffect, useParams } from 'react';
import axios from 'axios';
import Title from './Title';
import { Navigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";

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

function Users(props) {
    const [currentUsers, setUsers] = useState([]);
    const [rowSelect, setRowSelect] = useState(null)

    useEffect(() => {
        // call an API and in the success or failure fill the data buy using setData function
        // it could be like below
        fetchUsers(setUsers);
      }, []);

    console.log(rowSelect)

    return (
    <React.Fragment>
        <Title>Users</Title>
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
    </React.Fragment>
    );
}

export default Users;
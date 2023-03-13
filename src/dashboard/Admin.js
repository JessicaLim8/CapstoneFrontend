import React, { useState } from 'react';
import axios from 'axios';
import Title from './Title';
import { useResolvedPath } from 'react-router-dom';

const post = () => {
    const localURL = "http://localhost:3000/users";
    axios.get(localURL).then(data => {
        console.log(data)
        if (data.data) {
            this.setUsers(data.data)
        }
        console.log(this.state.currentUsers)
    });
}

function Admin(props) {
    return (
    <React.Fragment>
        <Title>Admin</Title>
    </React.Fragment>
    );
}

export default Admin;
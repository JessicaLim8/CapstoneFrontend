import './App.css';
import Admin from './dashboard/Admin'
import Users from './dashboard/Users'
import Dashboard from './dashboard/Dashboard';
import RecordData from './dashboard/RecordData';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { MyForm } from './components/MyForm';


export default function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route exact path='/' element={<Dashboard/>}></Route>
            <Route exact path='/admin' element={<Admin/>}></Route>
            <Route exact path='/users' element={<Dashboard/>}></Route>
            <Route path='/users/:userid' element={<Dashboard/>}></Route>
            <Route path='/record/:userid' element={<RecordData/>}></Route>
          </Routes>
        </header>
      </div>
    </Router>
  );
}
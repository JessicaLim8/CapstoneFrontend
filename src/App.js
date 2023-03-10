import './App.css';
import Admin from './dashboard/Admin'
import Users from './dashboard/Users'
import Dashboard from './dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route exact path='/' element={<Dashboard/>}></Route>
            <Route exact path='/admin' element={<Admin/>}></Route>
            <Route exact path='/users' element={<Users/>}></Route>
            <Route path='/users/:userid' element={<Dashboard/>}></Route>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;

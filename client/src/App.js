import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import CompareMutualFunds from './pages/CompareMutualFunds';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  const [signin, setSignin] = useState(false);
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage signin={signin} user={user}/>} />
        <Route path="/compare-mutual-funds" element={<CompareMutualFunds signin={signin} user={user}/>} />
        <Route path="/login" element={<Login setSignin={setSignin} setUser={setUser}/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

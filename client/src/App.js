import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './pages/HomePage';
import CompareMutualFunds from './pages/CompareMutualFunds';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import ForgotPassword from './pages/ForgotPassword';
import SIPCalculator from './pages/SIPCalculator';
import LumpSumCalculator from './pages/LumpSumCalculator';

function App() {
  // const [signin, setSignin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user data exists in local storage
    const storedUser = localStorage.getItem('user');
    console.log(storedUser);
    if (storedUser) {
      console.log("hii");
      setUser(JSON.parse(storedUser));
      // setSignin(true);
      // window.location.href = '/';
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage user={user} setUser={setUser}/>} />
        <Route path="/compare-mutual-funds" element={<CompareMutualFunds user={user} setUser={setUser}/>} />
        <Route path="/sip-calculator" element={<SIPCalculator user={user} setUser={setUser}/>} />
        <Route path="/lump-sum-calculator" element={<LumpSumCalculator user={user} setUser={setUser}/>} />
        <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

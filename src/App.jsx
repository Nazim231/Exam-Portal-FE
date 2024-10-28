import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Login from './components/Pages/Login';
import Signup from './components/Pages/Signup';
import Dashboard from '@/components/Dashboard/Dashboard';
import { VerifyEmail } from './components/Pages/VerifyEmail';


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />   */}
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/verify" element={<VerifyEmail />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

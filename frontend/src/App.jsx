import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/signUp';
import Dashboard from './pages/Dashboard';
import Devices from './pages/devices'
import { useState } from 'react';

export default function App() {
  const [user, setUser] = useState(null); 

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />

        
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/devices" element={user ? <Devices /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

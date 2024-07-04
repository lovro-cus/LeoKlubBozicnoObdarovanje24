import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { AuthProvider } from './AuthContext'; 
import Home from './pages/Home';
import Create from './pages/Create';
import Update from './pages/Update';
import Login from './pages/login';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './pages/Navbar';

function App() {
  return (
    <AuthProvider>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
          >
            <Toolbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/:id" element={<Update />} />
              <Route path="/adminDashboard" element={<AdminDashboard />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </Box>
    </AuthProvider>
  );
}

export default App;

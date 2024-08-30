import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { AuthProvider } from './AuthContext'; 
import Home from './pages/Home';
import Wishes from './pages/wishes';
import WishesDarovalecPodatki from './pages/wishesDarovalecPodatki';
import WishesPodatki from './pages/wishesPodatki'; 
import Create from './pages/Create';
import Update from './pages/Update';
import Login from './pages/login';
import VstopFormular from './pages/vstopFormular';
import AddFormular from './pages/addFormular';
import Dostava from './pages/dostava';
import VstopDostava from './pages/vstopDostava';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './pages/Navbar';
import Formular from './pages/Formular';
import DodajOtroka from './pages/DodajOtroka';

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
              <Route path="/wishes" element={<Wishes />} />
              <Route path="/wishesDarovalecPodatki" element={<WishesDarovalecPodatki />} />
              <Route path="/wishesPodatki" element={<WishesPodatki />} />
              <Route path="/create" element={<Create />} />
              <Route path="/:id" element={<Update />} />
              <Route path="/adminDashboard" element={<AdminDashboard />} />
              <Route path="/formular" element={<Formular />} />
              <Route path="/addFormular" element={<AddFormular />} />
              <Route path="/vstopFormular" element={<VstopFormular />} />
              <Route path="/Dostava" element={<Dostava />} />
              <Route path="/vstopDostava" element={<VstopDostava />} />
              <Route path="/dodajOtroka" element={<DodajOtroka />} />
              {/* Privzeta pot */}
              <Route path="*" element={<Wishes />} /> 
            </Routes>
          </Box>
        </BrowserRouter>
      </Box>
    </AuthProvider>
  );
}

export default App;

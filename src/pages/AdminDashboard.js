import React, { useState } from 'react';
import { Button, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import UserList from './CrudUser/UserList';
import UserForm from './CrudUser/UserForm';
import supabase from '../config/supabaseClient';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = async (idUsers) => {
    const { data, error } = await supabase.from('users').delete().eq('idUsers', idUsers);
    if (error) {
      console.error('Error deleting user:', error);
    } else {
      alert('Uporabnik uspešno izbrisan');
      setShowForm(false);
    }
  };

  const handleSave = () => {
    setEditingUser(null);
    setShowForm(false);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLogout} sx={{ mb: 2 }}>
          Odjava
        </Button>
        {!showForm ? (
          <>
            <UserList onEdit={handleEdit} onDelete={handleDelete} />
            <Button variant="contained" onClick={() => setShowForm(true)} sx={{ mt: 2 }}>
              Dodaj novega uporabnika
            </Button>
          </>
        ) : (
          <UserForm user={editingUser} onSave={handleSave} />
        )}
      </Box>
    </Container>
  );
};

export default AdminDashboard;

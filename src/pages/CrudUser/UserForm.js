import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import supabase from '../../config/supabaseClient';

const UserForm = ({ user, onSave }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('users')
        .insert({ username, datum: now });

      if (error) {
        console.error('Error creating user:', error);
      } else {
        onSave();
      }
  };

  return (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {user ? 'Uredi uporabnika' : 'Dodaj novega uporabnika'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Uporabniško ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Shrani
        </Button>
      </form>
    </Box>
  );
};

export default UserForm;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';

const Dostava = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');

    navigate('/vstopDostava'); // Preusmeritev na VstopDostava
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Dostava
        </Typography>
        <Typography variant="body1" paragraph>
          Tukaj so vse informacije o dostavi. Prosimo, da sledite navodilom.
        </Typography>
        {/* Tukaj lahko dodate dodatne informacije ali funkcionalnosti za dostavo */}
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Odjava
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Dostava;

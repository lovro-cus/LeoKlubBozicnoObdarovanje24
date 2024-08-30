import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';

const VstopFormular = () => {
  const [vstopData, setVstopData] = useState({
    uporabniskoIme: '',
    geslo: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Preverjanje, če je uporabnik že prijavljen
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      navigate('/addFormular'); 
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVstopData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Preprosta preverba (to lahko prilagodite ali nadomestite s pravim preverjanjem)
    if (vstopData.uporabniskoIme === 'user' && vstopData.geslo === 'temp') {
      // Shranjevanje uporabniških podatkov v localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(vstopData));
      navigate('/addFormular');
    } else {
      alert('Napačno uporabniško ime ali geslo');
    }
  };

  return (
    <Box sx={{ mt: 8 }}>
      {/* Prvi Container */}
      <Container component="main" maxWidth="md">
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Pozdravljeni!
          </Typography>
          <Typography variant="body1" align="center">
            Kot pooblaščeni uporabnik lahko izpolnite podatke za želje otrok. Prosimo, da vnesete svoje uporabniško ime in geslo za dostop.
            +krako pojasnilo: Torej prvo vnesete podatke, ki ste jih kot uporabnik prejeli od Leo kluba Ptuj, se prijavite in v naslednjem koraku vnesete podatke za otroke.
          </Typography>
        </Paper>
      </Container>

      {/* Drugi Container */}
      <Container component="main" maxWidth="xs">
        <Typography variant="h4" gutterBottom align="center">
          Vstopite
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="uporabniskoIme"
            label="Uporabniško ime"
            value={vstopData.uporabniskoIme}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="geslo"
            label="Geslo"
            type="password"
            value={vstopData.geslo}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Vstopi
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default VstopFormular;

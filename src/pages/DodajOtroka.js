import React, { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DodajOtroka = () => {
  const [childData, setChildData] = useState({
    ime: '',
    priimek: '',
    spol: '',
    starost: '',
    zelja: '',
    obutev: '',
    konfekcija: '',
    alergije: '',
    sola: ''
  });

  const [dostavaNaSolu, setDostavaNaSolu] = useState(false);

  useEffect(() => {
    // Preberemo stanje iz localStorage
    const storedFormData = JSON.parse(localStorage.getItem('formData'));
    if (storedFormData) {
      setDostavaNaSolu(storedFormData.dostavaNaSolu);
      setChildData((prevData) => ({
        ...prevData,
        priimek: storedFormData.imeDruzine
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChildData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Funkcionalnost za oddajo obrazca bo dodana kasneje
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dodaj Otroka
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="ime"
            label="Ime"
            value={childData.ime}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="priimek"
            label="Priimek"
            value={childData.priimek}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="spol"
            label="Spol"
            value={childData.spol}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="starost"
            label="Starost"
            value={childData.starost}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="zelja"
            label="Želja otroka"
            value={childData.zelja}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="obutev"
            label="Številka obutve"
            value={childData.obutev}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="konfekcija"
            label="Konfekcijska številka"
            value={childData.konfekcija}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="alergije"
            label="Alergije"
            value={childData.alergije}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {dostavaNaSolu && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="sola-label">Izberite šolo</InputLabel>
              <Select
                labelId="sola-label"
                id="sola"
                name="sola"
                value={childData.sola}
                onChange={handleChange}
                required
              >
                <MenuItem value="Šola1">Šola1</MenuItem>
                <MenuItem value="Šola2">Šola2</MenuItem>
              </Select>
            </FormControl>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Shrani
            </Button>
            <Button variant="contained" color="secondary" onClick={() => window.history.back()}>
              Prekliči
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default DodajOtroka;

import React, { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography, FormControl, FormLabel, FormControlLabel, Checkbox, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Formular = () => {
  const [formData, setFormData] = useState({
    imeDruzine: '',
    ime: '',
    telStevilka: '',
    dostavaNaDom: false,
    dostavaNaSolu: false,
    ulica: '',
    mesto: '',
    postnaStevilka: '',
    drzava: '',
    mobilnaStevilka: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Ob nalaganju komponente preberemo stanje iz localStorage
    const storedFormData = JSON.parse(localStorage.getItem('formData'));
    if (storedFormData) {
      setFormData(storedFormData);
    }
    
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };

    if (name === 'dostavaNaDom' && checked) {
      updatedFormData.dostavaNaSolu = false;
    } else if (name === 'dostavaNaSolu' && checked) {
      updatedFormData.dostavaNaDom = false;
    }

    setFormData(updatedFormData);
    // Shranimo stanje v localStorage ob vsaki spremembi
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Funkcionalnost za oddajo obrazca bo dodana kasneje
  };

  const openInGoogleMaps = () => {
    const address = `${formData.ulica}, ${formData.mesto}, ${formData.postnaStevilka}, ${formData.drzava}`.toUpperCase();
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleAddChild = () => {
    navigate('/dodajOtroka');
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Božično obdarovanje
        </Typography>
        <Typography variant="h6" gutterBottom>
          Leo klub Ptuj & Rotaract klub Ptuj
        </Typography>
        <br></br>
        <form onSubmit={handleSubmit}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3, position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 4, left: 10, backgroundColor: 'white', px: 1 }}>
            <FormLabel component="legend">Ime družine</FormLabel>
            </Box>
            <TextField
              name="imeDruzine"
              label="Ime Družine"
              value={formData.imeDruzine}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
          </Paper>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3, position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 4, left: 10, backgroundColor: 'white', px: 1 }}>
            <FormLabel component="legend">Kontaktni podatki</FormLabel>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="ime"
                  label="Ime in priimek starša/skrbnika"
                  value={formData.ime}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="telStevilka"
                  label="Tel Številka"
                  value={formData.telStevilka}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3, position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 4, left: 10, backgroundColor: 'white', px: 1 }}>
            <FormLabel component="legend">Izberite tip dostave</FormLabel>
            </Box>
            <FormControl component="fieldset" margin="normal">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.dostavaNaDom}
                    onChange={handleChange}
                    name="dostavaNaDom"
                  />
                }
                label="Na dom"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.dostavaNaSolu}
                    onChange={handleChange}
                    name="dostavaNaSolu"
                  />
                }
                label="Na šolo"
              />
            </FormControl>
            {formData.dostavaNaDom && (
              <>
                <TextField
                  name="ulica"
                  label="Ulica"
                  value={formData.ulica}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="mesto"
                  label="Mesto"
                  value={formData.mesto}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="postnaStevilka"
                  label="Poštna številka"
                  value={formData.postnaStevilka}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="drzava"
                  label="Država"
                  value={formData.drzava}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="mobilnaStevilka"
                  label="Mobilna številka"
                  value={formData.mobilnaStevilka}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <Button variant="contained" color="secondary" onClick={openInGoogleMaps} sx={{ mt: 2 }}>
                  Prikaži v Google Maps
                </Button>
              </>
            )}
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Pošlji
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={handleAddChild}
              disabled={!formData.dostavaNaDom && !formData.dostavaNaSolu}
            >
              Dodaj otroka
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Formular;

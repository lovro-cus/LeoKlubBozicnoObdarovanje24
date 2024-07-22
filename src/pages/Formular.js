import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const Formular = () => {
  const [formData, setFormData] = useState({
    ime: '',
    priimek: '',
    spol: '',
    starost: '',
    dostava: '',
    zelja: '',
    obutev: '',
    konfekcija: '',
    prehrana: '',
    alergije: '',
    ulica: '',
    mesto: '',
    postnaStevilka: '',
    drzava: '',
    mobilnaStevilka: '',
    drugiOtroci: '',
    druzinskaSituacija: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
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

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Božično obdarovanje
        </Typography>
        <Typography variant="h6" gutterBottom>
          Leo klub Ptuj & Rotaract klub Ptuj
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="ime"
            label="Ime"
            value={formData.ime}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="priimek"
            label="Priimek"
            value={formData.priimek}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Spol</FormLabel>
            <RadioGroup row name="spol" value={formData.spol} onChange={handleChange}>
              <FormControlLabel value="moški" control={<Radio />} label="Moški" />
              <FormControlLabel value="ženski" control={<Radio />} label="Ženski" />
            </RadioGroup>
          </FormControl>
          <TextField
            name="starost"
            label="Starost"
            value={formData.starost}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Želite, da se paket dostavi na dom ali v šolo?</FormLabel>
            <RadioGroup row name="dostava" value={formData.dostava} onChange={handleChange}>
              <FormControlLabel value="dom" control={<Radio />} label="Dom" />
              <FormControlLabel value="šola" control={<Radio />} label="Šola" />
            </RadioGroup>
          </FormControl>
          <TextField
            name="zelja"
            label="Želja otroka (naj se priloži pismo otroka)"
            value={formData.zelja}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="obutev"
            label="Številka obutve (v primeru, da si jo zaželi)"
            value={formData.obutev}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="konfekcija"
            label="Konfekcijska številka (če je želja po oblačilih, vpišite s številko ali s črko)"
            value={formData.konfekcija}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Želite, da se vam dostavi tudi prehranski paket?</FormLabel>
            <RadioGroup row name="prehrana" value={formData.prehrana} onChange={handleChange}>
              <FormControlLabel value="da" control={<Radio />} label="Da" />
              <FormControlLabel value="ne" control={<Radio />} label="Ne" />
            </RadioGroup>
          </FormControl>
          <TextField
            name="alergije"
            label="Želje v zvezi s prehrano/alergije"
            value={formData.alergije}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
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
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Ali so v družini tudi kakšni drugi otroci?</FormLabel>
            <RadioGroup row name="drugiOtroci" value={formData.drugiOtroci} onChange={handleChange}>
              <FormControlLabel value="da" control={<Radio />} label="Da" />
              <FormControlLabel value="ne" control={<Radio />} label="Ne" />
            </RadioGroup>
          </FormControl>
          <TextField
            name="druzinskaSituacija"
            label="Družinska situacija"
            value={formData.druzinskaSituacija}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Pošlji
            </Button>
            <Button variant="contained" color="secondary" onClick={openInGoogleMaps}>
              Prikaži v Google Maps
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Formular;

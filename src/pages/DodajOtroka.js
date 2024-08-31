import React, { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const navigate = useNavigate();
  const location = useLocation();
  const { familyId, formData, obstojecChild } = location.state || {};

  useEffect(() => {
    if (formData) {
        setDostavaNaSolu(formData.dostavaNaSolu);
        setChildData((prevData) => ({
            ...prevData,
            priimek: formData.imeDruzine
        }));
    }
    
    // Če obstajajo podatki o otroku, jih predizpolnimo v obrazcu
    if (location.state && location.state.child) {
        setChildData(location.state.child);
    }
  }, [formData, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChildData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
  
    if (!familyId) {
      alert('Družina ni določena.');
      navigate('/formular');
      return;
    }

    // Update family data with the new child
    const storedFamilies = JSON.parse(localStorage.getItem('families')) || [];
    const familyIndex = storedFamilies.findIndex(family => String(family.id) === String(familyId));

    if (familyIndex > -1) {
      const updatedFamily = { ...storedFamilies[familyIndex] };

      if (obstojecChild) {
        // Urejanje obstoječega otroka
        const childIndex = updatedFamily.children.findIndex(child => child.id === childData.id);
        if (childIndex > -1) {
          updatedFamily.children[childIndex] = childData;
        }
      } else {
        // Dodajanje novega otroka
        updatedFamily.children = [...(updatedFamily.children || []), { ...childData, id: Date.now() }];
      }

      storedFamilies[familyIndex] = updatedFamily;
      localStorage.setItem('families', JSON.stringify(storedFamilies));
      navigate('/formular', { state: { family: updatedFamily } });
    } else {
      alert('Napaka pri shranjevanju otroka. Družina ni bila najdena.');
      navigate('/formular', { state: { formData } });
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {obstojecChild ? 'Uredi Otroka' : 'Dodaj Otroka'}
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
          <FormControl fullWidth margin="normal">
            <InputLabel id="spol-label">Spol</InputLabel>
            <Select
              labelId="spol-label"
              id="spol"
              name="spol"
              value={childData.spol}
              onChange={handleChange}
              required
            >
              <MenuItem value="Moški">Moški</MenuItem>
              <MenuItem value="Ženska">Ženska</MenuItem>
            </Select>
          </FormControl>
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
            <Button variant="contained" color="secondary" onClick={() => navigate('/formular', { state: { family: formData } })}>
              Prekliči
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default DodajOtroka;

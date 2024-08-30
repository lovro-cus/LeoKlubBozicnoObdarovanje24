import React, { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography, FormControl, FormLabel, FormControlLabel, Checkbox, Paper, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Formular = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    id: Date.now(), // Določimo id tukaj, da je vedno prisoten
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

  const [childData, setChildData] = useState([]); // Stanje za shranjene podatke o otrocih

  useEffect(() => {
    if (location.state && location.state.isNewFamily) {
      // Če gre za novo družino, že imamo id v začetnem stanju
      setFormData((prevData) => ({
        ...prevData,
        id: Date.now()
      }));
      setChildData([]);
    } else if (location.state && location.state.family) {
      // Če urejamo obstoječo družino, napolnimo obrazec z obstoječimi podatki
      const family = location.state.family;
      setFormData(family);
      setChildData(family.children || []);
    } else {
      // Če ni stanja, preveri localStorage (npr., če uporabnik neposredno dostopa do obrazca)
      const savedFormData = JSON.parse(localStorage.getItem('formData'));
      if (savedFormData) {
        setFormData(savedFormData);
        setChildData(savedFormData.children || []);
      } else {
        // Nastavi privzete vrednosti za nov obrazec
        setFormData({
          id: Date.now(), 
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
        setChildData([]);
      }
    }
  }, [location]);

  const handleFormChange = (e) => {
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
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
  };

  const handleEditChild = (child) => {
    navigate('/dodajOtroka', { state: { child, familyId: formData.id, formData } });
  };

  const handleDeleteChild = (childId) => {
    const updatedChildData = childData.filter(child => child.id !== childId);
    setChildData(updatedChildData);
    localStorage.setItem('wishes', JSON.stringify(updatedChildData));
  };
  
  const openInGoogleMaps = () => {
    const address = `${formData.ulica}, ${formData.mesto}, ${formData.postnaStevilka}, ${formData.drzava}`.toUpperCase();
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedFamilies = JSON.parse(localStorage.getItem('families')) || [];
    
    const familyIndex = storedFamilies.findIndex(family => family.id === formData.id);
    
    if (familyIndex > -1) {
      storedFamilies[familyIndex] = { ...formData, children: childData };
    } else {
      storedFamilies.push({ ...formData, children: childData });
    }

    localStorage.setItem('families', JSON.stringify(storedFamilies));
    localStorage.removeItem('formData'); // Po uspešnem shranjevanju odstranimo začasne podatke
    navigate('/addFormular');
  };
  
  const handleAddChild = () => {
    // Preden dodamo otroka, shranimo trenutno družino v localStorage
    const storedFamilies = JSON.parse(localStorage.getItem('families')) || [];
    const familyExists = storedFamilies.some(family => family.id === formData.id);

    if (!familyExists) {
      storedFamilies.push({ ...formData, children: childData });
      localStorage.setItem('families', JSON.stringify(storedFamilies));
    }

    navigate('/dodajOtroka', { state: { familyId: formData.id, formData } });
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
              onChange={handleFormChange}
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
                  onChange={handleFormChange}
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
                  onChange={handleFormChange}
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
                    onChange={handleFormChange}
                    name="dostavaNaDom"
                  />
                }
                label="Na dom"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.dostavaNaSolu}
                    onChange={handleFormChange}
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
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="mesto"
                  label="Mesto"
                  value={formData.mesto}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="postnaStevilka"
                  label="Poštna številka"
                  value={formData.postnaStevilka}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="drzava"
                  label="Država"
                  value={formData.drzava}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  name="mobilnaStevilka"
                  label="Mobilna številka"
                  value={formData.mobilnaStevilka}
                  onChange={handleFormChange}
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

          {/* Prikaz in urejanje podatkov o otrocih */}
          {childData.length > 0 && (
            <>
              {childData.map((child, index) => (
                <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }} key={child.id}>
                  <Typography variant="h6" gutterBottom>
                    {child.ime} {child.priimek} - Podatki o otroku {index + 1}
                  </Typography>
                  <Typography variant="body1"><strong>Spol:</strong> {child.spol}</Typography>
                  <Typography variant="body1"><strong>Starost:</strong> {child.starost} let</Typography>
                  <Typography variant="body1"><strong>Želja:</strong> {child.zelja}</Typography>
                  <Typography variant="body1"><strong>Obutev:</strong> {child.obutev || '/'}</Typography>
                  <Typography variant="body1"><strong>Konfekcija:</strong> {child.konfekcija || '/'}</Typography>
                  <Typography variant="body1"><strong>Alergije:</strong> {child.alergije || '/'}</Typography>
                  <Typography variant="body1"><strong>Šola:</strong> {child.sola || '/'}</Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => handleEditChild(child)}
                    sx={{ mt: 2, mr: 2 }}
                  >
                    Uredi
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => handleDeleteChild(child.id)}
                    sx={{ mt: 2 }}
                  >
                    Izbriši
                  </Button>
                </Paper>
              ))}
            </>
          )}

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

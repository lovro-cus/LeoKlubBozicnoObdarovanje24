import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddFormular = () => {
  const [families, setFamilies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Pridobimo podatke iz localStorage
    const storedFamilies = JSON.parse(localStorage.getItem('families')) || [];
    setFamilies(storedFamilies);
  }, []);

  const handleAddFamily = () => {
    navigate('/formular', { state: { family: null, isNewFamily: true } });
  };

  const handleEditFamily = (family) => {
    // Preusmeritev na formular stran z izpolnjenimi podatki
    navigate('/formular', { state: { family } });
  };

  const handleDeleteFamily = (familyToDelete) => {
    // Filtriramo družine in obdržimo le tiste, ki niso za izbris
    const updatedFamilies = families.filter(family => family.id !== familyToDelete.id);
  
    // Posodobimo stanje s filtriranimi družinami
    setFamilies(updatedFamilies);
  
    // Posodobimo localStorage z novim seznamom družin
    localStorage.setItem('families', JSON.stringify(updatedFamilies));
    
    // Posodobimo zelje v localStorage na podlagi posodobljenega seznama družin
    const allWishes = updatedFamilies.flatMap(family => family.children || []);
    localStorage.setItem('wishes', JSON.stringify(allWishes));
  };
  

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/vstopFormular'); 
  };

  const handleSaveAndSync = () => {
    const allWishes = families.flatMap(family => family.children || []);
    localStorage.setItem('wishes', JSON.stringify(allWishes));
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Shranjene Družine
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddFamily}>
          Dodaj Družino
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ime Družine</TableCell>
              <TableCell>Ime Starša</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>Naslov</TableCell>
              <TableCell>Otroci</TableCell>
              <TableCell>Uredi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {families.map((family, index) => (
              <TableRow key={index}>
                <TableCell>{family.imeDruzine}</TableCell>
                <TableCell>{family.ime}</TableCell>
                <TableCell>{family.telStevilka}</TableCell>
                <TableCell>{family.ulica}, {family.mesto}, {family.postnaStevilka}, {family.drzava}</TableCell>
                <TableCell>
                  <ul>
                    {family.children.map((child, idx) => (
                      <li key={idx}>{child.ime} {child.priimek} - {child.starost} let</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      onClick={() => handleEditFamily(family)}
                    >
                      Uredi
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="secondary" 
                      onClick={() => handleDeleteFamily(family)}
                    >
                      Izbriši
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleSaveAndSync}>
          Shrani vse druzine
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button onClick={handleLogout} variant="contained" color="secondary">
          Odjava
        </Button>
      </Box>
    </Container>
  );
};

export default AddFormular;

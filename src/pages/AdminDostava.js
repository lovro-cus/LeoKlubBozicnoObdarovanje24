import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const AdminDostava = () => {
  const [families, setFamilies] = useState([]);
  const [expandedFamilies, setExpandedFamilies] = useState({});

  useEffect(() => {
    const storedFamilies = JSON.parse(localStorage.getItem('families')) || [];

    let dostavaDruzinaIDCounter = 1;

    const updatedFamilies = storedFamilies.map((family) => {
      const sortedChildren = (family.children || []).sort((a, b) => a.zeljaID - b.zeljaID);

      return {
        ...family,
        dostavaDruzinaID: dostavaDruzinaIDCounter++, 
        children: sortedChildren, 
      };
    });

    setFamilies(updatedFamilies);
  }, []);

  const toggleFamilyDetails = (dostavaDruzinaID) => {
    setExpandedFamilies((prev) => ({
      ...prev,
      [dostavaDruzinaID]: !prev[dostavaDruzinaID],
    }));
  };

  const getBackgroundColor = (child) => {
    if (child.finalized) {
      return 'lightgray'; 
    } else if (child.received) {
      return 'pink'; 
    } else if (child.highlighted) {
      return 'lightblue'; 
    } else {
      return 'inherit'; 
    }
  };

  const isFamilyFinalized = (children) => {
    return children.every((child) => child.finalized);
  };

  const handleDajVDostavo = (family) => {
    // dodelaj da dejansko gre v dostavo, maybe daj vmesni page kjer lahko das to druzino na uporabnika
    alert(`Družina ${family.imeDruzine} je bila dana v dostavo!`);
  };

  const renderLegend = () => (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: 20, height: 20, backgroundColor: 'inherit', border: '1px solid black', mr: 1 }} />
        <Typography>Bela - Sprejeta želja</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: 20, height: 20, backgroundColor: 'lightblue', mr: 1 }} />
        <Typography>Modra - Objavljena želja</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: 20, height: 20, backgroundColor: 'pink', mr: 1 }} />
        <Typography>Roza - Izbrana s strani darovalca</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: 20, height: 20, backgroundColor: 'lightgray', mr: 1 }} />
        <Typography>Siva - Prejeta darila</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: 20, height: 20, backgroundColor: 'lightgreen', mr: 1 }} />
        <Typography>Zelena - pripravljeno na dostavo</Typography>
      </Box>
    </Box>
  );

  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dostava - Pregled Družin in Želj
        </Typography>
        {renderLegend()}
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Dostava Družina ID</TableCell>
                <TableCell>Ime Družine</TableCell>
                <TableCell>Št. Želj</TableCell>
                <TableCell>Podrobno</TableCell>
                <TableCell></TableCell> {/* Dodan stolpec za gumb "Daj v dostavo" */}
              </TableRow>
            </TableHead>
            <TableBody>
              {families.map((family) => {
                const familyFinalized = isFamilyFinalized(family.children);

                return (
                  <React.Fragment key={family.dostavaDruzinaID}>
                    <TableRow
                      sx={{
                        backgroundColor: familyFinalized ? 'lightgreen' : 'inherit',
                      }}
                    >
                      <TableCell>{family.dostavaDruzinaID}</TableCell>
                      <TableCell>{family.imeDruzine}</TableCell>
                      <TableCell>{family.children.length}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined" 
                          onClick={() => toggleFamilyDetails(family.dostavaDruzinaID)}
                        >
                          {expandedFamilies[family.dostavaDruzinaID] ? 'Skrij' : 'Podrobno'}
                        </Button>
                      </TableCell>
                      <TableCell>
                        {familyFinalized && (
                          <Button
                            variant="contained" 
                            color="secondary"
                            onClick={() => handleDajVDostavo(family)}
                          >
                            Daj v dostavo
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                    {expandedFamilies[family.dostavaDruzinaID] && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>ZeljaID</TableCell>
                                  <TableCell>Ime</TableCell>
                                  <TableCell>Priimek</TableCell>
                                  <TableCell>Želja</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {family.children.map((child) => (
                                  <TableRow
                                    key={child.zeljaID}
                                    sx={{
                                      backgroundColor: getBackgroundColor(child),
                                    }}
                                  >
                                    <TableCell>{child.zeljaID}</TableCell>
                                    <TableCell>{child.ime}</TableCell>
                                    <TableCell>{child.priimek}</TableCell>
                                    <TableCell>{child.zelja}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default AdminDostava;

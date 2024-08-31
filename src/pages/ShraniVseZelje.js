import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, TextField } from '@mui/material';

const ShraniVseZelje = () => {
  const [allWishes, setAllWishes] = useState([]);
  const [publishedWishes, setPublishedWishes] = useState([]);
  const [receivedWishes, setReceivedWishes] = useState([]);
  const [finalReceivedWishes, setFinalReceivedWishes] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const storedFamilies = JSON.parse(localStorage.getItem('families')) || [];

    let zeljaIDCounter = 1;

    const wishes = storedFamilies.flatMap((family) => 
      (family.children || []).map((child, childIndex) => {
        const zeljaID = zeljaIDCounter++;
        return {
          ZeljaID: zeljaID,
          id: `${family.id}-${child.id}`,
          st: childIndex + 1,
          ime: child.ime,
          priimek: child.priimek,
          spol: child.spol,
          starost: child.starost,
          zelja: child.zelja,
          obutev: child.obutev || '/',
          konfekcija: child.konfekcija || '/',
          alergije: child.alergije || '/',
          sola: child.sola || '/',
          imeDruzine: family.imeDruzine,
          showInWishes: child.showInWishes || false,
          highlighted: child.highlighted || false,
          received: child.received || false,
          finalized: child.finalized || false
        };
      })
    );

    const unhighlightedWishes = wishes.filter(wish => !wish.highlighted);
    setAllWishes(unhighlightedWishes);

    const published = wishes.filter(wish => wish.highlighted && !wish.received);
    setPublishedWishes(published);

    const received = wishes.filter(wish => wish.received && !wish.finalized);
    setReceivedWishes(received);

    const finalized = wishes.filter(wish => wish.finalized);
    setFinalReceivedWishes(finalized);
  }, []);

  const handleCheckboxChange = (wishId, table) => {
    if (table === 'published') {
      const updatedWishes = publishedWishes.map(wish => 
        wish.id === wishId ? { ...wish, received: !wish.received } : wish
      );
      setPublishedWishes(updatedWishes);
    } else if (table === 'received') {
      const updatedWishes = receivedWishes.map(wish => 
        wish.id === wishId ? { ...wish, finalized: !wish.finalized } : wish
      );
      setReceivedWishes(updatedWishes);
    }
  };

  const handleSave = () => {
    const updatedWishes = allWishes.map(wish => {
      if (wish.showInWishes) {
        return { ...wish, highlighted: true, showInWishes: true };
      }
      return wish;
    });

    const unhighlightedWishes = updatedWishes.filter(wish => !wish.highlighted);
    setAllWishes(unhighlightedWishes);

    const published = updatedWishes.filter(wish => wish.highlighted && !wish.received);
    setPublishedWishes([...publishedWishes, ...published]);

    const storedFamilies = JSON.parse(localStorage.getItem('families')) || [];
    storedFamilies.forEach(family => {
      family.children.forEach(child => {
        const wish = updatedWishes.find(w => w.id === `${family.id}-${child.id}`);
        if (wish) {
          child.showInWishes = wish.showInWishes;
          child.highlighted = wish.highlighted;
        }
      });
    });
    localStorage.setItem('families', JSON.stringify(storedFamilies));
    localStorage.setItem('wishes', JSON.stringify(publishedWishes));

    alert('Izbrane želje so bile uspešno shranjene, obarvane in sinhronizirane za prikaz.');
  };

  const handleReceived = () => {
    const updatedPublishedWishes = publishedWishes.filter(wish => !wish.received);
    setPublishedWishes(updatedPublishedWishes);

    const newlyReceivedWishes = publishedWishes.filter(wish => wish.received);
    setReceivedWishes([...receivedWishes, ...newlyReceivedWishes]);

    const storedFamilies = JSON.parse(localStorage.getItem('families')) || [];
    storedFamilies.forEach(family => {
      family.children.forEach(child => {
        const wish = newlyReceivedWishes.find(w => w.id === `${family.id}-${child.id}`);
        if (wish) {
          child.received = true;
        }
      });
    });
    localStorage.setItem('families', JSON.stringify(storedFamilies));
    localStorage.setItem('receivedWishes', JSON.stringify([...receivedWishes, ...newlyReceivedWishes]));

    alert('Izbrane želje so bile uspešno označene kot prejete.');
  };

  const handleFinalize = () => {
    const updatedReceivedWishes = receivedWishes.filter(wish => !wish.finalized);
    setReceivedWishes(updatedReceivedWishes);

    const newlyFinalizedWishes = receivedWishes.filter(wish => wish.finalized);
    setFinalReceivedWishes([...finalReceivedWishes, ...newlyFinalizedWishes]);

    const storedFamilies = JSON.parse(localStorage.getItem('families')) || [];
    storedFamilies.forEach(family => {
      family.children.forEach(child => {
        const wish = newlyFinalizedWishes.find(w => w.id === `${family.id}-${child.id}`);
        if (wish) {
          child.finalized = true;
        }
      });
    });
    localStorage.setItem('families', JSON.stringify(storedFamilies));
    localStorage.setItem('finalReceivedWishes', JSON.stringify([...finalReceivedWishes, ...newlyFinalizedWishes]));

    alert('Izbrane želje so bile uspešno označene kot končna prejeta darila.');
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setSearchQuery(''); // Resetiraj iskalni niz ob preklopu zavihka
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterWishes = (wishes) => {
    return wishes.filter((wish) => 
      wish.ZeljaID.toString().includes(searchQuery) ||
      wish.imeDruzine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wish.sola.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wish.priimek.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedWishes = (wishes) => {
    const sorted = [...wishes];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  };

  const renderWishRow = (wish, index) => {
    let backgroundColor = 'inherit';
    if (wish.finalized) {
      backgroundColor = 'lightgray';
    } else if (wish.received) {
      backgroundColor = 'pink';
    } else if (wish.highlighted) {
      backgroundColor = 'lightblue';
    }

    return (
      <TableRow key={wish.id} sx={{ backgroundColor }}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{wish.ZeljaID}</TableCell>
        <TableCell>{wish.ime}</TableCell>
        <TableCell>{wish.priimek}</TableCell>
        <TableCell>{wish.spol}</TableCell>
        <TableCell>{wish.starost}</TableCell>
        <TableCell>{wish.zelja}</TableCell>
        <TableCell>{wish.obutev}</TableCell>
        <TableCell>{wish.konfekcija}</TableCell>
        <TableCell>{wish.alergije}</TableCell>
        <TableCell>{wish.sola}</TableCell>
        <TableCell>{wish.imeDruzine}</TableCell>
      </TableRow>
    );
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
    </Box>
  );

  const handleResetSort = () => {
    setSortConfig({ key: null, direction: 'asc' });
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Pregled" />
          <Tab label="Zelje" />
          <Tab label="Objavlene" />
          <Tab label="Izbrane" />
          <Tab label="Prejete" />
        </Tabs>
        <TextField 
          variant="outlined" 
          fullWidth 
          placeholder="Iskanje po ŽeljaID, Družini, Šoli, Priimku" 
          sx={{ mt: 2 }} 
          value={searchQuery} 
          onChange={handleSearchChange}
        />
        {currentTab === 0 && (
          <Box>
            <Typography variant="h5" sx={{ mt: 4 }}>
              Pregled Vseh Želj
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button variant="outlined" onClick={handleResetSort}>
                Privzeto
              </Button>
            </Box>
            {renderLegend()}
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell onClick={() => handleSort('st')} style={{ cursor: 'pointer' }}>
                      Št. {sortConfig.key === 'st' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                    </TableCell>
                    <TableCell onClick={() => handleSort('ZeljaID')} style={{ cursor: 'pointer' }}>
                      ZeljaID {sortConfig.key === 'ZeljaID' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                    </TableCell>
                    <TableCell>Ime</TableCell>
                    <TableCell>Priimek</TableCell>
                    <TableCell>Spol</TableCell>
                    <TableCell>Starost</TableCell>
                    <TableCell>Želja</TableCell>
                    <TableCell>Številka obutve</TableCell>
                    <TableCell>Konfekcija</TableCell>
                    <TableCell>Alergije</TableCell>
                    <TableCell>Šola</TableCell>
                    <TableCell>Ime Družine</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedWishes(filterWishes([
                    ...allWishes,
                    ...publishedWishes,
                    ...receivedWishes,
                    ...finalReceivedWishes,
                  ])).map((wish, index) => renderWishRow(wish, index))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        {/* Ostali zavihki (Zelje, Objavlene, Izbrane, Prejete) */}
        {currentTab === 1 && (
          <Box>
            <Typography variant="h5" sx={{ mt: 4 }}>
              Vse Zbrane Želje
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell onClick={() => handleSort('st')} style={{ cursor: 'pointer' }}>
                      Št. {sortConfig.key === 'st' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                    </TableCell>
                    <TableCell onClick={() => handleSort('ZeljaID')} style={{ cursor: 'pointer' }}>
                      ZeljaID {sortConfig.key === 'ZeljaID' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                    </TableCell>
                    <TableCell>Ime</TableCell>
                    <TableCell>Priimek</TableCell>
                    <TableCell>Spol</TableCell>
                    <TableCell>Starost</TableCell>
                    <TableCell>Želja</TableCell>
                    <TableCell>Številka obutve</TableCell>
                    <TableCell>Konfekcija</TableCell>
                    <TableCell>Alergije</TableCell>
                    <TableCell>Šola</TableCell>
                    <TableCell>Ime Družine</TableCell>
                    <TableCell>Prikaz v Wishes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedWishes(filterWishes(allWishes)).map((wish, index) => (
                    <TableRow
                      key={wish.id}
                      sx={{
                        backgroundColor: wish.highlighted ? 'lightblue' : 'inherit',
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{wish.ZeljaID}</TableCell>
                      <TableCell>{wish.ime}</TableCell>
                      <TableCell>{wish.priimek}</TableCell>
                      <TableCell>{wish.spol}</TableCell>
                      <TableCell>{wish.starost}</TableCell>
                      <TableCell>{wish.zelja}</TableCell>
                      <TableCell>{wish.obutev}</TableCell>
                      <TableCell>{wish.konfekcija}</TableCell>
                      <TableCell>{wish.alergije}</TableCell>
                      <TableCell>{wish.sola}</TableCell>
                      <TableCell>{wish.imeDruzine}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={wish.showInWishes}
                          onChange={() => handleCheckboxChange(wish.id, 'all')}
                          disabled={wish.highlighted}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Objavi
              </Button>
            </Box>
          </Box>
        )}
        {currentTab === 2 && (
          <Box>
            <Typography variant="h5" sx={{ mt: 4 }}>
              Na izbiro - (zelje ki so ze objavlene in cakajo da bodo izbrane):
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell onClick={() => handleSort('st')} style={{ cursor: 'pointer' }}>
                      Št. {sortConfig.key === 'st' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                    </TableCell>
                    <TableCell onClick={() => handleSort('ZeljaID')} style={{ cursor: 'pointer' }}>
                      ZeljaID {sortConfig.key === 'ZeljaID' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                    </TableCell>
                    <TableCell>Ime</TableCell>
                    <TableCell>Priimek</TableCell>
                    <TableCell>Spol</TableCell>
                    <TableCell>Starost</TableCell>
                    <TableCell>Želja</TableCell>
                    <TableCell>Številka obutve</TableCell>
                    <TableCell>Konfekcija</TableCell>
                    <TableCell>Alergije</TableCell>
                    <TableCell>Šola</TableCell>
                    <TableCell>Ime Družine</TableCell>
                    <TableCell>Prejeto</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedWishes(filterWishes(publishedWishes)).map((wish, index) => (
                    <TableRow
                      key={wish.id}
                      sx={{
                        backgroundColor: 'lightblue',
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{wish.ZeljaID}</TableCell>
                      <TableCell>{wish.ime}</TableCell>
                      <TableCell>{wish.priimek}</TableCell>
                      <TableCell>{wish.spol}</TableCell>
                      <TableCell>{wish.starost}</TableCell>
                      <TableCell>{wish.zelja}</TableCell>
                      <TableCell>{wish.obutev}</TableCell>
                      <TableCell>{wish.konfekcija}</TableCell>
                      <TableCell>{wish.alergije}</TableCell>
                      <TableCell>{wish.sola}</TableCell>
                      <TableCell>{wish.imeDruzine}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={wish.received}
                          onChange={() => handleCheckboxChange(wish.id, 'published')}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleReceived}>
                Izbrana
              </Button>
            </Box>
          </Box>
        )}
        {currentTab === 3 && (
          <Box>
            <Typography variant="h5" sx={{ mt: 4 }}>
              Ze izbrane - (cakamo da bodo dostavljene):
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell onClick={() => handleSort('st')} style={{ cursor: 'pointer' }}>
                      Št. {sortConfig.key === 'st' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                    </TableCell>
                    <TableCell onClick={() => handleSort('ZeljaID')} style={{ cursor: 'pointer' }}>
                      ZeljaID {sortConfig.key === 'ZeljaID' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                    </TableCell>
                    <TableCell>Ime</TableCell>
                    <TableCell>Priimek</TableCell>
                    <TableCell>Spol</TableCell>
                    <TableCell>Starost</TableCell>
                    <TableCell>Želja</TableCell>
                    <TableCell>Številka obutve</TableCell>
                    <TableCell>Konfekcija</TableCell>
                    <TableCell>Alergije</TableCell>
                    <TableCell>Šola</TableCell>
                    <TableCell>Ime Družine</TableCell>
                    <TableCell>Finalizirano</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedWishes(filterWishes(receivedWishes)).map((wish, index) => (
                    <TableRow
                      key={wish.id}
                      sx={{
                        backgroundColor: 'pink',
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{wish.ZeljaID}</TableCell>
                      <TableCell>{wish.ime}</TableCell>
                      <TableCell>{wish.priimek}</TableCell>
                      <TableCell>{wish.spol}</TableCell>
                      <TableCell>{wish.starost}</TableCell>
                      <TableCell>{wish.zelja}</TableCell>
                      <TableCell>{wish.obutev}</TableCell>
                      <TableCell>{wish.konfekcija}</TableCell>
                      <TableCell>{wish.alergije}</TableCell>
                      <TableCell>{wish.sola}</TableCell>
                      <TableCell>{wish.imeDruzine}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={wish.finalized}
                          onChange={() => handleCheckboxChange(wish.id, 'received')}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleFinalize}>
                Prejeto
              </Button>
            </Box>
          </Box>
        )}
        {currentTab === 4 && (
          <Box>
            <Typography variant="h5" sx={{ mt: 4 }}>
              Prejeta darila:
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell onClick={() => handleSort('st')} style={{ cursor: 'pointer' }}>
                      Št. {sortConfig.key === 'st' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                    </TableCell>
                    <TableCell onClick={() => handleSort('ZeljaID')} style={{ cursor: 'pointer' }}>
                      ZeljaID {sortConfig.key === 'ZeljaID' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                    </TableCell>
                    <TableCell>Ime</TableCell>
                    <TableCell>Priimek</TableCell>
                    <TableCell>Spol</TableCell>
                    <TableCell>Starost</TableCell>
                    <TableCell>Želja</TableCell>
                    <TableCell>Številka obutve</TableCell>
                    <TableCell>Konfekcija</TableCell>
                    <TableCell>Alergije</TableCell>
                    <TableCell>Šola</TableCell>
                    <TableCell>Ime Družine</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedWishes(filterWishes(finalReceivedWishes)).map((wish, index) => (
                    <TableRow
                      key={wish.id}
                      sx={{
                        backgroundColor: 'lightgray',
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{wish.ZeljaID}</TableCell>
                      <TableCell>{wish.ime}</TableCell>
                      <TableCell>{wish.priimek}</TableCell>
                      <TableCell>{wish.spol}</TableCell>
                      <TableCell>{wish.starost}</TableCell>
                      <TableCell>{wish.zelja}</TableCell>
                      <TableCell>{wish.obutev}</TableCell>
                      <TableCell>{wish.konfekcija}</TableCell>
                      <TableCell>{wish.alergije}</TableCell>
                      <TableCell>{wish.sola}</TableCell>
                      <TableCell>{wish.imeDruzine}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ShraniVseZelje;

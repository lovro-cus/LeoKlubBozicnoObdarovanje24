import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Checkbox, FormControlLabel, Button, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const Wishes = () => {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWishes, setSelectedWishes] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishes = () => {
      const storedWishes = JSON.parse(localStorage.getItem('wishes')) || [];
      setWishes(storedWishes);
      setLoading(false);
    };

    fetchWishes();
  }, []);

  const handleWishSelection = (wishId) => {
    setSelectedWishes(prevSelectedWishes =>
      prevSelectedWishes.includes(wishId)
        ? prevSelectedWishes.filter(id => id !== wishId)
        : [...prevSelectedWishes, wishId]
    );
  };

  const handleConfirmWishes = () => {
    navigate('/wishesDarovalecPodatki', { state: { selectedWishes } });
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedWishes = [...wishes].sort((a, b) => {
    if (sortOption === 'starostDesc') {
      return b.starost - a.starost; // Sort by descending age
    } else if (sortOption === 'starostAsc') {
      return a.starost - b.starost; // Sort by ascending age
    } else if (sortOption === 'deklice') {
      return a.spol === 'Ženska' ? -1 : 1; // Show only girls
    } else if (sortOption === 'fantje') {
      return a.spol === 'Moški' ? -1 : 1; // Show only boys
    }
    return 0; // Default sort (no sort)
  }).filter((wish) => {
    if (sortOption === 'deklice') {
      return wish.spol === 'Ženska';
    } else if (sortOption === 'fantje') {
      return wish.spol === 'Moški';
    }
    return true; // Show all if no specific filter
  });

  if (loading) return <p>Nalaganje želja...</p>;

  return (
    <div className="page wishes">
      <Typography variant="body1" gutterBottom>
        Tukaj imamo seznam želja, kot darovalec lahko izbereš eno ali več želja in klikni "Naprej", da vpišeš svoje podatke in na mail boš pridobil naslednja navodila.
      </Typography>
      <h2>Seznam otrok in njihove želje</h2>

      <FormControl fullWidth margin="normal">
        <InputLabel id="sort-label">Razvrsti po</InputLabel>
        <Select
          labelId="sort-label"
          id="sort"
          value={sortOption}
          onChange={handleSortChange}
        >
          <MenuItem value="">Pocisti razvrščanje</MenuItem>
          <MenuItem value="starostDesc">Starost (od najstarejših)</MenuItem>
          <MenuItem value="starostAsc">Starost (od najmlajših)</MenuItem>
          <MenuItem value="deklice">Deklice</MenuItem>
          <MenuItem value="fantje">Fanti</MenuItem>
        </Select>
      </FormControl>

      {wishes.length === 0 ? (
        <Typography variant="body1">Seznam želja je prazen.</Typography>
      ) : (
        <Grid container spacing={3}>
          {sortedWishes.map((wish, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedWishes.includes(wish.id)}
                        onChange={() => handleWishSelection(wish.id)}
                      />
                    }
                    label={`${wish.spol === "Moški" ? "Fant" : "Deklica"}, ${wish.starost} let`}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {selectedWishes.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="contained" color="primary" onClick={handleConfirmWishes}>
            Naprej
          </Button>
        </Box>
      )}
    </div>
  );
};

export default Wishes;

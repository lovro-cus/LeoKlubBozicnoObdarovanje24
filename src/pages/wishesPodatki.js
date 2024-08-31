import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const WishesPodatki = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedWishes, formData } = location.state || {};

  if (!selectedWishes || !formData) {
    return <p>Ni podatkov za prikaz.</p>;
  }

  return (
    <div className="page wishesPodatki">
      <Typography variant="h4" gutterBottom>
        Hvala, {formData.ime || 'darovalec'}!
      </Typography>
      <Typography variant="body1" paragraph>
        Izbrali ste naslednje želje otrok:
      </Typography>
      {selectedWishes.map((wish, index) => (
        <Typography key={index} variant="body1" paragraph>
          - Otrok: {wish.spol === "Moški" ? "Fant" : "Deklica"}, starost {wish.starost} let, želja: {wish.zelja}
        </Typography>
      ))}
      <Typography variant="body1" paragraph>
        Na vaš email naslov ({formData.email}) boste prejeli nadaljnja navodila za dostavo darila. Ce slucajno ne najdete sporocila, poglejte pod spam.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/wishes')}>
          Nazaj na seznam želja
        </Button>
      </Box>
    </div>
  );
};


export default WishesPodatki;

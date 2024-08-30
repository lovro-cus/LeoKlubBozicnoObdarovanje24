import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const WishesPodatki = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedWish, formData } = location.state || {}; 

  if (!selectedWish || !formData) {
    return <p>Ni podatkov za prikaz.</p>;
  }

  return (
    <div className="page wishesPodatki">
      <Typography variant="h4" gutterBottom>
        Hvala, {formData.ime || 'darovalec'}!
      </Typography>
      <Typography variant="body1" paragraph>
        Izbrali ste željo otroka: {selectedWish.spol === "Moški" ? "Fant" : "Deklica"}, starost {selectedWish.starost} let.
      </Typography>
      <Typography variant="body1" paragraph>
        Otrokova želja: {selectedWish.zelja}
      </Typography>
      <Typography variant="body1" paragraph>
        Na vaš email naslov ({formData.email}) boste prejeli nadaljnja navodila za dostavo darila.
        --oz lahko nardimo tak da je tu vsebina ki jo dobi na mail + da pise tudi da bo se prejel enkrat to identicno stvar na mail-- tekom dneva boste prejeli recimo
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

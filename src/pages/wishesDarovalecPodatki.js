import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import emailjs from 'emailjs-com';

const WishesDarovalecPodatki = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedWishes = location.state?.selectedWishes || []; 
  const [formData, setFormData] = useState({
    ime: '',
    priimek: '',
    email: '',
    telefon: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Odstranimo izbrane želje iz localStorage
    const storedWishes = JSON.parse(localStorage.getItem('wishes')) || [];
    const selectedWishObjects = storedWishes.filter(wish => selectedWishes.includes(wish.id));
    const updatedWishes = storedWishes.filter(wish => !selectedWishes.includes(wish.id));
    localStorage.setItem('wishes', JSON.stringify(updatedWishes));

    console.log('User details:', formData);
    console.log('Izbrane želje:', selectedWishObjects);

    // Oblikovanje seznama želja za e-pošto
    const wishList = selectedWishObjects.map(wish => `- Želja: ${wish.zelja}, Starost: ${wish.starost} let`).join('\n');

    // Pošiljanje e-pošte z uporabo EmailJS
    const templateParams = {
        to_name: formData.ime,
        to_email: formData.email,
        subject: 'Potrditev želje za otroka - Bozicno obdarovanje Leo klub Ptuj',
        message: `
            Pozdravljeni ${formData.ime},

            Hvala, ker ste izbrali darila za otroke.

            Podrobnosti o izbranih željah:
            ${wishList}

            Prejeli boste nadaljnja navodila na ta e-naslov.

            Lep pozdrav,
            Leo Klub Ptuj
        `
    };

    emailjs.send('service_gharran', 'template_prb64zj', templateParams, '7tZRx34xEzy9g-6sX')
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        }, (err) => {
            console.log('FAILED...', err);
        });

    // Preusmeritev na stran WishesPodatki s podatki o izbranih željah
    navigate('/wishesPodatki', { state: { selectedWishes: selectedWishObjects, formData } });
};




  return (
    <div className="page wishesDarovalecPodatki">
      <Typography variant="h4" gutterBottom>
        Vnesite svoje podatke
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="ime"
          label="Ime"
          value={formData.ime}
          onChange={handleFormChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name="priimek"
          label="Priimek"
          value={formData.priimek}
          onChange={handleFormChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleFormChange}
          fullWidth
          margin="normal"
          required
          type="email"
        />
        <TextField
          name="telefon"
          label="Telefonska številka"
          value={formData.telefon}
          onChange={handleFormChange}
          fullWidth
          margin="normal"
          type="tel"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="contained" color="secondary" onClick={() => navigate('/wishes')}>
            Nazaj
          </Button>
          <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }}>
            Shrani
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default WishesDarovalecPodatki;

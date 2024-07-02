import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import supabase from '../../config/supabaseClient';

const UserList = ({ onEdit, onDelete }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom>
        Seznam uporabnikov
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Uporabniško ime</TableCell>
              <TableCell>Datum</TableCell>
              <TableCell>Akcije</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.idUsers}>
                <TableCell>{user.idUsers}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.datum}</TableCell>
                <TableCell>
                  <Button onClick={() => onEdit(user)}>Uredi</Button>
                  <Button onClick={() => onDelete(user.idUsers)}>Izbriši</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;

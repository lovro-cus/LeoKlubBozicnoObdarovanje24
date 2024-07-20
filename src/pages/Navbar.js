import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, Toolbar, AppBar, Typography, Box, Divider } from '@mui/material';
import { Home as HomeIcon, Login as LoginIcon, Dashboard as DashboardIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Uvozite useAuth
import leoKlubLogo from '../images/leoKlubLogo.png'; // Importirajte sliko

const drawerWidth = 240;

const Navbar = () => {
  const { isAdmin } = useAuth(); // Uporabite isAdmin iz konteksta
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar>
        <Box
          component="img"
          sx={{
            height: 128,
            width: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          alt="Leo Klub Logo"
          src={leoKlubLogo}
        />
      </Toolbar>
      <Divider />
      <Box sx={{ flexGrow: 1 }}>
        <List>
          <ListItem button component={RouterLink} to="/">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Domov" />
          </ListItem>
          {!isAdmin && (
            <ListItem button component={RouterLink} to="/login">
              <ListItemIcon><LoginIcon /></ListItemIcon>
              <ListItemText primary="Prijava" />
            </ListItem>
          )}
        </List>
      </Box>
      {isAdmin && (
        <Box sx={{ pb: 2 }}>
          <ListItem button component={RouterLink} to="/adminDashboard">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Nadzorna plošča" />
          </ListItem>
        </Box>
      )}
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;

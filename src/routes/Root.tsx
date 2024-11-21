import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Add, Delete, Inventory, Person } from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useProductStore } from '../stores/productsStore';

const drawerWidth = 240;

export default function Root() {

  const navigate = useNavigate()
  const getAllProducts = useProductStore(state => state.getAllProducts)
  getAllProducts()

  //Reviso si el usuario esta logueado
  useEffect(() => {
    // Verificar si el token ya está en localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirigir a la vista de login
    }
  }, [navigate]);


  return (

    <Box sx={{ display: 'flex' }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Inventory Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/home')}>
              <ListItemIcon>
                <Inventory />
              </ListItemIcon>
              <ListItemText primary={'Products'} />
            </ListItemButton>
          </ListItem>

          <ListItemButton onClick={() => navigate('/createProduct')}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary={'Create Product'} />
          </ListItemButton>


        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/users')}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary={'Users'} />
            </ListItemButton>
          </ListItem>

          <ListItemButton onClick={() => navigate('/createUser')}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary={'Create User'} />
          </ListItemButton>

        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
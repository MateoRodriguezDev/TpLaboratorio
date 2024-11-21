import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useAuthStore } from '../stores/authStore';
import { Credentials } from '../models/AuthModel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Login() {
  const login = useAuthStore(state => state.login)
  const navigate = useNavigate()

  const {control, handleSubmit, formState: { errors }} = useForm({defaultValues: { email: '', password: '' }});

  //Reviso si el usuario ya se habia logueado antes
  useEffect(() => {
    // Verificar si el token ya está en localStorage
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home'); // Redirigir a la vista de home
    }
  }, [navigate]);


  const onSubmit = async (credentials: Credentials) => {
    await login(credentials)
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home'); // Redirigir a la vista de home
    }
  };

  const defaultAlert = () => {
    alert('Recuerde inicializar el repositorio de backend: https://github.com/MateoRodriguezDev/TpFinalBackend.git');
    alert('Usuario por defecto: super@super.com - contraseña: superadmin');
  };

  useEffect(() => {
    const hasShownAlert = localStorage.getItem('defaultAlertShown');
    if (!hasShownAlert) {
      defaultAlert();
      localStorage.setItem('defaultAlertShown', 'true');
    }
  }, []);

  return (
    <>
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
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ maxWidth: 400, mx: 'auto', my: '200px' }}>
        <Typography variant='h2' align='center' >Inventory Manager</Typography>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Invalid email format',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Button type="submit" variant="contained" fullWidth>
          Submit
        </Button>
      </Box>
    </>
  );
}

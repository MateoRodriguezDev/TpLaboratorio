import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { User } from '../../models/UserModel';
import { useUserStore } from '../../stores/userStore';
import { useNavigate } from 'react-router-dom';

export default function CreateUserView() {
  const userState = useUserStore.getState()
  const navigate = useNavigate()

  const createUser = userState.createUser
  const editUser = userState.editUser

  //Variables que necesito para saber si estoy actualizando un producto
  const isEditing = userState.isEditing
  const editingUser = userState.editingUser



  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isEditing ?  editingUser : {
      email: '',
      password: '',
      role: ''
  },
  });

  const onSubmit = (data: User) => {
    if(isEditing){
      editUser(editingUser.id! ,{email: data.email, password: data.password, role: data.role})
    }else{
      createUser(data)
    }
    //Actualizo los productos
    userState.getAllUsers()
    navigate('/users')
    reset()
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ maxWidth: 400, mx: 'auto' }}>
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
      <Controller
        name="role"
        control={control}
        rules={{
          required: 'Role is required',
        }}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.role}>
            <InputLabel>Role</InputLabel>
            <Select {...field} label="Role">
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>
        )}
        
      />
      {errors.role && (
        <Box color="error.main" fontSize="0.875rem" mb={3} ml={1}>
          {errors.role.message}
        </Box>
      )}
      <Button type="submit" variant="contained" fullWidth>
        Submit
      </Button>
    </Box>
  );
}

import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { useUserStore } from '../stores/userStore';

type UserProps = {
  email: string;
  role: string;
  id: number
};

export default function UserCard({ email, role, id }: UserProps) {

  const userState = useUserStore.getState()
  const deleteUser = userState.deleteUser


  //Cambio las variables de edicion al clickear editar y voy a la vista del formulario de products
  const editing = () => {
   userState.changeRole(id)
  }


  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', my: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color={role === 'admin' ? 'success' : role === 'user' ? 'info' : 'secondary'} onClick={editing}>
          {role}
        </Button>
        <Button size="small" color="error" onClick={() => deleteUser(id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

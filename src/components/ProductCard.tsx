import { Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material';
import { useProductStore } from '../stores/productsStore';
import { useNavigate } from 'react-router-dom';

type ProductProps = {
  id: number,
  name: string;
  description: string;
  quantity: number;
  price: number;
};

export default function ProductCard({ id, name, description, quantity, price} : ProductProps) {

  const productState = useProductStore.getState()
  const deleteProduct = productState.deleteProduct

  //Navigate para redireccionar
  const navigate = useNavigate()

  //Cambio las variables de edicion al clickear editar y voy a la vista del formulario de products
  const editing = () => {
    productState.isEditing = true
    productState.editingProduct = { id, name, description, quantity, price}

    navigate('/createProduct')
  }

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', my: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {description}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            <strong>Quantity:</strong> {quantity}
          </Typography>
          <Typography variant="body1">
            <strong>Price:</strong> ${price.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={editing}>
          Edit
        </Button>
        <Button size="small" color="error" onClick={() => deleteProduct(id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

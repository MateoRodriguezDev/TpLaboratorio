import { isAxiosError } from "axios";
import { api } from "../api";
import { toast } from "react-toastify";
import { Product } from "../../models/ProductModel";

// funcion para crear productos
export async function createProduct(product: Product) {
  try {
    const { data } = await api.post<Product>(
      "products",
      product
    );

    toast.success('Product Created Successfully')
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
        toast.error(error.response.data.message)
    }
  }
}

// funcion para recibir todos los productos
export async function getAllProducts() {
  try {
    const { data } = await api.get<Product[]>("products");
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
        console.log(error.response.data.message)
    }
  }
}

// funcion para editar un producto
export async function editProduct(id: number, updatedProduct: Product) {
  try {
    const { data } = await api.patch<Product>(`products/${id}`, updatedProduct);
    toast.info(`Product Updated Successfully`)
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
        toast.error(error.response.data.message)
    }
  }
}

// funcion para borrar un producto
export async function deleteProduct(id: number) {
  try {
    const { data } = await api.delete<string>(`products/${id}`);
    toast.dark(`Product Deleted Successfully`)
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
        toast.error(error.response.data.message)
    }
  }
}

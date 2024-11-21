import { isAxiosError } from "axios";
import { api } from "../api";
import { toast } from "react-toastify";
import { User } from "../../models/UserModel";

// funcion para crear usuario
export async function createUser(user: User) {
  try {
    const { data } = await api.post<User>(
      "users",
      user
    );

    toast.success('User Created Successfully')
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
        toast.error(error.response.data.message)
    }
  }
}

// funcion para recibir todos los usuarios
export async function getAllUsers() {
  try {
    const { data } = await api.get<User[]>("users");
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
        console.log(error.response.data.message)
    }
  }
}

// funcion para editar un user
export async function editUser(id: number, updatedUser: User) {
  try {
    const { data } = await api.patch<User>(`users/${id}`, updatedUser);
    toast.info(`User Updated Successfully`)
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
        toast.error(error.response.data.message)
    }
  }
}

// funcion para cambiar rol a un user
export async function changeRole(id: number) {
  try {
    const { data } = await api.patch<User>(`users/role/${id}`);
    toast.info(`User Role Updated Successfully`)
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
        toast.error(error.response.data.message)
    }
  }
}

// funcion para borrar un user
export async function deleteUser(id: number) {
  try {
    const { data } = await api.delete<string>(`users/${id}`);
    toast.dark(`User Deleted Successfully`)
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
        toast.error(error.response.data.message)
    }
  }
}

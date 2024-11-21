import { isAxiosError } from "axios";
import { Credentials } from "../../models/AuthModel";
import { AuthResponseModel } from "../../models/AuthResponseModel";
import { api } from "../api";
import { toast } from "react-toastify";

// funcion para logearnos
export async function login(credentials: Credentials) {
  try {
    const { data } = await api.post<AuthResponseModel>(
      "/auth/login",
      credentials
    );

    toast.success('Login Successfully')
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
        toast.error(error.response.data.message)
    }
  }
}

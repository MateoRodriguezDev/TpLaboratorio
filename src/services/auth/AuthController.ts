import { isAxiosError } from "axios";
import { APIResponse } from "../../models/ApiResponseModel";
import { Credentials } from "../../models/AuthModel";
import { AuthResponseModel } from "../../models/AuthResponseModel";
import { api } from "../api";
import { toast } from "react-toastify";

// funcion para logearnos
export async function fetchLogin(credentials: Credentials) {
  try {
    const { data } = await api.post<APIResponse<AuthResponseModel>>(
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

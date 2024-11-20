import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { fetchLogin } from '../services/auth/AuthController';
import { Credentials } from '../models/AuthModel';

type AuthStore = {
  login: (credentials: Credentials) => Promise<void>
};

export const useAuthStore = create<AuthStore>()(
  devtools(() => ({

    //Guardo el token en el localStorage
    login: async (credentials: Credentials) => {
      const response = await fetchLogin(credentials)

      if(response){
          const token = response.token
          localStorage.setItem('token', token)
      }
    },

   
  }))
);

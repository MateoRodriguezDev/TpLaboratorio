import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Credentials } from '../models/AuthModel';
import { API } from '../services';

type AuthStore = {
  login: (credentials: Credentials) => Promise<void>
};

export const useAuthStore = create<AuthStore>()(
  devtools(() => ({

    //Guardo el token en el localStorage
    login: async (credentials: Credentials) => {
      const response = await API.login(credentials)

      if(response){
          const token = response.token
          localStorage.setItem('token', token)
      }
    },

   
  }))
);

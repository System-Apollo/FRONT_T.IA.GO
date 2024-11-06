import axios, { AxiosResponse } from "axios"
import { User } from "@/interfaces/UserCredentials"

const API = process.env.NEXT_PUBLIC_API_HOMOLOG_USER;

export const RegisterUser = async (credentials: User): Promise<AxiosResponse<any>> => {
    try {
      const response: AxiosResponse<any> = await axios.post(`${API}/register`, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  
  const api = {
    RegisterUser,
  };
  
  export default api;
  
    

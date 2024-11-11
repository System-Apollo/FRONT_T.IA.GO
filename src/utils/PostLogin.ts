import axios, { AxiosResponse } from "axios"
import { User } from "@/interfaces/UserCredentials"

const API = process.env.NEXT_PUBLIC_API_HOMOLOG;

export const LoginApi = async (credentials: User): Promise<AxiosResponse<any>> => {
    try {
      const response: AxiosResponse<any> = await axios.post(`${API}/auth/login`, credentials, {
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
    LoginApi,
  };
  
  export default api;
  
    

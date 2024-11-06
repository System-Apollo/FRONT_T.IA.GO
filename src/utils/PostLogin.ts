import axios, { AxiosResponse } from "axios"
import { User } from "@/interfaces/UserCredentials"

const API = process.env.NEXT_PUBLIC_API_HOMOLOG_USER;

interface LoginResponse {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }

export const Login = async (credentials: User): Promise<AxiosResponse<LoginResponse>> => {
    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(`${API}/auth/login`, credentials, {
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
    Login,
  };
  
  export default api;
  
    

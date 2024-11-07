import axios, { AxiosResponse } from "axios";
import { User } from "@/interfaces/UserCredentials";

const API = process.env.NEXT_PUBLIC_API_HOMOLOG_USER;

export const registerUser = async (userData: User): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await axios.post(`${API}/auth/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

const api = {
  registerUser,
};

export default api;
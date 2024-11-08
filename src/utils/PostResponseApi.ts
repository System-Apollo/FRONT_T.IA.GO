import axios, { AxiosResponse } from "axios"

interface ResponseAPi{
    resposta: string;
}

const API = process.env.NEXT_PUBLIC_API_HOMOLOG_USER;

export const ResponseApi = async (responseAPi: ResponseAPi): Promise<AxiosResponse<any>> => {
    try {
      const response: AxiosResponse<any> = await axios.post(`${API}/auth/`, responseAPi, {
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
    ResponseApi,
  };
  
  export default api;
  
    

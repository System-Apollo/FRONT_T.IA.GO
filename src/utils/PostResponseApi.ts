import axios, { AxiosResponse } from "axios";

interface ResponseAPi {
  pergunta: string;
  resposta?: string;
}

const API = process.env.NEXT_PUBLIC_API_HOMOLOG;

export const ResponseApi = async (responseAPi: ResponseAPi): Promise<AxiosResponse<any>> => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const response: AxiosResponse<any> = await axios.post(`${API}/main/pergunta`, responseAPi, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Erro ao enviar pergunta:', error);
    throw error;
  }
};

const api = {
  ResponseApi,
};

export default api;
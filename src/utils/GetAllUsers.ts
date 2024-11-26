import axios, { AxiosResponse } from 'axios';

const GetAllUsers = async (): Promise<AxiosResponse<any>> => {
  const API = process.env.NEXT_PUBLIC_API_HOMOLOG_USER;
  const token = localStorage.getItem("token");

  try {
    const response: AxiosResponse<any> = await axios.get(`${API}/users/view`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420",
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default GetAllUsers;

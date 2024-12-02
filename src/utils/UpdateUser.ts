import axios, { AxiosResponse } from "axios";
import { User } from "@/interfaces/UserCredentials";

const UpdateUser = async (email: string, userData: Partial<User>): Promise<AxiosResponse<any>> => {
  const API = process.env.NEXT_PUBLIC_API_HOMOLOG;
  const token = localStorage.getItem("token");

  try {
    const response: AxiosResponse<any> = await axios.put(
      `${API}/user/update/${email}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export default UpdateUser;


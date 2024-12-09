import axios, { AxiosResponse } from "axios";

const API = process.env.NEXT_PUBLIC_API_HOMOLOG;

export const uploadFile = async (file: File, company: string, confirm: boolean): Promise<AxiosResponse<any>> => {
    try {

        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("company", company);
        formData.append("confirm", confirm.toString());

        const response: AxiosResponse<any> = await axios.post(`${API}/upload/add`, formData, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                "Content-Type": "multipart/form-data",
                "ngrok-skip-browser-warning": "69420",
            },
        });

        return response;
    } catch (error) {
        console.error("File upload failed:", error);
        throw error;
    }
};

const uploadApi = {
    uploadFile,
};

export default uploadApi;

import { useState, useEffect, useRef } from "react";
import uploadApi from "@/utils/PostUpload";
import GetAllUsers from "@/utils/GetAllUsers";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [company, setCompany] = useState<string>("");
    const [companies, setCompanies] = useState<string[]>([]);
    const [confirm, setConfirm] = useState<boolean>(true);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null); // Referência para o modal

    useEffect(() => {
        if (isOpen) {
            const fetchCompanies = async () => {
                try {
                    const response = await GetAllUsers();
                    const users: Array<{ company_name: string }> = response.data.users;

                    const companyNames = Array.from(
                        new Set(users.map((user) => user.company_name).filter(Boolean))
                    );
                    setCompanies(companyNames);
                } catch (error) {
                    console.error("Erro ao buscar empresas:", error);
                }
            };

            fetchCompanies();
        }
    }, [isOpen]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !company) {
            setUploadStatus("Por favor, selecione um arquivo e uma empresa.");
            return;
        }

        try {
            setUploadStatus("Fazendo upload...");
            const response = await uploadApi.uploadFile(selectedFile, company, confirm);
            setUploadStatus("Upload concluído com sucesso!");
            console.log("Response:", response.data);
            // onClose();
        } catch (error) {
            setUploadStatus("Falha no upload. Tente novamente.");
            console.error("Upload failed:", error);
        }
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose(); // Fecha o modal se clicar fora do conteúdo
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleOverlayClick} // Detecta cliques fora do modal
        >
            <div
                ref={modalRef} // Referência para o conteúdo principal do modal
                className="bg-white rounded-lg p-6 w-96"
            >
                <h2 className="text-lg text-gray-700 p-2 font-semibold mb-4">Upload de Arquivo</h2>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="mb-4 block p-2 w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                />
                <select
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mb-4 block w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
                >
                    <option value="" disabled>
                        Selecione uma empresa
                    </option>
                    {companies.map((companyName, index) => (
                        <option key={index} value={companyName}>
                            {companyName}
                        </option>
                    ))}
                </select>
                <div className="mb-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={confirm}
                            onChange={(e) => setConfirm(e.target.checked)}
                            className="cursor-pointer"
                        />
                        <span className="text-gray-600">Confirmar upload</span>
                    </label>
                </div>
                {uploadStatus && <p className="text-sm text-green-400 mb-4">{uploadStatus}</p>}
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        onClick={handleUpload}
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
}

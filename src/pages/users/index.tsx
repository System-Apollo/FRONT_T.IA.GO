import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Modal from "@/components/modalEdit";
import GetAllUsers from "@/utils/GetAllUsers";
import UpdateUser from "@/utils/UpdateUser";
import { User } from "@/interfaces/UserCredentials";
import Link from "next/link";
import withAuth from "@/components/auth/withAuth";

function Users() {
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [userColors, setUserColors] = useState<Record<string, string>>({});
    const [updatedUser, setUpdatedUser] = useState<Partial<User>>({});
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [selectedCompany, setSelectedCompany] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    const filterData = () => {
        return data
            .filter((item) => {
                const matchesSearch =
                    item.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.company_name?.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesSearch;
            })
            .filter((item) => {
                if (selectedStatus === "all") return true;
                return String(item.is_activity).toLowerCase() === selectedStatus;
            })
            .filter((item) => {
                if (selectedCompany === "all") return true;
                return item.company_name === selectedCompany;
            });
    };

    const filteredData = filterData();

    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedStatus("all");
        setSelectedCompany("all");
    };

    const saveColorsToLocalStorage = (colors: Record<string, string>) => {
        localStorage.setItem("userColors", JSON.stringify(colors));
    };

    const loadColorsFromLocalStorage = (): Record<string, string> => {
        const storedColors = localStorage.getItem("userColors");
        return storedColors ? JSON.parse(storedColors) : {};
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetAllUsers();
                setData(response.data.users);
                console.log(response.data.users)

                const storedColors = loadColorsFromLocalStorage();

                const newColors: Record<string, string> = { ...storedColors };
                response.data.users.forEach((user: User) => {
                    if (user.username && !newColors[user.username]) {
                        newColors[user.username] = getRandomColor();
                    }
                });

                setUserColors(newColors);
                saveColorsToLocalStorage(newColors);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const openModal = (user: User) => {
        setSelectedUser(user);
        setUpdatedUser({
            ...user,
            is_activity: String(user.is_activity).toLowerCase() === "true",
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setUpdatedUser({});
        setIsModalOpen(false);
    };

    const handleInputChange = (field: keyof User, value: string | boolean) => {
        setUpdatedUser((prev) => ({ ...prev, [field]: value }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedUser && updatedUser) {
            try {
                const payload = {
                    ...updatedUser,
                    is_activity: updatedUser.is_activity === true,
                };
    
                const email = selectedUser.email || "";
                if (email) {
                    const response = await UpdateUser(email, payload);
                    console.log("Usuário atualizado:", response.data);
    
                    setData((prevData) =>
                        prevData.map((user) =>
                            user.email === selectedUser.email ? { ...user, ...payload } : user
                        )
                    );
    
                    closeModal();
                } else {
                    console.error("O e-mail do usuário está vazio ou indefinido.");
                }
            } catch (error) {
                console.error("Erro ao atualizar usuário:", error);
            }
        }
    };

    const getInitials = (name: string) => {
        const words = name.split(" ");
        const initials = words.map((word) => word[0]).join("").toUpperCase();
        return initials.length > 2 ? initials.slice(0, 2) : initials;
    };

    const getRandomColor = () => {
        const colors = [
            "bg-red-500",
            "bg-blue-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-purple-500",
            "bg-pink-500",
            "bg-indigo-500",
            "bg-teal-500",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <main className="min-h-screen bg-gradient-to-tr from-[#B2C0FF] to-[#F6F6F6] px-6">
            <Navbar />

            <section className="mb-8 mt-10">
                <h1 className="text-xl text-black font-semibold text-2xl mb-2">
                    Gerenciamento de Perfis
                </h1>
                <p className="text-sm md:text-lg text-gray-700">
                    O gerenciamento de perfis permite organizar e controlar as
                    informações de usuários de forma eficiente, promovendo uma
                    experiência mais segura e personalizada.
                </p>
            </section>

            <section className="mb-4">
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex-1 ml-12 max-w-xs">
                        <input
                            type="text"
                            placeholder="Pesquisar por usuário ou empresa..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600"
                        />
                    </div>

                    <div className="ml-60">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Todos os Status</option>
                            <option value="true">Ativo</option>
                            <option value="false">Inativo</option>
                        </select>
                    </div>

                    <div>
                        <select
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Todas as Empresas</option>
                            {Array.from(new Set(data.map((item) => item.company_name)))
                                .filter(Boolean)
                                .map((company, index) => (
                                    <option key={index} value={company}>
                                        {company}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <button
                        onClick={clearFilters}
                        className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Limpar filtros
                    </button>
                </div>
            </section>

            <div className="flex justify-end">
                <Link
                    href="/tiago"
                    className="text-blue-600 text-sm font-semibold underline"
                >
                    Ir para o Chat
                </Link>
            </div>

            <div className="flex justify-end mt-5">
                <Link
                    href="/admin"
                    className="text-blue-600 text-sm font-semibold underline"
                >
                    Ir para o pagina admin
                </Link>
            </div>

            <section className="rounded-lg p-6">
                <div className="md:p-6">
                    {loading ? (
                        <p className="text-gray-700">Carregando dados...</p>
                    ) : paginatedData.length > 0 ? (
                        <>
                            <div className="grid grid-cols-7 p-4 text-black font-semibold border border-gray-400 rounded-t-lg">
                                <p className="text-left">Usuário</p>
                                <p className="text-center">CPF/CNPJ</p>
                                <p className="text-center">Empresa</p>
                                <p className="text-center">Status</p>
                                <p className="text-center">Requisições</p>
                                <p className="text-center">Limites</p>
                                <p className="text-center">Ações</p>
                            </div>

                            <div className="flex flex-col">
                                {paginatedData.map((item, index) => {
                                    const initials = getInitials(item.username || "N/A");
                                    const color = item.username
                                        ? userColors[item.username] || "bg-gray-500"
                                        : "bg-gray-500";

                                    return (
                                        <div
                                            key={index}
                                            className="grid grid-cols-7 items-center p-4 text-black text-sm border-b border-gray-300 last:border-0"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`flex items-center justify-center w-8 h-8 rounded-full text-white ${color}`}

                                                >
                                                    {initials}
                                                </div>
                                                <p>{item.username}</p>
                                            </div>
                                            <p className="text-center">{item.cpf_cnpj}</p>
                                            <p className="text-center">{item.company_name}</p>
                                            <p className="text-center">
                                                {String(item.is_activity).toLowerCase() === "true" ? "Ativo" : "Inativo"}
                                            </p>
                                            <p className="text-center">{item.used_requests || 0}</p>
                                            <p className="text-center">{item.limit_requests || 0}</p>
                                            <div className="flex justify-center">
                                                <EllipsisVertical
                                                    className="text-gray-600 w-5 h-5 cursor-pointer hover:text-gray-800"
                                                    onClick={() => openModal(item)}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <p className="text-sm md:text-lg text-black w-full ">Nenhum dado encontrado...</p>
                    )}
                </div>
            </section>

            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                    <div className="flex items-center gap-2">
                        {currentPage > 1 && (
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                {"<"}
                            </button>
                        )}
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-600"}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        {currentPage < totalPages && (
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                {">"}
                            </button>
                        )}
                    </div>
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedUser && (
                    <div>
                        <div className="flex flex-col gap-2 mb-4 flex items-center justify-center">
                            <div
                                className={`flex items-center justify-center w-12 h-12 rounded-full text-white text-lg ${selectedUser.username
                                    ? userColors[selectedUser.username] || "bg-black"
                                    : "bg-black"
                                    }`}
                            >
                                {getInitials(selectedUser.username || "N/A")}
                            </div>
                            <h2 className="text-xl text-black">{selectedUser.username}</h2>
                            <h3 className="text-sm text-gray-300 font-light">{selectedUser.email}</h3>

                            <div className="flex gap-4 text-sm text-gray-500">
                                <div>
                                    <strong>Requisições: </strong>
                                    {selectedUser.used_requests || 0}
                                </div>
                                <div>
                                    <strong>Limites: </strong>
                                    {selectedUser.limit_requests || 0}
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600 font-medium mb-2">Usuário</label>
                                <input
                                    type="text"
                                    value={updatedUser.username || ""}
                                    onChange={(e) => handleInputChange("username", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600 font-medium mb-2">Cpf/Cnpj</label>
                                <input
                                    type="text"
                                    value={updatedUser.cpf_cnpj || ""}
                                    onChange={(e) => handleInputChange("cpf_cnpj", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600 font-medium mb-2">Empresa</label>
                                <input
                                    type="text"
                                    value={updatedUser.company_name || ""}
                                    onChange={(e) => handleInputChange("company_name", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-gray-600 font-medium mb-2">Status</label>
                                <select
                                    value={updatedUser.is_activity ? "Ativo" : "Inativo"}
                                    onChange={(e) => {
                                        const value = e.target.value === "Ativo";
                                        handleInputChange("is_activity", value);
                                    }}
                                    className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600"
                                >
                                    <option value="Ativo">Ativo</option>
                                    <option value="Inativo">Inativo</option>
                                </select>
                            </div>
                            <div className="flex gap-4 text-sm text-gray-500 mb-4">
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-600 font-medium mb-2">Requisições</label>
                                    <input
                                        type="number"
                                        value={updatedUser.used_requests || ""}
                                        onChange={(e) => handleInputChange("used_requests", e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600 text-center"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-600 font-medium mb-2">Limites</label>
                                    <input
                                        type="number"
                                        value={updatedUser.limit_requests || ""}
                                        onChange={(e) => handleInputChange("limit_requests", e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600 text-center"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="mr-2 text-gray-700 border text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>

                    </div>
                )}
            </Modal>
        </main>
    );
}

export default withAuth(Users);
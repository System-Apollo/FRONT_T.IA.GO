import withAuth from "@/components/auth/withAuth";
import Graph from "@/components/graph";
import Navbar from "@/components/navbar";
import { User } from "@/interfaces/UserCredentials";
import GetAllUsers from "@/utils/GetAllUsers";
import { useEffect, useState } from "react";
import UploadModal from "@/components/uploadModal";
import { Upload } from "lucide-react";
import Link from "next/link";

function Panel() {
    const [loading, setLoading] = useState(true);
    const [barChartData, setBarChartData] = useState<any>(null);
    const [pieChartData, setPieChartData] = useState<any>(null);
    const [lineChartData, setLineChartData] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetAllUsers();
                const users = response.data.users;

                // Agrupar usuários por empresa
                const companies = users.reduce((acc: Record<string, number>, user: User) => {
                    const companyName = user.company_name || "Não Informado";
                    acc[companyName] = (acc[companyName] || 0) + 1;
                    return acc;
                }, {});
                setBarChartData({
                    labels: Object.keys(companies),
                    datasets: [
                        {
                            label: "Quantidade de Usuários",
                            data: Object.values(companies),
                            backgroundColor: "#4caf50",
                        },
                    ],
                });

                // Dados do gráfico de pizza
                const activeUsers = users.filter((user: User) => String(user.is_activity).toLowerCase() === "true").length;
                const inactiveUsers = users.length - activeUsers;

                setPieChartData({
                    labels: ["Ativos", "Inativos"],
                    datasets: [
                        {
                            label: "Usuários",
                            data: [activeUsers, inactiveUsers],
                            backgroundColor: ["#4caf50", "#f44336"],
                            hoverOffset: 4,
                        },
                    ],
                });
                const companyLabels = Array.from(new Set(users.map((user: any) => user.company_name))).filter(Boolean);
                const limitData = companyLabels.map((company) =>
                    users
                        .filter((user: any) => user.company_name === company)
                        .reduce((sum: any, user: any) => sum + (user.limit_requests || 0), 0)
                );
                const usedData = companyLabels.map((company) =>
                    users
                        .filter((user: any) => user.company_name === company)
                        .reduce((sum: any, user: any) => sum + (user.used_requests || 0), 0)
                );

                setLineChartData({
                    labels: companyLabels,
                    datasets: [
                        {
                            label: "Limites",
                            data: limitData,
                            borderColor: "#2196f3",
                            fill: false,
                            tension: 0.4,
                        },
                        {
                            label: "Usados",
                            data: usedData,
                            borderColor: "#f44336",
                            fill: false,
                            tension: 0.4,
                        },
                    ],
                });
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-tr from-[#B2C0FF] to-[#F6F6F6] px-6">
            <Navbar />
            <section className="mb-8 mt-10">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xl text-black font-semibold text-2xl mb-2">
                            Gerenciamento de Perfis
                        </h1>
                        <p className="text-sm md:text-lg text-gray-700">
                            Visualize dados sobre usuários e empresas de forma eficiente.
                        </p>
                    </div>
                    <div className="flex">
                    <Link
                        href="/users"
                        className="text-blue-600 text-sm font-semibold text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600"
                    >
                        Admin
                    </Link>
                    <button
                        className="flex px-3 py-2 bg-blue-500 text-white rounded-lg ml-4 hover:bg-blue-600"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Upload /> Upload
                    </button>
                    </div>
                </div>

                <div className="flex justify-end mt-5">
                </div>
            </section>
            <section className="rounded-lg p-6">
                {loading ? (
                    <p className="text-gray-700">Carregando dados...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8">
                        <div className="flex flex-col items-center space-y-2">
                            <div className="flex flex-col items-center">
                                <h2 className="text-lg font-semibold text-black mb-4 text-center">
                                    Distribuição de Status
                                </h2>
                                <div className="w-65 h-40">
                                    <Graph type="pie" data={pieChartData} />
                                </div>
                            </div>
                            <div className="w-3/4">
                                <h2 className="text-lg font-semibold text-black mb-4 text-center">
                                    Usuários por Empresa
                                </h2>
                                <Graph type="bar" data={barChartData} options={{ indexAxis: "y" }} />
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="w-full mx-auto">
                                <h2 className="text-lg font-semibold text-black mb-4 text-center">
                                    Limites vs. Usados por Empresa
                                </h2>
                                <div className="w-90 h-50">
                                    <Graph type="line" data={lineChartData} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>
    );
}

export default withAuth(Panel);

import withAuth from "@/components/auth/withAuth";
import Graph from "@/components/graph";
import Navbar from "@/components/navbar";
import { User } from "@/interfaces/UserCredentials";
import GetAllUsers from "@/utils/GetAllUsers";
import { useEffect, useState } from "react";

function Panel() {
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [barChartData, setBarChartData] = useState<any>(null);
    const [pieChartData, setPieChartData] = useState<any>(null);
    const [lineChartData, setLineChartData] = useState<any>(null);
    const [radarChartData, setRadarChartData] = useState<any>(null);
    const [polarChartData, setPolarChartData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetAllUsers();
                const users = response.data.users;

                setData(users);

                // Dados para o gráfico de barras (usuários ativos/inativos)
                const activeUsers = users.filter((user: User) => String(user.is_activity).toLowerCase() === "true").length;
                const inactiveUsers = users.length - activeUsers;

                setBarChartData({
                    labels: ["Ativos", "Inativos"],
                    datasets: [
                        {
                            label: "Usuários",
                            data: [activeUsers, inactiveUsers],
                            backgroundColor: ["#4caf50", "#f44336"],
                        },
                    ],
                });

                // Dados para o gráfico de pizza (percentual de status)
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

                // Dados para o gráfico de linha (limites vs. usados por empresa)
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

                // Dados para o gráfico de radar
                setRadarChartData({
                    labels: companyLabels,
                    datasets: [
                        {
                            label: "Limites",
                            data: limitData,
                            backgroundColor: "rgba(33, 150, 243, 0.2)",
                            borderColor: "#2196f3",
                            borderWidth: 1,
                        },
                        {
                            label: "Usados",
                            data: usedData,
                            backgroundColor: "rgba(244, 67, 54, 0.2)",
                            borderColor: "#f44336",
                            borderWidth: 1,
                        },
                    ],
                });

                // Dados para o gráfico de Polar Area
                setPolarChartData({
                    labels: companyLabels,
                    datasets: [
                        {
                            label: "Proporção de Limites Usados",
                            data: companyLabels.map((_, index) =>
                                limitData[index] > 0 ? (usedData[index] / limitData[index]) * 100 : 0
                            ),
                            backgroundColor: [
                                "#ff6384",
                                "#36a2eb",
                                "#cc65fe",
                                "#ffce56",
                                "#ff9f40",
                                "#4bc0c0",
                                "#9966ff",
                            ],
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
                <h1 className="text-xl text-black font-semibold text-2xl mb-2">
                    Gerenciamento de Perfis
                </h1>
                <p className="text-sm md:text-lg text-gray-700">
                    Visualize dados sobre usuários e empresas de forma eficiente.
                </p>
            </section>
            <section className="rounded-lg p-6">
                {loading ? (
                    <p className="text-gray-700">Carregando dados...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8">
                        {/* Coluna Esquerda */}
                        <div className="flex flex-col items-center space-y-2">
                            {/* Gráfico de Pizza (Centralizado) */}
                            <div className="flex flex-col items-center">
                                <h2 className="text-lg font-semibold text-black mb-4 text-center">
                                    Distribuição de Status
                                </h2>
                                <div className="w-65 h-40">
                                    <Graph type="pie" data={pieChartData} />
                                </div>
                            </div>

                            {/* Gráfico de Barras (Reduzido) */}
                            <div className="w-3/4">
                                <h2 className="text-lg font-semibold text-black mb-4 text-center">
                                    Usuários Ativos/Inativos
                                </h2>
                                <Graph type="bar" data={barChartData} />
                            </div>
                        </div>

                        {/* Coluna Direita */}
                        <div className="space-y-8">
                            {/* Gráfico de Linha (Aumentado) */}
                            <div className="w-full mx-auto">
                                <h2 className="text-lg font-semibold text-black mb-4 text-center">
                                    Limites vs. Usados por Empresa
                                </h2>
                                <div className="w-90 h-50">
                                    <Graph type="line" data={lineChartData} />
                                </div>
                            </div>

                            {/* Gráficos de Radar e Polar Area */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Gráfico de Radar (Aumentado) */}
                                {/* <div>
                                    <h2 className="text-lg font-semibold text-black mb-4 text-center">
                                        Radar de Limites e Usados
                                    </h2>
                                    <div className="w-80 h-80">
                                        <Graph type="radar" data={radarChartData} />
                                    </div>
                                </div> */}

                                {/* Gráfico de Polar Area (Aumentado) */}
                                {/* <div>
                                    <h2 className="text-lg font-semibold text-black mb-4 text-center">
                                        Proporção de Limites Usados
                                    </h2>
                                    <div className="w-80 h-80">
                                        <Graph type="polarArea" data={polarChartData} />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                )}
            </section>

        </main>
    );
}

export default withAuth(Panel);

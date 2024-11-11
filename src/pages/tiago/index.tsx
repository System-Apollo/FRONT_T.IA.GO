import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import api from "../../utils/PostResponseApi";
import LogoTIAGO from "../../../public/logoTIAGO.svg";
import { ArrowLeft, UserRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Registrar componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Carregar o gráfico de forma dinâmica para desativar o SSR
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), { ssr: false });

interface Conversa {
  pergunta: string;
  resposta: string;
}

const App: React.FC = () => {
  const [pergunta, setPergunta] = useState<string>("");
  const [conversas, setConversas] = useState<Conversa[]>([]);
  const [digitando, setDigitando] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("online");
  const [dadosGrafico, setDadosGrafico] = useState<any>(null);
  const [mostrarGrafico, setMostrarGrafico] = useState<boolean>(false);

  const conversaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedConversas = localStorage.getItem("conversas");
      setConversas(savedConversas ? JSON.parse(savedConversas) : []);
    }
  }, []);

  useEffect(() => {
    conversaRef.current?.scrollTo({ top: conversaRef.current.scrollHeight, behavior: "smooth" });
  }, [conversas]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("conversas", JSON.stringify(conversas));
    }
  }, [conversas]);

  const handlePergunta = async () => {
    setDigitando(true);
    setStatus("digitando...");

    const newConversa = { pergunta, resposta: "" };
    setConversas((prev) => [...prev, newConversa]);

    console.log(pergunta);

    try {
      const response = await api.ResponseApi({ pergunta });
      const respostaRecebida = response.data.resposta;

      console.log(respostaRecebida);

      setDigitando(false);
      setStatus("online");
      setConversas((prev) => [
        ...prev.slice(0, -1),
        { pergunta, resposta: respostaRecebida },
      ]);

      if (response.data.grafico) {
        setDadosGrafico(response.data.grafico);
        console.log(response.data);
        setMostrarGrafico(true);
      }
      setPergunta("");
    } catch (error) {
      console.error("Erro ao enviar pergunta:", error);
    }
  };

  // Dados do gráfico configurados com base nos dados recebidos
  const data = {
    labels: ["Ativos", "Arquivados"],
    datasets: [
      {
        label: "Status dos Processos",
        data: dadosGrafico ? [dadosGrafico.ativos, dadosGrafico.arquivados] : [0, 0],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gradientlight min-h-screen">
      <header className="flex items-center flex-row justify-between w-full gap-2 p-3 text-gray-950">
        <div className="flex flex-row gap-2 items-center">
            <ArrowLeft />
            <Link href="/">
                <button>Voltar</button>
            </Link>
        </div>
        <Image src={'/mfname.svg'} width={120} height={90} alt="MF name" />
        <div className="bg-gray-300 p-1 rounded-lg">
          <UserRound />
        </div>
      </header>

      <div className="flex flex-row items-center justify-between">
        <img src={LogoTIAGO} height={150} width={150} alt="logo" className="h-10" />
        <h1 className="text-xl font-semibold">TIAGO</h1>
        <p className="text-green-500">{status}</p>

      </div>

      <div ref={conversaRef} className="w-full max-w-md mt-4 p-4 bg-white shadow-lg rounded-lg overflow-y-auto h-96">
        {conversas.map((conversa, index) => (
          <div key={index} className="mb-4">
            <p className="text-blue-600 font-medium">{conversa.pergunta}</p>
            <p className="text-gray-800">{conversa.resposta}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4 w-full max-w-md">
        <input
          name="pergunta"
          type="text"
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handlePergunta()}
          placeholder="Faça uma pergunta"
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        <button onClick={handlePergunta}>
          Enviar
        </button>
      </div>

      {mostrarGrafico && (
        <div className="mt-6 w-full max-w-lg h-64">
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default App;

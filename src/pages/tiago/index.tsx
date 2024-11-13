import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import api from "../../utils/PostResponseApi";
import LogoTIAGO from "../../../public/logoTIAGO.svg";
import { ArrowLeft, ReplyAll, UserRound } from "lucide-react";
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
  const [mostrarSaudacao, setMostrarSaudacao] = useState<boolean>(true);
  const [nomeUsuario, setNomeUsuario] = useState<string>("");

  // Estados para controlar o efeito de digitação
  const [textoSaudacao, setTextoSaudacao] = useState<string>("");
  const [textoMensagem, setTextoMensagem] = useState<string>("");
  const saudacao = `Olá, ${nomeUsuario}`;
  const mensagem = "Como posso te ajudar hoje?";

  const conversaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const usuario = localStorage.getItem("username") || "Fulana";
    setNomeUsuario(usuario)

    const savedConversas = localStorage.getItem("conversas");
    setConversas(savedConversas ? JSON.parse(savedConversas) : [])
  }, []);

  useEffect(() => {
    conversaRef.current?.scrollTo({ top: conversaRef.current.scrollHeight, behavior: "smooth" });
  }, [conversas]);

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

// Efeito de digitação
useEffect(() => {
  let index = 0;
  const interval = setInterval(() => {
    setTextoSaudacao(saudacao.slice(0, index));
    index++;
    if (index > saudacao.length) {
      clearInterval(interval);
    }
  }, 100);
  return () => clearInterval(interval);
}, [saudacao]);

useEffect(() => {
  let index = 0;
  const interval = setInterval(() => {
    setTextoMensagem(mensagem.slice(0, index));
    index++;
    if (index > mensagem.length) {
      clearInterval(interval);
    }
  }, 50);
  return () => clearInterval(interval);
}, [mensagem]);

  const handlePergunta = async () => {
    setDigitando(true);
    setStatus("digitando...");
    setMostrarSaudacao(false);

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
    <div className="flex flex-col min-h-screen bg-chat">
      {/* Tela de saudação ocupando toda a área sem scroll */}
      {mostrarSaudacao ? (
        <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden">
          {/* Header fixo no topo da tela */}
          <header className="flex items-center w-full bg-chat fixed top-0 z-10 justify-between gap-2 p-3 text-zinc-900">
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

          {/* Conteúdo de saudação centralizado */}
          <div className="flex flex-col items-center mt-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-blue-800">{saudacao}</h2>
            <h2 className="text-3xl md:text-4xl text-center font-semibold text-zinc-800">{textoMensagem}</h2>
          </div>
        </div>
      ) : (
        <>
          {/* Header fixo no topo na tela principal */}
          <header className="flex items-center flex-row justify-between w-full gap-2 p-3 text-zinc-900 fixed top-0 z-10 bg-chat">
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

          {/* Conteúdo principal abaixo do header fixo */}
          <div className="flex flex-col w-full max-w-1/2 items-center flex-grow pt-16 overflow-auto">
            <div ref={conversaRef} className="w-full p-4 max-w-3xl bg-transparent rounded-b-lg overflow-y-auto mb-12">
              {conversas.map((conversa, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-end">
                    <p className="text-zinc-600 font-medium bg-slate-200 p-2 rounded-lg max-w-xs text-right">
                      {conversa.pergunta}
                    </p>
                  </div>

                  <div className="flex flex-col justify-start mt-2 gap-2">
                    <div className="flex items-start flex-row justify-start gap-3">
                      <Image src={'/tiagoprofileblue.svg'} width={40} height={40} className="rounded-full border border-gray-700" alt="MF name" />
                      <p className="text-zinc-600 py-2 rounded-lg text-left">
                        {conversa.resposta}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Input fixo no rodapé, sempre visível */}
      <div className="fixed bottom-0 bg-chat left-1/2 transform -translate-x-1/2 md:w-1/2 w-full p-4 flex gap-2">
        <input
          name="pergunta"
          type="text"
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handlePergunta()}
          placeholder="Faça uma pergunta"
          className="flex-grow text-zinc-900 p-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        <button onClick={handlePergunta} className="bg-blue-900 text-white p-2 rounded-lg">
          Enviar
        </button>
      </div>
    </div>

  );
};

export default App;

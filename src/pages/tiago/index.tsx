import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import api from "../../utils/PostResponseApi";
import { ArrowLeft, ChartNoAxesCombined, SendHorizontal, UserRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
  const [tipoGrafico, setTipoGrafico] = useState<string>("");
  const [loadingDots, setLoadingDots] = useState<string>("");

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

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

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
      setPergunta("");

      setDigitando(false);
      setStatus("online");
      setConversas((prev) => [
        ...prev.slice(0, -1),
        { pergunta, resposta: respostaRecebida },
      ]);

      if (response.data.grafico) {
        const { dados, tipo } = configureGraficoData(response.data.grafico);
        if (response.data.grafico) {
          const { dados, tipo } = configureGraficoData(response.data.grafico);
          if (dados) {
            setDadosGrafico(dados); // Apenas defina se dados é válido
            setTipoGrafico(tipo);
            setMostrarGrafico(false); // Garante que o gráfico está oculto inicialmente
            console.log("Dados do gráfico definidos:", dados);
          }
        } else {
          setMostrarGrafico(false);
        }
      }
    } catch (error) {
      console.error("Erro ao enviar pergunta:", error);
    }
  };

  useEffect(() => {
    if (dadosGrafico) {
      setMostrarGrafico(false);
    }
  }, [dadosGrafico]);

  const toggleMostrarGrafico = () => {
    setMostrarGrafico((prev) => !prev);
  };

  const configureGraficoData = (graficoData: any) => {
    if (graficoData && 'ativos' in graficoData && 'arquivados' in graficoData) {
      return {
        dados: {
          labels: ["Processos Ativos", "Processos Arquivados"],
          datasets: [{
            label: "Quantidade de Processos",
            data: [graficoData.ativos, graficoData.arquivados],
            backgroundColor: ["#1FB4D3", "#1FB4D3"],
          }],
        },
        tipo: "Ativos e Arquivados",
      };
    } else if (graficoData["Data de cadastro_por_data"]) {
      return {
        dados: {
          labels: Object.keys(graficoData["Data de cadastro_por_data"]),
          datasets: [{
            label: "Processos Cadastrados",
            data: Object.values(graficoData["Data de cadastro_por_data"]),
            backgroundColor: "#1FB4D3",
          }],
        },
        tipo: "Cadastros por Data",
      };
    } else if (graficoData["Data de distribuição_por_data"]) {
      return {
        dados: {
          labels: Object.keys(graficoData["Data de distribuição_por_data"]),
          datasets: [{
            label: "Processos Distribuídos",
            data: Object.values(graficoData["Data de distribuição_por_data"]),
            backgroundColor: "#1FB4D3",
          }],
        },
        tipo: "Distribuídos por Data",
      };
    } else if (graficoData["Data de citação_por_data"]) {
      return {
        dados: {
          labels: Object.keys(graficoData["Data de citação_por_data"]),
          datasets: [{
            label: "Citações",
            data: Object.values(graficoData["Data de citação_por_data"]),
            backgroundColor: "#1FB4D3",
          }],
        },
        tipo: "Citações por Data",
      };
    } else if (graficoData.fases) {
      return {
        dados: {
          labels: Object.keys(graficoData.fases),
          datasets: [{
            label: "Processos por Fase",
            data: Object.values(graficoData.fases),
            backgroundColor: "#1FB4D3",
          }],
        },
        tipo: "Fases",
      };
    } else if (graficoData.orgaos) {
      return {
        dados: {
          labels: Object.keys(graficoData.orgaos),
          datasets: [{
            label: "Processos por Órgão",
            data: Object.values(graficoData.orgaos),
            backgroundColor: "#1FB4D3",
          }],
        },
        tipo: "Órgãos",
      };
    } else if (graficoData.sentencas) {
      return {
        dados: {
          labels: Object.keys(graficoData.sentencas),
          datasets: [{
            label: "Quantidade de Processos por Sentença",
            data: Object.values(graficoData.sentencas),
            backgroundColor: "#1FB4D3",
          }],
        },
        tipo: "Sentenças",
      };
    } else if (graficoData["Quantidade de Acordos"] && graficoData["Valor Total"]) {
      return {
        dados: {
          labels: ["Quantidade de Acordos", "Valor Total (R$)"],
          datasets: [{
            label: "Dados dos Acordos",
            data: [graficoData["Quantidade de Acordos"], graficoData["Valor Total"]],
            backgroundColor: ["1FB4D3F", "#4CAF50"],
          }],
        },
        tipo: "Acordos",
      };
    } else if (graficoData.condenacao_por_estado) {
      return {
        dados: {
          labels: Object.keys(graficoData.condenacao_por_estado),
          datasets: [{
            label: "Valor Total de Condenações (R$)",
            data: Object.values(graficoData.condenacao_por_estado),
            backgroundColor: "#1FB4D3",
          }],
        },
        tipo: "Condenação por Estado",
      };
    } else if (graficoData.valor_causa_por_estado) {
      return {
        dados: {
          labels: Object.keys(graficoData.valor_causa_por_estado),
          datasets: [{
            label: "Valor de Causa por Estado (R$)",
            data: Object.values(graficoData.valor_causa_por_estado),
            backgroundColor: "#1FB4D3",
          }],
        },
        tipo: "Valor de Causa por Estado",
      };
    } else if (graficoData.media_valor_causa_por_estado) {
      return {
        dados: {
          labels: Object.keys(graficoData.media_valor_causa_por_estado),
          datasets: [{
            label: "Média de Valor de Causa por Estado (R$)",
            data: Object.values(graficoData.media_valor_causa_por_estado),
            backgroundColor: "#1FB4D3",
          }],
        },
        tipo: "Média de Valor de Causa por Estado",
      };
    } else if (graficoData.transitados || graficoData.nao_transitados) {
      return {
        dados: {
          labels: ["Transitados em Julgado", "Não Transitados em Julgado"],
          datasets: [{
            label: "Quantidade de Processos",
            data: [graficoData.transitados, graficoData.nao_transitados],
            backgroundColor: ["1FB4D30", "#E91E63"],
          }],
        },
        tipo: "Transitado em Julgado",
      };
    } else if (graficoData.estados) {
      return {
        dados: {
          labels: Object.keys(graficoData.estados),
          datasets: [{
            label: "Processos por Estado",
            data: Object.values(graficoData.estados),
            backgroundColor: "#1FB4D3",
          }],
        },
        tipo: "Processos por Estado",
      };
    } else if (graficoData.reclamantes_multiplos) {
      return {
        dados: {
          labels: Object.keys(graficoData.reclamantes_multiplos),
          datasets: [{
            label: "Número de Processos",
            data: Object.values(graficoData.reclamantes_multiplos),
            backgroundColor: "#1FB4D3",
          }],
        },
        tipo: "Reclamantes com Mais de Um Processo",
      };
    } else if (graficoData.valor_condenacao_por_estado) {
      return {
        dados: {
          labels: Object.keys(graficoData.valor_condenacao_por_estado),
          datasets: [{
            label: "Valor de Condenação por Estado",
            data: Object.values(graficoData.valor_condenacao_por_estado),
            backgroundColor: "#1FB4D3",
          }],
        },
        tipo: "Valor de Condenação por Estado",
      };
    } else if (graficoData.duração_por_processo) {
      return {
        dados: {
          labels: Object.keys(graficoData.duração_por_processo),
          datasets: [{
            label: "Duração dos Processos (dias)",
            data: Object.values(graficoData.duração_por_processo),
            backgroundColor: "#1FB4D3",
          }],
        },
        tipo: "Duração dos Processos Arquivados",
      };
    } else if (graficoData.media_duracao_por_estado) {
      return {
        dados: {
          labels: Object.keys(graficoData.media_duracao_por_estado),
          datasets: [{
            label: "Média de Duração por Estado (dias)",
            data: Object.values(graficoData.media_duracao_por_estado),
            backgroundColor: "#1FB4D3",
          }],
        },
        tipo: "Média de Duração por Estado",
      };
    } else if (graficoData.valor_condenacao_por_comarca) {
      return {
        dados: {
          labels: Object.keys(graficoData.valor_condenacao_por_comarca),
          datasets: [{
            label: 'Valor Total de Condenação (R$)',
            data: Object.values(graficoData.valor_condenacao_por_comarca),
            backgroundColor: "#1FB4D3",
          }],
        },
        tipo: "Valor Total de Condenação por Comarca",
      }
    } else if (graficoData.media_duracao_por_comarca) {
      return {
        dados: {
          labels: Object.keys(graficoData.media_duracao_por_comarca),
          datasets: [{
            label: "Média de Duração por Comarca (dias)",
            data: Object.values(graficoData.media_duracao_por_comarca),
            backgroundColor: "#1FB4D3",
          }],
        },
        tipo: "Média de Duração por Comarca",
      };
    } else if (graficoData.processos) {
      return {
        dados: {
          labels: Object.keys(graficoData.processos).slice(0, 4),
          datasets: [{
            label: "Dias sem Movimentação",
            data: Object.values(graficoData.processos).slice(0, 4),
            backgroundColor: "#1FB4D3",
          }],
        },
        tipo: "Top 4 Processos com Maior Tempo sem Movimentação",
      };
    }
    return { dados: null, tipo: "" };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: tipoGrafico,
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
                <button className="hover:bg-gray-200 p-2 rounded-lg duration-150">Voltar</button>
              </Link>
            </div>
            <Image src={'/logoTIAGO.svg'} width={90} height={90} alt="MF name" />
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
                <button className="hover:bg-gray-200 p-2 rounded-lg duration-150">Voltar</button>
              </Link>
            </div>
            <Image src={'/logoTIAGO.svg'} width={90} height={90} alt="MF name" />
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
                      {digitando && (
                        <div className="flex justify-start">
                          <p className="text-zinc-600 font-medium bg-slate-200 p-2 rounded-lg max-w-xs text-left">
                            Processando{loadingDots}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {/* Exibir o gráfico somente se mostrarGrafico for true */}
              {mostrarGrafico && dadosGrafico && dadosGrafico.labels && (
                <div className="mt-10 w-full max-w-lg h-64 translate-y-[-10%] translate-x-[20%]">
                  <Bar data={dadosGrafico} options={options} />
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Input fixo no rodapé, sempre visível */}
      <div className="fixed flex flex-row items-center bottom-0 bg-chat left-1/2 transform -translate-x-1/2 w-full md:w-1/2 p-4 flex gap-2">
        <input
          name="pergunta"
          type="text"
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handlePergunta()}
          placeholder="Faça uma pergunta"
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        <button onClick={handlePergunta} className="bg-blue-900 hover:bg-blue-800 duration-150 flex flex-row items-center gap-1 text-white p-2 rounded-xl">
          Go
          <SendHorizontal />
        </button>
        {dadosGrafico && (
            <button
              onClick={toggleMostrarGrafico}
              className="bg-blue-900 text-white px-4 py-2 rounded-xl"
            >
              {mostrarGrafico ? "Ocultar Gráfico" : <ChartNoAxesCombined />}
            </button>
        )}
      </div>


    </div>

  );
};

export default App;

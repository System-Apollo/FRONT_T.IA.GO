import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import api from "../../utils/PostResponseApi";
import { ArrowLeft, ChartNoAxesCombined, SendHorizontal, UserRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import withAuth from "@/components/auth/withAuth";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), { ssr: false });

interface Conversa {
  pergunta: string;
  resposta: string;
  audiencias?: Audiencia[];
}

interface Audiencia {
  processo: string;
  data: string;
  local: string;
  foro: string;
  tipo: string;
  autor: string;
}

const App: React.FC = () => {
  const [pergunta, setPergunta] = useState<string>("");
  const [conversas, setConversas] = useState<Conversa[]>([]);
  const [digitando, setDigitando] = useState<boolean>(false);
  const [dadosGrafico, setDadosGrafico] = useState<any>(null);
  const [mostrarGrafico, setMostrarGrafico] = useState<boolean>(false);
  const [mostrarSaudacao, setMostrarSaudacao] = useState<boolean>(true);
  const [nomeUsuario, setNomeUsuario] = useState<string>("");
  const [tipoGrafico, setTipoGrafico] = useState<string>("");
  const [loadingDots, setLoadingDots] = useState<string>("");


  // Estados para controlar o efeito de digitação
  const [textoMensagem, setTextoMensagem] = useState<string>("");
  const saudacao = `Olá, ${nomeUsuario}`;
  const mensagem = "Como posso te ajudar hoje?";

  const conversaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (conversaRef.current) {
      conversaRef.current.scrollTo({
        top: conversaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [conversas]);

  // Carregar conversas do localStorage
  useEffect(() => {
    const usuario = localStorage.getItem("username") || "Fulana";
    setNomeUsuario(usuario);

    const savedConversas = localStorage.getItem("conversas");
    if (savedConversas) {
      setConversas(JSON.parse(savedConversas));
    }
    setMostrarSaudacao(false); // Desativa saudação após o carregamento inicial
  }, []);

  // Salvar conversas no localStorage sempre que forem atualizadas
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("conversas", JSON.stringify(conversas));
    }
  }, [conversas]);

  // Scroll automático para a última conversa
  useEffect(() => {
    if (conversaRef.current) {
      conversaRef.current.scrollTo({
        top: conversaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [conversas]);

  const handlePergunta = async () => {
    if (!pergunta.trim()) return; // Evitar perguntas vazias

    setDigitando(true);

    const newConversa = { pergunta, resposta: "" };
    setConversas((prev) => [...prev, newConversa]);

    try {
      const response = await api.ResponseApi({ pergunta });
      const respostaRecebida = response.data.resposta;

      // Processar audiências e formatar resposta
      const audiencias = parseAudiencias(respostaRecebida);

      // Atualizar conversa com audiências
      setPergunta("");
      setDigitando(false);
      setConversas((prev) => [
        ...prev.slice(0, -1),
        { pergunta, resposta: audiencias.length > 0 ? "" : respostaRecebida, audiencias },
      ]);

      // Adicionar gráfico se aplicável
      if (response.data.grafico) {
        const { dados, tipo } = configureGraficoData(response.data.grafico);
        if (dados) {
          setDadosGrafico(dados);
          setMostrarGrafico(true);
        }
      }
    } catch (error) {
      console.error("Erro ao enviar pergunta:", error);
      setDigitando(false);
    }
  };

  const parseAudiencias = (resposta: string): Audiencia[] => {
    const linhas = resposta.split("\n").filter((linha) => linha.trim() !== "");
    const audiencias: Audiencia[] = [];
    let audienciaAtual: Partial<Audiencia> = {};

    linhas.forEach((linha) => {
      if (linha.startsWith("Processo")) {
        if (audienciaAtual.processo) {
          audiencias.push(audienciaAtual as Audiencia);
        }

        const match = linha.match(/Processo (\S+) com audiência em (\S+)/);
        if (match) {
          audienciaAtual = {
            processo: match[1],
            data: match[2],
          };
        }
      } else if (linha.startsWith("Local:")) {
        audienciaAtual.local = linha.replace("Local:", "").trim();
      } else if (linha.startsWith("Foro:")) {
        audienciaAtual.foro = linha.replace("Foro:", "").trim();
      } else if (linha.startsWith("Tipo:")) {
        audienciaAtual.tipo = linha.replace("Tipo:", "").trim();
      } else if (linha.startsWith("Autor:")) {
        audienciaAtual.autor = linha.replace("Autor:", "").trim();
      }
    });

    if (audienciaAtual.processo) {
      audiencias.push(audienciaAtual as Audiencia);
    }

    return audiencias;
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
          <div
              ref={conversaRef}
              className="w-full p-4 max-w-3xl bg-transparent rounded-b-lg overflow-y-auto mb-12"
              style={{
                maxHeight: "calc(100vh - 200px)",
                scrollbarWidth: "thin",
                scrollbarColor: "#ecefff #ecefff",
              }}
            >
              {conversas.map((conversa, index) => (
                <div key={index} className="mb-4">
                  {/* Pergunta do usuário */}
                  <div className="flex justify-end">
                    <p className="text-zinc-600 font-medium bg-slate-200 p-2 rounded-lg max-w-sm text-right">
                      {conversa.pergunta}
                    </p>
                  </div>

                  {/* Resposta da API */}
                  {conversa.audiencias && conversa.audiencias.length > 0 ? (
                    <div className="mt-4 space-y-4">
                      {conversa.audiencias.map((audiencia, idx) => (
                        <div key={idx} className="p-4 bg-blue-200 rounded-lg shadow-md">
                          <p className="text-zinc-900" ><strong>Processo:</strong> {audiencia.processo}</p>
                          <p className="text-zinc-900"><strong>Data:</strong> {audiencia.data}</p>
                          <p className="text-zinc-900"><strong>Local:</strong> {audiencia.local || "Não informado"}</p>
                          <p className="text-zinc-900"><strong>Foro:</strong> {audiencia.foro}</p>
                          <p className="text-zinc-900"><strong>Tipo:</strong> {audiencia.tipo}</p>
                          <p className="text-zinc-900"><strong>Autor:</strong> {audiencia.autor}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-start flex-row justify-start gap-3 mt-2">
                      <Image
                        src={'/tiagoprofileblue.svg'}
                        width={40}
                        height={40}
                        className="rounded-full border border-gray-700"
                        alt="MF name"
                      />
                      <p className="text-zinc-600 py-2 rounded-lg text-left">
                        {index === conversas.length - 1 && digitando ? loadingDots : conversa.resposta}
                      </p>
                    </div>
                  )}
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
      <div className="fixed text-gray-600 flex flex-row items-center bottom-0 bg-chat left-1/2 transform -translate-x-1/2 w-full md:w-1/2 p-4 flex gap-2">
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
          GO
          <SendHorizontal />
        </button>
        {dadosGrafico && (
          <button
            onClick={toggleMostrarGrafico}
            className="bg-blue-900 text-white px-4 py-2 rounded-xl"
          >
            {mostrarGrafico ? "Ocultar" : <ChartNoAxesCombined />}
          </button>
        )}
      </div>
    </div>

  );
};

export default withAuth(App);

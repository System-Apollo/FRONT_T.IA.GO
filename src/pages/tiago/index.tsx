import { useState, useEffect, useRef } from "react";
import api from "../../utils/PostResponseApi";
import LogoTIAGO from "../../../public/logoTIAGO.svg";

interface Conversa {
  pergunta: string;
  resposta: string;
}

const App: React.FC = () => {
  const [pergunta, setPergunta] = useState<string>("");
  const [conversas, setConversas] = useState<Conversa[]>([]);
  const [digitando, setDigitando] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("online");
  const [dadosGrafico, setDadosGrafico] = useState<any>({});
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
        setMostrarGrafico(true);
      }
      setPergunta("");
    } catch (error) {
      console.error("Erro ao enviar pergunta:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <header className="flex items-center gap-2">
        <img src={LogoTIAGO} height={150} width={150} alt="logo" className="h-10" />
        <h1 className="text-xl font-semibold">TIAGO</h1>
        <p className="text-green-500">{status}</p>
      </header>

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

      {/* {mostrarGrafico && (
        <div className="mt-6 w-full max-w-lg">
          <Bar data={dadosGrafico} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      )} */}
    </div>
  );
};

export default App;

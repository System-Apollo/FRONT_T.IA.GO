import Image from "next/image";
import logoMF from "../../../public/logoMfDigital.svg"
import { useState } from "react";
import { registerUser } from './../../utils/PostReigisterUser';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Modal from "@/components/modal";
import { useRouter } from "next/router";

export default function Registro() {
    const [showModal, setShowModal] = useState(false);
    const router =useRouter();

    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        company: "",
        cpf_cnpj: "",
        email: "",
        password: "",
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        console.log(formData);
    
        try {
            const response = await registerUser({
                name: formData.name,
                last_name: formData.last_name,
                company: formData.company,
                email: formData.email,
                password: formData.password,
                cpf_cnpj: formData.cpf_cnpj
            });
            console.log("Login bem sucedido:", response.data);
            // alert(response.data.message);
            setShowModal(true);
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            alert("Falha no registro. Tente novamente.");
        }
    };

    const handleClickConfirm = () => {
        setShowModal(false);
        router.push("/login");
    }

    return (
        <main className="w-full flex">
            <div className="relative flex-1 flex-col hidden items-center justify-center h-screen bg-gradient lg:flex">
                <div className="absolute top-6 left-6 flex flex-row gap-2 items-center">
                    <ArrowLeft />
                    <Link href="/">
                        <button>Voltar</button>
                    </Link>
                </div>
                <div className="relative z-10 w-full max-w-md">
                    <Image src={logoMF} width={250} height={250} alt="logo" />
                    <div className=" mt-16 space-y-3">
                        <h3 className="text-white text-3xl font-semibold">Comece agora a potencializar suas análises</h3>
                        <p className="text-gray-300">
                            Entre com sua conta para ter acesso aos nossos benefícios ou crie uma nova conta e teste grátis por 7 dias.
                        </p>

                    </div>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center h-screen bg-white">
                <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                    <div className="">
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Criar uma conta</h3>
                            <p className="">Já tem uma conta? <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">Fazer login</Link></p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label className="font-medium">Nome</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-700 shadow-sm rounded-lg"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="font-medium">Sobrenome</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        required
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-700 shadow-sm rounded-lg"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label className="font-medium">Empresa</label>
                                    <input
                                        type="text"
                                        name="company"
                                        required
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-700 shadow-sm rounded-lg"
                                        value={formData.company}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="font-medium">Cpf/Cnpj</label>
                                    <input
                                        type="text"
                                        name="cpf_cnpj"
                                        required
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-700 shadow-sm rounded-lg"
                                        value={formData.cpf_cnpj}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <label className="font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-700 shadow-sm rounded-lg"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-700 shadow-sm rounded-lg"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="font-medium">Confirmar senha</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-700 shadow-sm rounded-lg"
                            />
                        </div>
                        <button
                            className="w-full px-4 py-2 text-white font-medium bg-blue-700 hover:bg-blue-600 active:bg-blue-600 rounded-lg duration-150"
                            type="submit"
                        >
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>
            <Modal
                title="Usuário criado com sucesso!"
                text={
                    <>
                      <p>Você está prestes a iniciar seu teste grátis de 7 dias com acesso à nossa IA. Durante este período, você poderá aproveitar alguns de nossos recursos, como:</p>
                      <ul className="list-disc list-inside ml-4">
                        <li>Direito a 2 gráficos.</li>
                        <li>20 processos para análise.</li>
                      </ul>
                      <p className="mt-4">Ao final dos 7 dias:</p>
                      <ul className="list-disc list-inside ml-4">
                        <li>Sua conta será desativada automaticamente.</li>
                        <li>Você não terá mais acesso à IA.</li>
                      </ul>
                      <p className="mt-4">Para continuar usando nossos serviços, será necessário entrar em contato com nossa empresa e solicitar um plano para ativar uma conta paga.</p>
                      <p className="mt-4">Quer continuar? Clique em "<strong>Confirmar</strong>" e faça login para iniciar seu teste grátis.</p>
                    </>
                  }
                buttonText="Confirmar"
                onClick={handleClickConfirm}
                // showCancelButton={false}
                open={showModal}
            />
        </main>
    )
}
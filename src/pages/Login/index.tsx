import Image from "next/image";
import logoMF from "../../../public/logoMfDigital.svg";
import logoTIAGO from "../../../public/logoTIAGO.svg"
import Link from "next/link";
import { useState } from "react";
import { LoginApi } from "@/utils/PostLogin";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import AlertDialog from "@/components/alertDialog";
import AlertDialog403 from "@/components/alertDialog403";


export default function Login() {
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [show403Dialog, setShow403Dialog] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
//Poh Leticia 2x
    const router = useRouter();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        console.log(formData);
    
        try {
            const response = await LoginApi({
                email: formData.email,
                password: formData.password,
            });
            // alert(response.data.message);
            console.log(response.data);
            localStorage.setItem("token", response.data.tokens.access_token);
            localStorage.setItem("username", response.data.username);
            router.push("./tiago");
        } catch (error: any) {
            console.error("Erro ao cadastrar:", error);
            // alert("Falha no registro. Tente novamente.");
            // setShowAlertDialog(true);


            if (error.response && error.response.status === 403) {
                setShow403Dialog(true); // Exibir modal para erro 403
            } else if(error.response && error.response.status === 401){
                setShowAlertDialog(true); // Exibir modal para outros erros
            }

        }
    };

    return (
        <main className="w-full flex">
            <div className="relative flex-1 hidden items-center justify-center h-screen bg-gradient lg:flex">
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
                        <Image src={logoTIAGO} width={150} height={150} alt="logoTIAGO"/>
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Login com email</h3>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <div>
                            <label className="font-medium">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-700 shadow-sm rounded-lg"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-700 shadow-sm rounded-lg"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <p className="">Não tem uma conta? <Link href="/registro" className="font-medium text-blue-600 hover:text-blue-500">Cadastre-se</Link></p>
                        <button
                            className="w-full px-4 py-2 text-white font-medium bg-blue-700 hover:bg-blue-600 active:bg-blue-600 rounded-lg duration-150"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
            <AlertDialog
                title="Erro ao fazer login"
                text="Não foi possível fazer login. Verifique suas credenciais."
                buttonText="Entendi"
                onClick={() => {setShowAlertDialog(false)}}
                showCancelButton={false}
                open={showAlertDialog}
                iconError={true}
            />
            <AlertDialog403
                title="Erro ao fazer login"
                text="Não foi possível fazer login. Entre em contato com o suporte para ativar sua conta."
                buttonText="Entendi"
                onClick={() => {setShow403Dialog(false)}}
                showCancelButton={false}
                open={show403Dialog}
                iconError={true}
            />
        </main>
    )
};

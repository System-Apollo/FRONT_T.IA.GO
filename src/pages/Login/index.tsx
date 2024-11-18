import Image from "next/image";
import logoMF from "../../../public/logoMfDigital.svg";
import logoTIAGO from "../../../public/logoTIAGO.svg"
import Link from "next/link";
import { useState } from "react";
import { LoginApi } from "@/utils/PostLogin";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import AlertDialog from "@/components/alertDialog";


export default function Login() {
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            // alert("Falha no registro. Tente novamente.");
            setShowAlertDialog(true);
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
                            <div className="relative mt-2">
                                <input                                     
                                    id="hs-toggle-password"
                                    name="password"
                                    type={isPasswordVisible ? "text" : "password"}
                                    className="py-2 ps-4 pe-10 block w-full text-gray-500 bg-transparent outline-none border focus:border-blue-700 shadow-sm rounded-lg"
                                    value={formData.password}
                                    onChange={handleChange}
                                    />
                                <button
                                    type="button"
                                    onClick={() => setIsPasswordVisible((prev) => !prev)} 
                                    className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                                >
                                    {isPasswordVisible ? (
                                        <svg
                                            className="shrink-0 size-3.5"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    ) : (
                                        <svg
                                            className="shrink-0 size-3.5"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                            <line x1="2" x2="22" y1="2" y2="22"></line>
                                        </svg>
                                    )}
                                </button>
                            </div>
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
                text="Não foi possível fazer login. Verifique sua conexão ou tente novamente mais tarde."
                buttonText="Entendi"
                onClick={() => {setShowAlertDialog(false)}}
                showCancelButton={false}
                open={showAlertDialog}
                iconError={true}
            />
        </main>
    )
};

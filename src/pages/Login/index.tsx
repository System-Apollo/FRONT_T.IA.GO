import Image from "next/image";
import logoMF from "../../../public/logoMfDigital.svg";
import logoTIAGO from "../../../public/logoTIAGO.svg"
import Link from "next/link";


export default function Login() {
    return (
        <main className="w-full flex">
            <div className="relative flex-1 hidden items-center justify-center h-screen bg-gradient lg:flex">
                <div>

                    {/* <p>Voltar</p> */}
                </div>
                <div className="relative z-10 w-full max-w-md">
                    <Image src={logoMF} width={250} height={250} alt="logo" />
                    <div className=" mt-16 space-y-3">
                        <h3 className="text-white text-3xl font-bold">Comece agora a potencializar suas análises</h3>
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
                        onSubmit={(e) => e.preventDefault()}
                        className="space-y-5"
                    >
                        <div>
                            <label className="font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-700 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-700 shadow-sm rounded-lg"
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
        </main>
    )
};
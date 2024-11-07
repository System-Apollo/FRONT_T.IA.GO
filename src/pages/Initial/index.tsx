import Navbar from "@/compotents/Navbar";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Initial() {
    const [state, setState] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <>
            <div className="relative w-full bg-gradient overflow-hidden">
                <div className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-50 pointer-events-none"
                     style={{
                         backgroundImage: "url('/OvalBase.svg')",
                         backgroundPosition: "left center",
                     }}
                ></div>

                <Navbar />
                <section className="py-28 w-full relative z-10">
                    <div className="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
                        <div
                            className={`flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl transform transition-all duration-700 ease-in-out ${
                                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                            }`}
                        >
                            <h1 className="text-sm text-gradient font-bold text-xl">T.IA.GO</h1>
                            <h2 className="text-4xl text-indigo-50 font-medium md:text-5xl">
                                Seu assistente inteligente para potenciar suas análises
                            </h2>
                            <p className="text-gradient">Inteligência Artificial Generativa</p>
                            <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                                <a
                                    href="javascript:void(0)"
                                    className="block py-2 px-4 text-center text-white font-medium bg-blue-700 duration-150 hover:bg-blue-600 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none"
                                >
                                    Cadastrar
                                </a>
                                <a
                                    href="javascript:void(0)"
                                    className="flex items-center justify-center bg-indigo-50 text-blue-700 gap-x-2 py-2 px-4 hover:text-blue-500 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex"
                                >
                                    Conversar com Tiago
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div
                            className={`flex items-center justify-center mt-14 md:mt-0 md:max-w-xl transform transition-all duration-700 ease-in-out ${
                                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                            }`}
                        >
                            <img src="/messageframe.svg" alt="Icon" className="w-3/4 h-1/4" />
                        </div>
                    </div>
                    <div
                        className={`flex justify-center items-center mt-8 px-4 md:px-8 transform transition-all duration-700 ease-in-out ${
                            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                        }`}
                    >
                        <button>
                            <ChevronDown className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
}

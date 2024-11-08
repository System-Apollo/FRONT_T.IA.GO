import { useEffect, useState, useRef } from 'react';

export default function Planos() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const currentSectionRef = sectionRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting);
                });
            },
            { threshold: 0.2 }
        );

        if (currentSectionRef) {
            observer.observe(currentSectionRef);
        }

        return () => {
            if (currentSectionRef) {
                observer.unobserve(currentSectionRef);
            }
        };
    }, []);

    const plans = [
        {
            name: "Plano Trainee",
            desc: "Ideal para conhecer o TIAGO. Gratuito por apenas 7 dias.",
            price: 0,
            isMostPop: false,
            features: [
                "1 usuário",
                "2 gráficos",
                "Implantação automática",
                "Limitado a 20 processos",
                "Ilimitado por 7 dias",
            ],
        },
        {
            name: "Plano Assistente",
            desc: "Ideal para clientes com até 500 processos ativos.",
            price: "2.500,00",
            isMostPop: true,
            features: [
                "1 usuário",
                "2 gráficos",
                "Implantação em até 30 dias",
                "Limitado a 500 processos",
                "Até 200 perguntas (tokens)",
                "Suporte pelo Whatsapp",
            ],
        },
        {
            name: "Plano Analista",
            desc: "Ideal para clientes com até 2000 processos ativos.",
            price: "5.000,00",
            isMostPop: false,
            features: [
                "1 usuário",
                "7 gráficos",
                "Implantação em até 30 dias",
                "Limitado a 200 processos",
                "Até 400 perguntas (tokens)",
                "Suporte pelo Whatsapp",
                "Acesso via Telegram",
            ],
        },
    ];

    return (
        <section id='planos' ref={sectionRef} className="py-14 bg-gradient w-full">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className={`relative max-w-xl mx-auto sm:text-center transform transition-all duration-700 ease-in-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
    >
                    <h3 className="text-indigo-50 text-3xl font-semibold sm:text-4xl">
                        Nossos planos
                    </h3>
                    <div className="mt-3 max-w-xl text-gray-400">
                        <p>Escolha o plano ideal e o seu investimento em Tecnologia Jurídica</p>
                    </div>
                </div>
                <div className="mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
                    {plans.map((item, idx) => (
                        <div
                            key={idx}
                            className={`relative flex-1 flex items-stretch flex-col rounded-xl border border-gray-700 bg-dark mt-6 sm:mt-0 transform transition-all duration-700 ease-in-out ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            } ${item.isMostPop ? "mt-10" : ""}`}
                        >
                            {item.isMostPop ? (
                                <span className="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border border-gray-700 shadow-md bg-gray-700 text-center text-indigo-50 text-sm font-semibold">
                                    Mais popular
                                </span>
                            ) : (
                                ""
                            )}
                            <div className="p-8 space-y-4 border-b border-gray-700">
                                <span className="text-gradient font-medium">{item.name}</span>
                                <div className="text-indigo-100 text-3xl font-semibold">
                                    R$ {item.price} <span className="text-xl text-gray-600 font-normal">/mês</span>
                                </div>
                                <p className="text-gray-400">{item.desc}</p>
                                <button className="px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-gray-800 bg-indigo-100 hover:text-gray-600 active:bg-indigo-700">
                                    Começar
                                </button>
                            </div>
                            <ul className="p-8 space-y-3">
                                <li className="pb-2 text-indigo-100 font-medium">
                                    <p>Acompanha</p>
                                </li>
                                {item.features.map((featureItem, idx) => (
                                    <li key={idx} className="flex items-center text-gray-400 gap-5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-green-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        {featureItem}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

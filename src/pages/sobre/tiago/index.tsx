import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function Tiago() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const currentSectionRef = sectionRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false);
                    }
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

    return (
        <section 
            ref={sectionRef}
            className="bg-gradient w-full text-white py-20">
            <div className="max-w-6xl mx-auto px-4">
                <div className="bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg p-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-0 shadow-lg">
                    <div className={`flex-shrink-0 md:-translate-x-20 w-48 h-48 md:w-80 md:h-80 bg-none rounded-lg overflow-hidden flex items-center justify-center transform transition-all duration-700 ease-in-out ${
                        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                    }`}>
                        <Image src={'/tiagoprofile.svg'} width={350} height={350} alt="logo" />
                    </div>
                    <div className={`flex-1 space-y-4 md:my-6 transform transition-all duration-700 ease-in-out ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                        <h3 className="text-blue-400 uppercase text-sm font-semibold">Conheça o TIAGO</h3>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Quem é Tiago?</h2>
                        <p className="text-gray-400">
                            Com 32 anos, Tiago é especializado em simplificar a vida do setor jurídico das empresas, oferecendo um atendimento diferenciado.
                            Ele é advogado, com um sólido entendimento de processos jurídicos, e possui especialização em tecnologia da informação e análises de dados.
                        </p>
                        <p className="text-gray-400">
                            Moderno, simpático e intelectualmente curioso, Tiago está sempre pronto para entregar soluções eficientes e inovadoras.
                        </p>
                        <p className="text-gray-400">
                            Com seu toque pessoal, ele facilita a interação com os usuários de forma amigável e eficaz, tornando a experiência de uso mais fluida e acessível.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

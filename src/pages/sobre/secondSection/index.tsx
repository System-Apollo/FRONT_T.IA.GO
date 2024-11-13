import { useEffect, useState, useRef } from 'react';

export default function SecondSection() {
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
            { threshold: 0.4 }
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
            className="relative overflow-hidden py-28 px-4 bg-gray-900 md:px-8 w-full"
            style={{
                backgroundImage: "url('/backgroundimg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            {/* Overlay azul */}
            <div className="absolute inset-0 bg-blue-500 opacity-50"></div>

            <div className="w-full h-full rounded-full bg-gradient-to-r from-[#58AEF1] to-pink-500 absolute -top-12 -right-14 blur-2xl opacity-10"></div>
            
            <div className="max-w-xl mx-auto text-center relative z-10">
                <div className="py-4">
                    <h3 className={`text-3xl text-white font-semibold md:text-4xl transform transition-all duration-700 ease-in-out ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                        Jurídico orientado a objetos
                    </h3>
                    <p className={`text-white leading-relaxed mt-3 transform transition-all duration-700 ease-in-out ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                        Com nossa inteligência artificial generativa, você tem acesso às análises, reports e acompanhamentos dos seus processos, dando assertividade e agilidade para as tomadas de decisões.
                    </p>
                </div>
                <div className="mt-5 items-center justify-center gap-3 sm:flex">
                    <a 
                        href="javascript:void()"
                        className={`block w-full mt-2 py-2.5 px-8 text-blue-700 hover:text-blue-500 bg-indigo-50 rounded-md font-medium duration-150 sm:w-auto transform transition-all duration-700 ease-in-out ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}
                    >
                        Conhecer planos
                    </a>
                </div>
            </div>
        </section>
    );
}

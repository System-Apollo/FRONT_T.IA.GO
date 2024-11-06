export default function SecondSection () {
    return (
        <section 
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
                    <h3 className="text-3xl text-gray-200 font-semibold md:text-4xl">
                        Jurídico orientado a objetos
                    </h3>
                    <p className="text-gray-300 leading-relaxed mt-3">
                        Com nossa inteligência artificial generativa, você tem acesso às analises, reports e acompanhamentos dos seus processos, dando assertividade e agilidade para as tomadas de decisões.
                    </p>
                </div>
                <div className="mt-5 items-center justify-center gap-3 sm:flex">
                    <a 
                        href="javascript:void()"
                        className="block w-full mt-2 py-2.5 px-8 text-blue-700 hover:text-blue-600 bg-white rounded-md font-medium duration-150 hover:bg-gray-100 sm:w-auto"
                    >
                        Conhecer planos
                    </a>
                    {/* <a
                        href="javascript:void()"
                        className="block w-full mt-2 py-2.5 px-8 text-gray-300 bg-gray-700 rounded-md duration-150 hover:bg-gray-800 sm:w-auto"
                    >
                        Get Started
                    </a> */}
                </div>
            </div>
        </section>
    )
}

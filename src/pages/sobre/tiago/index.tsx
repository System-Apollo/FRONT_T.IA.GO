import Image from 'next/image';

export default function Tiago() {
    return (
        <section className="bg-gradient w-full text-white py-20">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
                <div className="flex-shrink-0 w-48 h-48 md:w-80 md:h-80 bg-none rounded-lg overflow-hidden flex items-center justify-center">
                    <Image src={'/tiagoprofile.svg'} width={350} height={350} alt="logo" />
                </div>
                <div className="flex-1 space-y-4 ">
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
        </section>

    )
}

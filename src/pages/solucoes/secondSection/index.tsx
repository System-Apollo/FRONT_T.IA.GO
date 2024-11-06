import Image from "next/image"

export default function SecondSection () {
    return (
        <section className="py-28 w-full">
            <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
                <div className="max-w-xl space-y-3 md:mx-auto">
                    <h3 className="text-gradient font-semibold">
                        Praticidade
                    </h3>
                    <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        Otimize sua análise de dados
                    </p>
                    <p className="text-gray-600">
                    Conectando-se diretamente à base de dados da sua empresa ou setor, possibilitando analises de forma ágil e acessível, além de gerar gráficos e relatórios para suporte na tomada de decisão.
                    </p>
                </div>
                <div className="flex justify-center items-center mt-20">
                    <Image src={'/graphicframe.svg'} width={550} height={250} alt="logo" />
                </div>
            </div>
        </section>
    )
}
import { Inter } from 'next/font/google';
import Initial from './initial';
import Sobre from './sobre';
import Solucoes from './solucoes';
import Suporte from './suporte';
import Footer from './footer';
import Planos from './planos';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between font-sans ${inter.className}`}>
      <Head>
        <title>mftiago</title>
        <meta name="description" content="Plataforma de chat interativo com visualização de dados e gráficos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Initial />
      <Sobre />
      <Solucoes />
      <Planos />
      <Suporte />
      <Footer />
    </main>
  );
}

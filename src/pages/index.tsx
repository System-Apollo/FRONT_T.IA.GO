import { Inter } from 'next/font/google';
import Initial from './initial'
import Sobre from './sobre';
import Solucoes from './solucoes';
import Suporte from './suporte';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between font-sans ${inter.className}`}>
      <Initial/>
      <Sobre/>
      <Solucoes/>
      <Suporte/>
    </main>
  );
}

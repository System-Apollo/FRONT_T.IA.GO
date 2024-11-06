import { Inter } from 'next/font/google';
import FirstSection from './firstSection';
import SecondSection from './secondSection';

const inter = Inter({ subsets: ['latin'] });

export default function Sobre() {
  return (
    <>
      <FirstSection/>
      <SecondSection/>
    </>
  );
}

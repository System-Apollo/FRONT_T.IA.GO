import Image from 'next/image';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {

    return (
        <footer className="text-gray-500 bg-gradient px-4 py-5 w-full mx-auto md:px-8">
            <div className="max-w-lg mx-auto flex mt-4 flex-col items-start text-start md:items-center md:text-center">
                <Image src={'/mfdigitallaw.svg'} width={200} height={250} alt="logo" />
                <p className="leading-relaxed mt-2 text-indigo-200 text-[15px]">
                    O futuro do direito é digital com MF Digital Law: eficiência e resultados.
                </p>
            </div>
            <div className="mt-8 py-6 border-t border-slate-700 items-center justify-between sm:flex">
                <div className="mt-4 sm:mt-0 text-indigo-100">
                    &copy; 2022 Float UI All rights reserved.
                </div>
                <div className="mt-6 sm:mt-0">
                    <ul className="flex items-center space-x-4">
                        <li className="w-10 h-10  flex items-center justify-center">
                            <a href="https://instagram.com">
                                <FaInstagram className="text-indigo-100 w-6 h-6" />
                            </a>
                        </li>
                        <li className="w-10 h-10  flex items-center justify-center">
                            <a href="https://linkedin.com">
                                <FaLinkedin className="text-indigo-100 w-6 h-6" />
                            </a>
                        </li>
                        <li className="w-10 h-10  flex items-center justify-center">
                            <a href="mailto:your-email@example.com">
                                <FaEnvelope className="text-indigo-100 w-6 h-6" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); 
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    if (isSmallScreen) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <nav className="bg-none w-full z-10">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image src="/mfdigitallaw.svg" alt="Logo" width={160} height={50} />
        </div>

        {/* Navegação em telas grandes com espaçamento adicional */}
        <div className="hidden md:flex space-x-8 lg:space-x-16">
          <a href="#home" className="text-gray-300 hover:text-blue-500 px-4">
            Home
          </a>
          <a href="#sobre" className="text-gray-300 hover:text-blue-500 px-4">
            Sobre
          </a>
          <a href="#planos" className="text-gray-300 hover:text-blue-500 px-4">
            Nossos planos
          </a>
          <a href="#suporte" className="text-gray-300 hover:text-blue-500 px-4">
            Suporte
          </a>
        </div>

        {/* Botão em telas grandes */}
        <div className="hidden md:flex ml-4">
            <button className="bg-blue-500 text-white bg-blue-700 duration-150 hover:bg-blue-600 active:bg-indigo-700 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                Teste grátis
            </button>
        </div>

        {/* Botão de Menu Responsivo */}
        {isSmallScreen && (
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Menu Dropdown em telas pequenas */}
      {isOpen && isSmallScreen && (
        <div className="md:hidden w-full bg-dark border-t border-gray-400">
          <div className="px-4 py-4 pt-2 pb-3 flex flex-col items-center space-y-4 w-full">
            <a href="#home" className="block text-gray-600 hover:text-blue-500">
              Home
            </a>
            <a href="#sobre" className="block text-gray-600 hover:text-blue-500">
              Sobre
            </a>
            <a href="#planos" className="block text-gray-600 hover:text-blue-500">
              Nossos planos
            </a>
            <a href="#suporte" className="block text-gray-600 hover:text-blue-500">
              Suporte
            </a>
          </div>
          <div className="px-4 py-3">
            <button className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
              Teste grátis
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

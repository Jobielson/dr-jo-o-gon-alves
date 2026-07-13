import React from 'react';
import { Phone } from 'lucide-react';
import JGLogo from './JGLogo';

interface HeaderProps {
  onContactClick: () => void;
  customLogo?: string | null;
}

export default function Header({ onContactClick, customLogo }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#fdfbf7]/90 backdrop-blur-md border-b border-[#4c2f1a]/10 py-4 px-6 md:px-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10">
            {customLogo ? (
              <img 
                src={customLogo} 
                alt="Logo Customizada" 
                className="w-10 h-10 object-contain rounded-full border border-[#4c2f1a]/15 shadow-sm"
              />
            ) : (
              <JGLogo size="100%" className="w-full h-full" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-semibold text-lg tracking-wide text-[#2c1b10]">
              Dr. João Gonçalves
            </span>
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#4c2f1a]/70 font-medium -mt-1">
              Advocacia Humanizada
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2c1b10]/80">
          <a href="#solucoes" className="hover:text-[#a36c3b] transition-colors">Soluções</a>
          <a href="#sobre" className="hover:text-[#a36c3b] transition-colors">Por Que Nós</a>
          <a href="#como-funciona" className="hover:text-[#a36c3b] transition-colors">Atendimento</a>
          <a href="#depoimentos" className="hover:text-[#a36c3b] transition-colors">Opiniões</a>
          <a href="#faq" className="hover:text-[#a36c3b] transition-colors">Dúvidas</a>
        </nav>

        <button
          onClick={onContactClick}
          className="flex items-center gap-1.5 bg-[#4c2f1a] hover:bg-[#2c1b10] text-[10px] sm:text-xs font-semibold uppercase tracking-wider py-2 px-3 sm:py-2.5 sm:px-5 rounded-sm transition-all duration-300 border border-[#4c2f1a] hover:border-[#2c1b10] shadow-sm cursor-pointer shrink-0 text-[#fdfbf7]"
        >
          <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">Falar com o Dr. João</span>
          <span className="sm:hidden">Consultar</span>
        </button>
      </div>
    </header>
  );
}

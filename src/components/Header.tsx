import React, { useState, useEffect } from 'react';
import { Cpu, Menu, X, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import { GlowLetters } from './GlowLetters';
import { FloatingButton } from './FloatingButton';

interface HeaderProps {
  onOpenContact: () => void;
  onReplayIntro: () => void;
  onOpenAdminPanel: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact, onReplayIntro, onOpenAdminPanel }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Soluções', href: '#solucoes' },
    { label: 'Sobre Nós', href: '#sobre-nos' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 pointer-events-auto border ${
          isScrolled
            ? 'bg-[#0B0820]/90 backdrop-blur-xl border-purple-500/25 shadow-xl shadow-purple-950/40 py-2.5 px-4 sm:px-6'
            : 'bg-[#0B0820]/60 backdrop-blur-md border-white/10 py-3 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Brand Zone */}
          <a
            href="#inicio"
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#2563EB] p-[1px] shadow-sm shadow-[#7C3AED]/50">
              <div className="w-full h-full bg-[#080611] rounded-[7px] flex items-center justify-center transition-colors duration-200 group-hover:bg-[#111027]">
                <Cpu className="w-4 h-4 text-[#38BDF8]" />
              </div>
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
              <GlowLetters text="NEXORA" glowColor="purple" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8]">
                <GlowLetters text="AI" glowColor="cyan" />
              </span>
            </span>
          </a>

          {/* Navigation Links - Center */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium text-[#D1D5DB]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 hover:text-white transition-colors duration-200 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Zone */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Developer Admin Button right next to Intro */}
            <FloatingButton
              variant="glass"
              onClick={onOpenAdminPanel}
              title="Painel Admin do Desenvolvedor (Chave: kenyseixas20)"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-purple-300 hover:text-white border-purple-500/40 bg-purple-950/40 hover:bg-purple-900/60"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span className="whitespace-nowrap font-medium">Admin</span>
            </FloatingButton>

            <FloatingButton
              variant="glass"
              onClick={onReplayIntro}
              title="Ver introdução cinematográfica"
              className="hidden sm:flex px-3 py-1.5 text-xs text-[#A1A1AA] hover:text-white"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span className="whitespace-nowrap">Intro</span>
            </FloatingButton>

            <FloatingButton
              variant="primary"
              onClick={onOpenContact}
              className="px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap"
            >
              <span>Falar com a Nexora</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-purple-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </FloatingButton>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-[#D1D5DB] hover:text-white focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-[#D1D5DB] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminPanel();
              }}
              className="flex items-center gap-2 px-3 py-2 text-sm text-purple-300 hover:text-white hover:bg-purple-900/20 rounded-lg transition-colors text-left cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              Painel Admin (Desenvolvedor)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReplayIntro();
              }}
              className="flex items-center gap-2 px-3 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left"
            >
              <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
              Ver Introdução Cinematográfica
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

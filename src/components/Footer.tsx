import React from 'react';
import { Cpu, Linkedin, Instagram, MessageCircle, ArrowUp, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
  onReplayIntro: () => void;
  onOpenAdminPanel?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onReplayIntro, onOpenAdminPanel }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#05040A] text-[#9CA3AF] pt-14 pb-10 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Left Brand Column */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <a href="#inicio" className="flex items-center gap-2.5 mb-4 group">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#2563EB] p-[1px]">
                <div className="w-full h-full bg-[#080611] rounded-[7px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-[#38BDF8]" />
                </div>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                NEXORA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8]">AI</span>
              </span>
            </a>

            <div className="text-xs font-mono font-semibold text-[#A78BFA] uppercase tracking-wider mb-2">
              Inteligência que transforma.
            </div>

            <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-sm leading-relaxed mb-6">
              Consultoria, tecnologia e soluções de inteligência artificial para negócios preparados para o futuro em Angola e no mercado internacional.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/244928230620"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp da Nexora AI"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-400 border border-white/10 flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn da Nexora AI"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-purple-500/20 hover:text-[#A78BFA] border border-white/10 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram da Nexora AI"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-purple-500/20 hover:text-[#A78BFA] border border-white/10 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={onReplayIntro}
                className="text-[11px] font-mono px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white cursor-pointer ml-2"
              >
                Rever Intro
              </button>
            </div>
          </div>

          {/* Right Navigation Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Empresa */}
            <div>
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-4">
                Empresa
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <a href="#sobre-nos" className="hover:text-white transition-colors">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#solucoes" className="hover:text-white transition-colors">
                    Soluções
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="hover:text-white transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Soluções */}
            <div>
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-4">
                Soluções
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <a href="#solucoes" className="hover:text-white transition-colors">
                    Consultoria em IA
                  </a>
                </li>
                <li>
                  <a href="#solucoes" className="hover:text-white transition-colors">
                    Agentes Cognitivos
                  </a>
                </li>
                <li>
                  <a href="#solucoes" className="hover:text-white transition-colors">
                    Automação de Processos
                  </a>
                </li>
                <li>
                  <a href="#solucoes" className="hover:text-white transition-colors">
                    Websites & Aplicações
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Recursos & Suporte */}
            <div>
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-4">
                Recursos
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <button
                    onClick={onOpenContact}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Contacto Direto
                  </button>
                </li>
                <li>
                  <a
                    href="https://wa.me/244928230620"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    WhatsApp Oficial: 928 230 620
                  </a>
                </li>
                <li>
                  <a href="#inicio" className="hover:text-white transition-colors">
                    Perguntas Frequentes
                  </a>
                </li>
                <li>
                  <span className="text-[11px] font-mono text-[#71717A]">
                    Luanda • Angola
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#71717A]">
          <div
            onClick={onOpenAdminPanel}
            title="Nexora AI"
            className="select-none cursor-default"
          >
            © 2026 Nexora AI. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-6">
            <span>Privacidade & Termos</span>
            <span>Segurança de Dados</span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#A78BFA] hover:text-white transition-colors cursor-pointer"
            >
              <span>Topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

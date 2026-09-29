import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';

interface FloatingActionsProps {
  onOpenContact: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="Ações rápidas flutuantes" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Voltar ao topo da página"
          className="pointer-events-auto btn-floating-subtle w-11 h-11 rounded-full bg-[#111027]/95 hover:bg-[#1A1740] border border-purple-500/40 text-purple-200 hover:text-white flex items-center justify-center shadow-xl shadow-purple-950/60 backdrop-blur-md transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Floating WhatsApp Action with Tooltip & Levitation */}
      <a
        href="https://wa.me/244928230620?text=Ol%C3%A1%20Nexora%20AI%2C%20gostaria%20de%20conversar%20sobre%20as%20solu%C3%A7%C3%B5es."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp Oficial"
        className="pointer-events-auto btn-floating relative group flex items-center justify-center w-13 h-13 rounded-full bg-gradient-to-tr from-[#059669] via-[#10B981] to-[#34D399] text-white shadow-2xl shadow-emerald-950/80 hover:shadow-emerald-500/60 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border border-emerald-400/40"
      >
        {/* Pulsing rings */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 group-hover:opacity-75 animate-ping -z-10" />
        <span className="absolute -inset-2 rounded-full bg-emerald-500/20 blur-md -z-20" />

        <MessageCircle className="w-6 h-6" />

        {/* Hover label */}
        <div className="absolute right-16 whitespace-nowrap px-3 py-1.5 rounded-lg bg-[#080611]/95 border border-emerald-500/30 text-xs font-mono font-medium text-emerald-200 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none backdrop-blur-md">
          Falar via WhatsApp
        </div>
      </a>
    </aside>
  );
};

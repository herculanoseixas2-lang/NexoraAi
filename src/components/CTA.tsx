import React from 'react';
import { ArrowRight, Sparkles, MessageSquare, Compass } from 'lucide-react';
import { GlowLetters } from './GlowLetters';
import { FloatingButton } from './FloatingButton';

interface CTAProps {
  onOpenContact: () => void;
  onExploreSolutions: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onOpenContact, onExploreSolutions }) => {
  return (
    <section className="relative py-16 sm:py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large Rounded Futuristic CTA Panel */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 lg:p-16 border border-purple-400/40 bg-gradient-to-r from-[#1E1B4B] via-[#4C1D95] to-[#1E3A8A] shadow-2xl shadow-purple-950/80">
          {/* Animated Ambient Light Balls */}
          <div className="absolute top-0 right-1/4 w-[350px] h-[350px] rounded-full bg-[#8B5CF6]/30 blur-[100px] pointer-events-none animate-pulse-slow" />
          <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-[#38BDF8]/25 blur-[90px] pointer-events-none" />

          {/* Geometric grid mesh */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-[#E9D5FF] tracking-widest uppercase mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
              INICIE A SUA JORNADA HOJE
            </div>

            {/* Heading with letter glow and float */}
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 text-center">
              <GlowLetters text="Vamos construir o" glowColor="purple" />{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E0E7FF] to-[#38BDF8] inline-block">
                <GlowLetters text="próximo nível." glowColor="purple" letterClassName="text-purple-200" />
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-sm sm:text-lg text-purple-100/90 max-w-xl leading-relaxed mb-10">
              Tem uma ideia, um problema ou um processo que pode ser melhorado com tecnologia? A nossa equipe de engenheiros e consultores de IA está pronta para colaborar.
            </p>

            {/* Dual Floating Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
              <FloatingButton
                variant="primary"
                onClick={onOpenContact}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-white hover:bg-purple-50 text-[#0F172A] font-bold text-sm sm:text-base border-white"
              >
                <MessageSquare className="w-4 h-4 text-[#7C3AED]" />
                <span className="text-[#0F172A]">Falar com a Nexora</span>
                <ArrowRight className="w-4 h-4 text-[#7C3AED]" />
              </FloatingButton>

              <FloatingButton
                variant="secondary"
                onClick={onExploreSolutions}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 bg-black/40 hover:bg-black/60 border-white/20 text-white font-medium text-sm sm:text-base"
              >
                <Compass className="w-4 h-4 text-[#38BDF8]" />
                <span>Explorar soluções</span>
              </FloatingButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


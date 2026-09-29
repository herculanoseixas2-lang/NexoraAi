import React, { useState, useCallback } from 'react';
import { ArrowRight, Play, Volume2, VolumeX, Shield, ChevronDown, Sparkles, CheckCircle2, X } from 'lucide-react';
import { NexoraRobot } from './NexoraRobot';
import { GlowLetters } from './GlowLetters';
import { FloatingButton } from './FloatingButton';
import { soundEffects } from '../utils/audioEffects';

interface HeroProps {
  onExploreSolutions?: () => void;
  onContact?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreSolutions, onContact }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeModal, setActiveModal] = useState<'explore' | 'how-it-works' | null>(null);
  const [robotGlowIntensity, setRobotGlowIntensity] = useState(0.2);

  const handleRobotHover = useCallback((_isHovered: boolean, intensity: number) => {
    setRobotGlowIntensity((prev) => (Math.abs(prev - intensity) > 0.05 ? intensity : prev));
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEffects.enabled = next;
    if (next) {
      soundEffects.playClick();
    }
  };

  const handleExploreClick = () => {
    soundEffects.playClick();
    if (onExploreSolutions) {
      onExploreSolutions();
    } else {
      const el = document.getElementById('solucoes');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHowItWorksClick = () => {
    soundEffects.playClick();
    const el = document.getElementById('sobre-nos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveModal('how-it-works');
    }
  };

  const handleScrollDown = () => {
    soundEffects.playClick();
    const el = document.getElementById('solucoes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCloseModal = () => {
    soundEffects.playClick();
    setActiveModal(null);
  };

  return (
    <section
      id="inicio"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#040308] text-[#F3F4F6] selection:bg-[#7C3AED]/40 selection:text-white pt-24 sm:pt-28 pb-6"
    >
      {/* 1. Volumetric lighting and background gradients (GPU-optimized) */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#581C87]/30 blur-[90px] pointer-events-none transition-opacity duration-500 will-change-transform"
        style={{ opacity: 0.6 + robotGlowIntensity * 0.4 }}
      />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#7C3AED]/20 blur-[100px] pointer-events-none will-change-transform" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[650px] h-[200px] rounded-full bg-[#4C1D95]/20 blur-[80px] pointer-events-none will-change-transform" />

      {/* Cybernetic grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f163812_1px,transparent_1px),linear-gradient(to_bottom,#1f163812_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* 2. Top Telemetry Micro-Bar (In sync with fixed Header) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 mb-4 flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D0B1C]/80 border border-purple-500/20 text-zinc-400 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SISTEMA ATIVO</span>
          <span className="text-zinc-600">•</span>
          <span className="text-purple-300">NÚCLEO NEURAL 4.9</span>
          <span className="text-zinc-600">•</span>
          <span>LATÊNCIA 1.2ms</span>
        </div>

        {/* Audio feedback toggle */}
        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={toggleSound}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all duration-300 flex items-center gap-1.5 cursor-pointer backdrop-blur-md ${
              soundEnabled
                ? 'bg-purple-600/30 border-purple-400 text-purple-200 shadow-md shadow-purple-900/40'
                : 'bg-[#0E0C1C]/70 border-white/10 text-zinc-400 hover:text-white hover:border-purple-500/30'
            }`}
            title={soundEnabled ? 'Silenciar Efeitos de Áudio' : 'Ativar Efeitos de Áudio de Raio-X'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-purple-300" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="text-[11px]">{soundEnabled ? 'SOM RAIO-X ATIVO' : 'SOM DESATIVADO'}</span>
          </button>
        </div>
      </div>

      {/* 3. Hero Main Content (Grid layout) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 py-4 sm:py-6 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT SIDE: Value proposition & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left z-20">
            {/* Eyebrow text requested: "NEXORA" with interactive glowing letters */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#161230]/90 border border-purple-500/30 text-xs font-mono font-medium tracking-widest text-[#D8B4FE] mb-5 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />
              <GlowLetters text="NEXORA" glowColor="purple" />
              <span className="text-purple-400/50">/</span>
              <span className="text-[10px] text-zinc-400 uppercase">Inteligência Sintética</span>
            </div>

            {/* Main Headline requested: "INTELIGÊNCIA QUE MOVE O SEU NEGÓCIO." with interactive letter glow & float */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.05] mb-5">
              <GlowLetters text="INTELIGÊNCIA QUE MOVE" glowColor="purple" className="text-white" />{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#A855F7] to-[#818CF8]">
                <GlowLetters text="O SEU NEGÓCIO." glowColor="purple" letterClassName="text-purple-300" />
              </span>
            </h1>

            {/* Supporting text requested: "Transforme dados, processos e decisões em uma experiência inteligente." */}
            <p className="text-base sm:text-lg text-zinc-300/90 leading-relaxed font-normal mb-8 max-w-xl">
              <GlowLetters
                text="Transforme dados, processos e decisões em uma experiência inteligente."
                glowColor="purple"
                letterClassName="hover:text-purple-200"
              />
            </p>

            {/* CTAs Floating & Interactive with magnetic levitation */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
              {/* Primary CTA requested: "Explorar Nexora" */}
              <FloatingButton
                variant="primary"
                onClick={handleExploreClick}
                className="w-full sm:w-auto"
              >
                <span className="tracking-wide">Explorar Nexora</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-purple-200" />
              </FloatingButton>

              {/* Secondary CTA requested: "Ver como funciona" */}
              <FloatingButton
                variant="secondary"
                onClick={handleHowItWorksClick}
                className="w-full sm:w-auto"
              >
                <Play className="w-3.5 h-3.5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <span className="tracking-wide">Ver como funciona</span>
              </FloatingButton>
            </div>

            {/* Enterprise Credentials / Trust Signals */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md pt-5 border-t border-purple-500/20 text-xs">
              <div>
                <div className="font-display font-bold text-white text-base sm:text-lg">99.98%</div>
                <div className="text-[11px] font-mono text-zinc-400">Precisão Neural</div>
              </div>
              <div>
                <div className="font-display font-bold text-white text-base sm:text-lg">&lt; 15ms</div>
                <div className="text-[11px] font-mono text-zinc-400">Tempo de Resposta</div>
              </div>
              <div>
                <div className="font-display font-bold text-purple-300 text-base sm:text-lg">Zero Trust</div>
                <div className="text-[11px] font-mono text-zinc-400">Arquitetura Segura</div>
              </div>
            </div>
          </div>

          {/* RIGHT / CENTER: Large Futuristic Humanoid Robot with Skeleton Hover Effect */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center items-center relative">
            <NexoraRobot onHoverStateChange={handleRobotHover} />
          </div>
        </div>
      </div>

      {/* 4. SCROLL DOWN INDICATOR ("um scroll para baixo") */}
      <div className="relative z-30 w-full flex flex-col items-center justify-center pt-2 pb-3">
        <button
          onClick={handleScrollDown}
          aria-label="Rolar para ver soluções e detalhes"
          className="btn-floating-subtle group flex flex-col items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          <span className="text-[10px] tracking-widest uppercase text-purple-300/80 group-hover:text-purple-200 transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <GlowLetters text="ROLAR PARA BAIXO • EXPLORAR ECOSSISTEMA" glowColor="purple" letterClassName="hover:text-purple-200" />
          </span>

          {/* Animated mouse scroll pill */}
          <div className="w-6 h-10 rounded-full border-2 border-purple-500/40 group-hover:border-purple-400 flex items-start justify-center p-1 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] bg-[#0C0A1C]/60 backdrop-blur-sm">
            <div className="w-1.5 h-2.5 rounded-full bg-purple-400 animate-bounce mt-1 shadow-[0_0_8px_#C084FC]" />
          </div>

          <ChevronDown className="w-4 h-4 text-purple-400 group-hover:translate-y-1.5 transition-transform" />
        </button>
      </div>

      {/* Modal: "Ver como funciona" */}
      {activeModal === 'how-it-works' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#0B0918] border border-purple-500/40 p-6 sm:p-8 shadow-2xl shadow-purple-950/90 text-left">
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>COMO FUNCIONA A NEXORA</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-3">
              Da Superfície ao Esqueleto Mecatrônico
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
              Assim como a nossa demonstração visual revela a mecânica oculta sob a blindagem do robô, a plataforma Nexora ilumina as engrenagens ocultas da sua organização.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#130F29]/80 border border-purple-500/20">
                <div className="w-7 h-7 rounded-lg bg-purple-600/30 text-purple-300 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                  01
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">1. Ingestão e Mapeamento de Dados</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Conectamos fontes dispersas (ERP, CRM, sensores, bancos de dados) num grafo unificado em tempo real.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#130F29]/80 border border-purple-500/20">
                <div className="w-7 h-7 rounded-lg bg-purple-600/30 text-purple-300 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                  02
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">2. Processamento Neural & Decisão Autônoma</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Modelos de inferência identificam padrões e anomalias, executando ações prescritivas sem atrito manual.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#130F29]/80 border border-purple-500/20">
                <div className="w-7 h-7 rounded-lg bg-purple-600/30 text-purple-300 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                  03
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">3. Feedback Contínuo & Aprendizagem Ativa</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    A cada ciclo operacional, a precisão do sistema aumenta através de refinamento por reforço mecatrônico.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  handleCloseModal();
                  handleExploreClick();
                }}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-colors cursor-pointer"
              >
                Explorar Soluções
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

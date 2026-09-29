import React, { useState, useRef } from 'react';
import {
  Globe,
  Sparkles,
  Zap,
  CheckCircle,
  Smartphone,
  Shield,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { GlowLetters } from './GlowLetters';
import visionFutureImg from '../assets/images/vision_smart_future_1790155487369.jpg';

interface WebsiteShowcaseProps {
  onStartWebProject: () => void;
}

export const WebsiteShowcase: React.FC<WebsiteShowcaseProps> = ({ onStartWebProject }) => {
  const [activeView, setActiveView] = useState<'preview' | 'tecnologias' | 'metricas'>('preview');
  const browserRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!browserRef.current) return;
    const rect = browserRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -4;
    const rotY = ((x - centerX) / centerX) * 4;
    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative py-16 sm:py-24 z-10 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#2563EB]/15 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151332]/80 border border-purple-500/30 text-xs font-mono text-[#38BDF8] tracking-widest uppercase mb-3">
            ENGENHARIA WEB & EXPERIÊNCIAS IMERSIVAS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight text-center">
            <GlowLetters text="Websites que não parecem" glowColor="purple" />{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#38BDF8] to-[#60A5FA] inline-block">
              <GlowLetters text="websites." glowColor="purple" letterClassName="text-purple-300" />
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] mt-3 leading-relaxed">
            Criamos experiências digitais modernas, interativas e pensadas para destacar marcas com velocidade de elite e inteligência embutida.
          </p>
        </div>

        {/* Futuristic Browser Mockup with 3D Perspective */}
        <div
          ref={browserRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="relative max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-[#151332]/95 via-[#0B0820]/95 to-[#05040A] border border-purple-500/30 shadow-2xl shadow-purple-950/70 p-3 sm:p-5 backdrop-blur-xl group"
        >
          {/* Subtle Outer Glowing Outline */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#7C3AED]/40 via-[#38BDF8]/30 to-[#8B5CF6]/40 -z-10 blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Browser Navigation Chrome Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2.5 rounded-2xl bg-[#080611] border border-white/10 mb-3">
            {/* Window control dots */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            {/* URL Address Bar */}
            <div className="flex items-center gap-2 px-4 py-1 rounded-xl bg-[#0B0820] border border-white/10 text-xs font-mono text-[#9CA3AF] w-full sm:w-80 justify-center">
              <Globe className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="text-white">nexora.ai</span>
              <span className="text-[#8B5CF6]">/future-experience</span>
            </div>

            {/* View Switchers */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveView('preview')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                  activeView === 'preview'
                    ? 'bg-purple-600/30 text-white border border-purple-500/40'
                    : 'text-[#71717A] hover:text-white'
                }`}
              >
                VISUAL
              </button>
              <button
                onClick={() => setActiveView('tecnologias')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                  activeView === 'tecnologias'
                    ? 'bg-purple-600/30 text-white border border-purple-500/40'
                    : 'text-[#71717A] hover:text-white'
                }`}
              >
                STACK
              </button>
              <button
                onClick={() => setActiveView('metricas')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                  activeView === 'metricas'
                    ? 'bg-purple-600/30 text-white border border-purple-500/40'
                    : 'text-[#71717A] hover:text-white'
                }`}
              >
                LIGTHOUSE
              </button>
            </div>
          </div>

          {/* Inside Browser Canvas */}
          <div className="relative rounded-2xl overflow-hidden bg-[#05040A] border border-white/10 min-h-[380px] sm:min-h-[460px] flex flex-col justify-between p-6 sm:p-10">
            {/* Background graphic in mockup */}
            <img
              src={visionFutureImg}
              alt="Fictional Nexora AI Web Platform"
              className="absolute inset-0 w-full h-full object-cover opacity-35 filter blur-[0.5px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05040A] via-[#05040A]/85 to-[#080611]/80" />

            {/* Floating Labels from specifications */}
            <div className="absolute top-6 left-6 z-20 animate-float">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#080611]/90 border border-purple-500/40 text-xs font-mono font-semibold text-white backdrop-blur-md shadow-lg shadow-purple-950/40">
                <Layers className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>UI/UX DESIGN</span>
              </div>
            </div>

            <div className="absolute top-6 right-6 z-20 animate-float [animation-delay:1s]">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#080611]/90 border border-blue-500/40 text-xs font-mono font-semibold text-white backdrop-blur-md shadow-lg shadow-blue-950/40">
                <Smartphone className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>100% RESPONSIVO</span>
              </div>
            </div>

            <div className="absolute bottom-20 left-6 z-20 animate-float [animation-delay:2s] hidden sm:block">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#080611]/90 border border-emerald-500/40 text-xs font-mono font-semibold text-white backdrop-blur-md shadow-lg">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>PERFORMANCE 99/100</span>
              </div>
            </div>

            <div className="absolute bottom-20 right-6 z-20 animate-float [animation-delay:1.5s] hidden sm:block">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#080611]/90 border border-[#8B5CF6]/50 text-xs font-mono font-semibold text-white backdrop-blur-md shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
                <span>IA INTEGRADA NATIVA</span>
              </div>
            </div>

            {/* Inner Content depending on active view */}
            <div className="relative z-10 my-auto text-center max-w-2xl mx-auto py-8">
              {activeView === 'preview' && (
                <>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111027]/90 border border-purple-500/30 text-xs text-[#38BDF8] font-mono uppercase mb-4">
                    ESTÉTICA DE ALTA FIDELIDADE
                  </div>
                  <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                    Interfaces que cativam no primeiro segundo.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed mb-6">
                    Esqueça modelos pré-fabricados ou designs lentos. Criamos plataformas desenvolvidas sob medida com Tailwind CSS, animações a 60fps e arquitetura pronta para milhões de acessos.
                  </p>
                  <button
                    onClick={onStartWebProject}
                    className="btn-floating group relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#2563EB] text-white text-xs sm:text-sm font-semibold shadow-xl shadow-purple-950/60 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <span className="relative z-10">Solicitar Website Futurista</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </button>
                </>
              )}

              {activeView === 'tecnologias' && (
                <div className="text-left bg-[#0B0820]/90 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <h4 className="text-sm font-mono text-[#38BDF8] uppercase tracking-wider mb-3">
                    Arquitetura Web de Última Geração
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs text-white">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>React 19 & TypeScript</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Edge Serverless Rendering</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Zero-Layout-Shift (CLS 0)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>APIs de IA & RAG Integrados</span>
                    </div>
                  </div>
                </div>
              )}

              {activeView === 'metricas' && (
                <div className="grid grid-cols-4 gap-3 bg-[#0B0820]/90 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                  <div className="text-center p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
                    <div className="text-2xl font-bold font-mono text-emerald-400">99</div>
                    <div className="text-[10px] font-mono text-[#A1A1AA] uppercase mt-1">
                      Performance
                    </div>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
                    <div className="text-2xl font-bold font-mono text-emerald-400">100</div>
                    <div className="text-[10px] font-mono text-[#A1A1AA] uppercase mt-1">
                      Acessibilidade
                    </div>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
                    <div className="text-2xl font-bold font-mono text-emerald-400">100</div>
                    <div className="text-[10px] font-mono text-[#A1A1AA] uppercase mt-1">
                      Boas Práticas
                    </div>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
                    <div className="text-2xl font-bold font-mono text-emerald-400">100</div>
                    <div className="text-[10px] font-mono text-[#A1A1AA] uppercase mt-1">
                      SEO Score
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom mini status bar inside mockup */}
            <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#71717A] pt-4 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                CONEXÃO SEGURA SSL / TLS 1.3
              </span>
              <span>RENDERIZAÇÃO ACELERADA POR GPU</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

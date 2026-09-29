import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Brain,
  Globe,
  Boxes,
  Workflow,
  Sparkles,
  Zap,
} from 'lucide-react';
import { GlowLetters } from './GlowLetters';
import { FloatingButton } from './FloatingButton';
import neuralEngineImg from '../assets/images/ai_neural_engine_1790155475590.jpg';
import appInterfaceImg from '../assets/images/app_ai_interface_1790155498715.jpg';

interface FeaturedSolutionsProps {
  onSelectSolution: (solutionTitle: string) => void;
}

export const FeaturedSolutions: React.FC<FeaturedSolutionsProps> = ({ onSelectSolution }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const solutions = [
    {
      id: 'websites',
      number: '01',
      category: 'DESIGN & EXPERIÊNCIA',
      title: 'Websites inteligentes',
      tagline: 'Alta performance, design futurista e conversão',
      description:
        'Experiências digitais modernas, ultra-rápidas e preparadas para conversão com integração nativa de modelos de linguagem, personalização em tempo real e interfaces cinematográficas.',
      features: [
        'Design UI/UX futurista e responsivo',
        'Carregamento ultra-rápido & SEO de última geração',
        'Chatbots inteligentes e busca semântica',
        'Painéis de gestão de conteúdo automatizados',
      ],
      impact: 'Tempo de Carregamento < 0.8s',
      icon: Globe,
      image: appInterfaceImg,
      accentGradient: 'from-[#2563EB] to-[#7C3AED]',
    },
    {
      id: 'aplicacoes',
      number: '02',
      category: 'ENGENHARIA DE SOFTWARE',
      title: 'Aplicações com Ai',
      tagline: 'Sistemas inteligentes e escaláveis do zero',
      description:
        'Transformamos ideias em aplicações inteligentes e escaláveis para otimização da sua vida e gestão de recursos com inteligência artificial integrada.',
      features: [
        'Aplicações de Finanças pessoais',
        'Diversas outras aplicações personalizadas',
      ],
      impact: '100% Personalizado para a sua Operação',
      icon: Boxes,
      image: neuralEngineImg,
      accentGradient: 'from-[#8B5CF6] to-[#EC4899]',
    },
    {
      id: 'transformacao',
      number: '03',
      category: 'DESIGN & IDENTIDADE',
      title: 'Transformação digital',
      tagline: 'Design profissional e presença visual marcante',
      description:
        'Elevamos a autoridade visual da sua marca com estética futurista, elegância e alinhamento estratégico para o mercado moderno.',
      features: [
        'Design para sua empresa',
        'Criação de logo para a sua empresa',
      ],
      impact: 'Identidade Visual de Alto Nível',
      icon: Sparkles,
      image: neuralEngineImg,
      accentGradient: 'from-[#38BDF8] to-[#8B5CF6]',
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % solutions.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + solutions.length) % solutions.length);
  };

  const current = solutions[activeIndex];
  const Icon = current.icon;

  return (
    <section id="solucoes" className="relative py-16 sm:py-24 overflow-hidden z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#7C3AED]/15 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div>
            <div className="text-xs font-mono text-[#38BDF8] uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-[2px] bg-[#38BDF8]" />
              CAPACIDADES DE PONTA
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              <GlowLetters text="Soluções em" glowColor="purple" />{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8]">
                <GlowLetters text="destaque" glowColor="purple" letterClassName="text-purple-300" />
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF] mt-2 max-w-xl">
              Tecnologia criada para resolver problemas reais com precisão e elegância.
            </p>
          </div>

          {/* Carousel navigation controls */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="text-xs font-mono text-[#71717A]">
              0{activeIndex + 1} / 0{solutions.length}
            </span>
            <button
              onClick={handlePrev}
              aria-label="Solução anterior"
              className="w-10 h-10 rounded-xl bg-[#111027] border border-white/10 hover:border-purple-500/40 text-white flex items-center justify-center transition-all duration-200 hover:bg-[#1A1740] cursor-pointer btn-floating-subtle hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Próxima solução"
              className="w-10 h-10 rounded-xl bg-[#111027] border border-white/10 hover:border-purple-500/40 text-white flex items-center justify-center transition-all duration-200 hover:bg-[#1A1740] cursor-pointer btn-floating-subtle hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Tabs Strip for quick click */}
        <div className="flex gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {solutions.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-300 cursor-pointer border ${
                idx === activeIndex
                  ? 'bg-gradient-to-r from-[#7C3AED]/40 to-[#2563EB]/40 text-white border-purple-500/60 shadow-lg shadow-purple-950/50 scale-105 -translate-y-0.5'
                  : 'bg-[#111027]/70 text-[#9CA3AF] hover:text-white border-white/5 hover:border-white/20 hover:-translate-y-0.5'
              }`}
            >
              <span className="font-mono text-[10px] text-[#A78BFA]">{item.number}</span>
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Featured Solution Main Card - Large rounded showcase */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#151332]/90 via-[#0E0C26]/95 to-[#080611] border border-purple-500/30 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-purple-950/60 overflow-hidden group">
          {/* Subtle edge glow */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-radial from-[#7C3AED]/20 to-transparent blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left side details */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#2563EB] flex items-center justify-center text-white shadow-lg shadow-purple-900/40">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#38BDF8] uppercase font-semibold">
                      {current.category}
                    </span>
                    <div className="text-xs font-mono text-[#71717A]">
                      SOLUÇÃO // {current.number}
                    </div>
                  </div>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
                  <GlowLetters text={current.title} glowColor="purple" />
                </h3>
                <div className="text-sm font-medium text-[#A78BFA] mb-4">
                  {current.tagline}
                </div>

                <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed mb-6 font-normal">
                  {current.description}
                </p>

                {/* Key Capabilities List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                  {current.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-[#E5E7EB]"
                    >
                      <Zap className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom actions & impact pill */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase text-[#71717A]">
                    Impacto Estimado
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-emerald-400 font-mono">
                    {current.impact}
                  </span>
                </div>

                <FloatingButton
                  variant="primary"
                  onClick={() => onSelectSolution(current.title)}
                  className="px-6 py-3 text-xs sm:text-sm font-semibold"
                >
                  <span>Solicitar Proposta para {current.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </FloatingButton>
              </div>
            </div>

            {/* Right side interactive graphic mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 bg-[#080611] aspect-[4/3] shadow-xl group/card">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080611] via-transparent to-transparent opacity-80" />

                {/* Corner holographic data */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#05040A]/85 border border-white/10 text-[10px] font-mono text-[#38BDF8]">
                  NEXORA ENGINE
                </div>

                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#0B0820]/90 border border-white/10 backdrop-blur-md">
                  <div className="text-[10px] font-mono text-[#A1A1AA] uppercase">
                    ARQUITETURA INTEGRADA
                  </div>
                  <div className="text-xs font-semibold text-white truncate">
                    {current.title} — Pronta para Produção
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

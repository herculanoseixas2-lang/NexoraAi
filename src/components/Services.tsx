import React from 'react';
import {
  ArrowRight,
  Brain,
  Code2,
  Cpu,
  Workflow,
  Sparkles,
  Layers,
} from 'lucide-react';
import { GlowLetters } from './GlowLetters';
import neuralEngineImg from '../assets/images/ai_neural_engine_1790155475590.jpg';
import appInterfaceImg from '../assets/images/app_ai_interface_1790155498715.jpg';
import heroRobotImg from '../assets/images/hero_ai_humanoid_1790155453597.jpg';
import visionFutureImg from '../assets/images/vision_smart_future_1790155487369.jpg';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const serviceCards = [
    {
      id: 'desenvolvimento-web',
      number: '01',
      category: 'ENGENHARIA WEB',
      title: 'Desenvolvimento Web',
      description:
        'Criação de websites institucionais e plataformas interativas de alta densidade visual, velocidade ultrarrápida e design futurista de referência.',
      deliverable: 'Websites & Portais de Alta Conversão',
      icon: Code2,
      image: appInterfaceImg,
      badge: 'WEB MODERNA',
    },
    {
      id: 'aplicacoes-inteligentes',
      number: '02',
      category: 'SISTEMAS COGNITIVOS',
      title: 'Aplicações Inteligentes',
      description:
        'Aplicações empresariais potencializadas por agentes de linguagem (LLMs), síntese vocal, visão computacional e bancos vetoriais sob medida.',
      deliverable: 'Assistentes & Soluções Corporativas',
      icon: Cpu,
      image: heroRobotImg,
      badge: 'AI GENERATIVA',
    },
    {
      id: 'experiencias-digitais',
      number: '03',
      category: 'DESIGN AVANÇADO',
      title: 'Experiências Digitais',
      description:
        'Interfaces interativas em 3D, microssites imersivos e campanhas de produto que transformam a percepção de valor da sua marca no mercado.',
      deliverable: 'Apresentações & UI/UX 3D',
      icon: Sparkles,
      image: visionFutureImg,
      badge: 'FUTURISMO DIGITAL',
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151332]/90 border border-purple-500/30 text-xs font-mono text-[#38BDF8] tracking-widest uppercase mb-3 backdrop-blur-md">
            PORTFÓLIO DE COMPETÊNCIAS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            <GlowLetters text="O que podemos" glowColor="purple" />{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#38BDF8] to-[#60A5FA]">
              <GlowLetters text="construir juntos" glowColor="purple" letterClassName="text-purple-300" />
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] mt-3">
            Combinamos inteligência artificial, design futurista e engenharia de software para resolver desafios complexos.
          </p>
        </div>

        {/* 3-Card Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service.title)}
                className="group relative rounded-2xl bg-gradient-to-b from-[#111027]/95 via-[#0B0820]/95 to-[#080611] border border-white/10 hover:border-purple-500/60 p-4 sm:p-5 transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-purple-950/60 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                {/* Glow backlight on hover */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#7C3AED]/0 via-[#7C3AED]/40 to-[#38BDF8]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Visual Thumbnail */}
                  <div className="relative aspect-[16/11] rounded-xl overflow-hidden mb-4 bg-[#05040A] border border-white/10">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080611] via-[#080611]/30 to-transparent" />

                    {/* Badge top right */}
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-[#05040A]/85 border border-white/10 text-[9px] font-mono text-[#38BDF8] backdrop-blur-md">
                      {service.badge}
                    </div>

                    {/* Number top left */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#080611]/85 border border-purple-500/30 text-[10px] font-mono text-[#A78BFA] backdrop-blur-md">
                      {service.number}
                    </div>
                  </div>

                  {/* Category & Icon */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono tracking-widest text-[#38BDF8] uppercase font-semibold">
                      {service.category}
                    </span>
                    <div className="p-1.5 rounded-md bg-white/5 text-[#A78BFA] group-hover:text-white group-hover:bg-purple-600/30 transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold text-white mb-2">
                    <GlowLetters text={service.title} glowColor="purple" />
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#9CA3AF] leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                {/* Bottom link indicator */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#E5E7EB]">
                  <span className="text-[10px] font-mono text-[#71717A] truncate max-w-[140px]">
                    {service.deliverable}
                  </span>
                  <div className="flex items-center gap-1.5 text-[#8B5CF6] group-hover:text-[#38BDF8] font-medium transition-colors">
                    <span className="text-xs">Explorar</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

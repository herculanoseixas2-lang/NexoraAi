import React from 'react';
import { Target, Palette, Sliders, Rocket, CheckCircle } from 'lucide-react';
import { GlowLetters } from './GlowLetters';

export const WhyNexora: React.FC = () => {
  const reasons = [
    {
      id: 'proposito',
      title: 'IA COM PROPÓSITO',
      subtitle: 'Tecnologia aplicada a problemas reais.',
      description:
        'Não vendemos inteligência artificial por modismo. Toda solução que construímos responde a um gargalo financeiro, operacional ou estratégico com metas mensuráveis de eficiência.',
      icon: Target,
      tag: 'PRAGMATISMO',
    },
    {
      id: 'design-tecnologia',
      title: 'DESIGN + TECNOLOGIA',
      subtitle: 'Experiências digitais bonitas e funcionais.',
      description:
        'Acreditamos que tecnologia de ponta deve ser intuitiva e memorável. Combinamos padrões visuais de classe mundial com engenharia de software de altíssimo desempenho.',
      icon: Palette,
      tag: 'EXCELÊNCIA VISUAL',
    },
    {
      id: 'personalizacao',
      title: 'PERSONALIZAÇÃO',
      subtitle: 'Soluções adaptadas a cada negócio.',
      description:
        'Cada empresa possui particularidades regulatórias e dinâmicas de mercado únicas. Ajustamos nossos modelos e fluxos de código exatamente para a sua realidade em Angola.',
      icon: Sliders,
      tag: 'SOB MEDIDA',
    },
    {
      id: 'visao-futuro',
      title: 'VISÃO DE FUTURO',
      subtitle: 'Tecnologia preparada para evoluir.',
      description:
        'Construímos arquiteturas modulares que não ficam obsoletas no ano seguinte. Quando novos modelos ou infraestruturas surgem, sua empresa se conecta a eles imediatamente.',
      icon: Rocket,
      tag: 'ESCALABILIDADE',
    },
  ];

  return (
    <section id="sobre-nos" className="relative py-16 sm:py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151332]/80 border border-purple-500/30 text-xs font-mono text-[#38BDF8] tracking-widest uppercase mb-3">
            DIFERENCIAIS ESTRATÉGICOS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            <GlowLetters text="Por que" glowColor="purple" />{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#38BDF8] to-[#60A5FA]">
              <GlowLetters text="Nexora AI?" glowColor="purple" letterClassName="text-purple-300" />
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] mt-3">
            Mais do que uma agência de desenvolvimento, somos o parceiro de tecnologia e inteligência artificial para o crescimento contínuo do seu negócio.
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative rounded-2xl bg-gradient-to-b from-[#111027]/90 to-[#080611] border border-white/10 hover:border-purple-500/40 p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-purple-950/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {item.tag}
                    </span>
                    <span className="text-xs font-mono text-[#71717A]">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED]/30 to-[#2563EB]/20 border border-purple-500/30 flex items-center justify-center text-[#A78BFA] group-hover:text-white group-hover:scale-105 transition-all mb-5">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-2 tracking-wide">
                    {item.title}
                  </h3>

                  <div className="text-xs font-semibold text-[#A78BFA] mb-3">
                    {item.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Padrão Nexora Garantido</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

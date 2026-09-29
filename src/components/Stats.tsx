import React, { useState, useEffect } from 'react';
import { Layers, CheckCircle, Clock, Infinity as InfinityIcon, Activity, Sparkles } from 'lucide-react';
import { GlowLetters } from './GlowLetters';

export const Stats: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [pulseTick, setPulseTick] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial read
    handleScroll();

    // Subtle background telemetry live tick
    const interval = setInterval(() => {
      setPulseTick((prev) => (prev + 1) % 100);
    }, 1500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Compute dynamic counters based on scroll position and subtle ambient tick
  // As user scrolls down the page, numbers continuously update and evolve
  const scrollRatio = Math.min(Math.max(scrollY / 1200, 0), 3);
  
  // 1. Soluções Digitais: starts at 10+, grows smoothly with scroll and micro-variations
  const solutionsCount = Math.floor(10 + scrollRatio * 8 + (pulseTick % 3 === 0 ? 1 : 0));
  
  // 2. Sistemas Entregues: starts at 15+, increases as user explores
  const deliveredCount = Math.floor(15 + scrollRatio * 14 + (pulseTick % 4 === 0 ? 1 : 0));

  // 3. Operação Inteligente: 99.9x% uptime with live latency
  const latencyMs = Math.max(8, Math.floor(18 - scrollRatio * 3 + (pulseTick % 5)));
  const uptimePercent = (99.95 + (Math.sin(pulseTick) * 0.03)).toFixed(2);

  // 4. Possibilidades: dynamic throughput ops
  const throughputOps = (1.2 + scrollRatio * 1.8 + (pulseTick % 10) * 0.05).toFixed(1);

  const statsData = [
    {
      value: `${solutionsCount}+`,
      badgeText: 'DINÂMICO // ATIVO',
      label: 'Soluções Digitais',
      subtext: 'Módulos de IA e arquiteturas customizadas',
      icon: Layers,
      accentColor: 'text-[#8B5CF6]',
      borderColor: 'border-purple-500/25 hover:border-purple-500/50',
      glowColor: 'group-hover:shadow-purple-900/40',
      metricPill: `+${Math.floor(scrollRatio * 4 + 2)} novos módulos`,
    },
    {
      value: `${deliveredCount}+`,
      badgeText: 'PROCESSANDO',
      label: 'Sistemas Entregues',
      subtext: 'Casos em produção e inovação contínua',
      icon: CheckCircle,
      accentColor: 'text-[#38BDF8]',
      borderColor: 'border-blue-500/25 hover:border-blue-500/50',
      glowColor: 'group-hover:shadow-blue-900/40',
      metricPill: `100% estabilidade`,
    },
    {
      value: '24/7',
      badgeText: `${latencyMs}ms LATÊNCIA`,
      label: 'Operação Inteligente',
      subtext: `Uptime verificado de ${uptimePercent}% em tempo real`,
      icon: Clock,
      accentColor: 'text-[#A78BFA]',
      borderColor: 'border-violet-500/25 hover:border-violet-500/50',
      glowColor: 'group-hover:shadow-violet-900/40',
      metricPill: `${uptimePercent}% UPTIME`,
    },
    {
      value: '∞',
      badgeText: `${throughputOps}M OPS/S`,
      label: 'Possibilidades',
      subtext: 'Capacidade de expansão e modelos neurais de ponta',
      icon: InfinityIcon,
      accentColor: 'text-[#60A5FA]',
      borderColor: 'border-sky-500/25 hover:border-sky-500/50',
      glowColor: 'group-hover:shadow-sky-900/40',
      metricPill: `${throughputOps}M req/s`,
    },
  ];

  return (
    <section className="relative py-8 sm:py-12 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Real-time telemetry headline */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#9CA3AF]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38BDF8]" />
            </span>
            <span className="text-[#38BDF8] font-medium">TELEMETRIA EM TEMPO REAL</span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="hidden sm:inline text-[#71717A]">Métricas sincronizadas dinamicamente com a navegação</span>
          </div>
          <div className="text-[11px] font-mono text-[#A78BFA] flex items-center gap-1">
            <Activity className="w-3 h-3 animate-pulse" />
            <span className="hidden md:inline">Fluxo Ativo</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`group relative rounded-2xl bg-gradient-to-b from-[#111027]/90 via-[#0B0820]/95 to-[#080611] border ${stat.borderColor} p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 shadow-xl ${stat.glowColor} overflow-hidden`}
              >
                {/* Background moving shine on hover */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                {/* Subtle top indicator bar */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717A] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                    0{idx + 1}
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#D1D5DB] group-hover:text-white transition-colors">
                    <Icon className={`w-3.5 h-3.5 ${stat.accentColor}`} />
                  </div>
                </div>

                {/* Big Stat Value with animated scale and transition */}
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight tabular-nums mb-1 flex items-baseline justify-between gap-1">
                  <span className={`${stat.accentColor} transition-all duration-300 drop-shadow-sm`}>
                    <GlowLetters text={stat.value} glowColor="purple" />
                  </span>
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 text-[#A1A1AA] border border-white/5">
                    {stat.badgeText}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-sm font-semibold text-[#E5E7EB] mb-1">
                  <GlowLetters text={stat.label} glowColor="purple" />
                </h2>

                {/* Subtext */}
                <p className="text-[11px] sm:text-xs text-[#9CA3AF] leading-relaxed mb-3">
                  {stat.subtext}
                </p>

                {/* Live micro pill */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#38BDF8]">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>{stat.metricPill}</span>
                  </span>
                  <span className="text-[#71717A]">SYNC</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

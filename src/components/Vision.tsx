import React from 'react';
import { ArrowRight, Globe, Shield, Sparkles, Zap } from 'lucide-react';
import { GlowLetters } from './GlowLetters';
import { FloatingButton } from './FloatingButton';
import visionFutureImg from '../assets/images/vision_smart_future_1790155487369.jpg';

interface VisionProps {
  onTalkWithNexora: () => void;
}

export const Vision: React.FC<VisionProps> = ({ onTalkWithNexora }) => {
  return (
    <section className="relative py-16 sm:py-24 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large Cinematic Wide Visual Container */}
        <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 bg-[#080611] p-6 sm:p-12 lg:p-16 shadow-2xl shadow-purple-950/70">
          {/* Background image with cinematic grading */}
          <div className="absolute inset-0 z-0">
            <img
              src={visionFutureImg}
              alt="Nexora AI Future Vision"
              className="w-full h-full object-cover object-center filter brightness-90 contrast-115 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#05040A] via-[#080611]/85 to-[#080611]/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05040A] via-transparent to-[#05040A]/70" />
          </div>

          {/* Ambient colored lighting */}
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#7C3AED]/20 blur-[130px] pointer-events-none" />

          {/* Content Layer */}
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151332]/90 border border-purple-400/40 text-xs font-mono text-[#38BDF8] tracking-widest uppercase mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              VISÃO ESTRATÉGICA 2026 & ALÉM
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
              <GlowLetters text="O futuro dos negócios é" glowColor="purple" />{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#38BDF8] to-[#60A5FA]">
                <GlowLetters text="inteligente." glowColor="purple" letterClassName="text-purple-300" />
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-[#E5E7EB] leading-relaxed mb-8 font-light">
              A inteligência artificial está a transformar a forma como empresas criam, trabalham e crescem. A <strong className="text-white font-medium">Nexora AI</strong> existe para ajudar negócios em Angola e no ecossistema global a fazerem parte ativa dessa transformação com soberania e vanguarda.
            </p>

            {/* Strategic Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="p-4 rounded-xl bg-[#080611]/80 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#38BDF8] text-xs font-mono mb-1 font-semibold">
                  <Globe className="w-4 h-4" />
                  <span>ECOSSISTEMA REGIONAL</span>
                </div>
                <p className="text-xs text-[#9CA3AF]">
                  Tecnologia desenvolvida com suporte local e compreensão profunda do mercado angolano.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#080611]/80 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#A78BFA] text-xs font-mono mb-1 font-semibold">
                  <Shield className="w-4 h-4" />
                  <span>SOBERANIA & DADOS</span>
                </div>
                <p className="text-xs text-[#9CA3AF]">
                  Conformidade rigorosa, criptografia e proteção da propriedade intelectual corporativa.
                </p>
              </div>
            </div>

            {/* Action button with magnetic floating physics */}
            <FloatingButton
              variant="primary"
              onClick={onTalkWithNexora}
              className="px-8 py-4 text-sm sm:text-base"
            >
              <span>Fazer Parte Desta Transformação</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </FloatingButton>
          </div>
        </div>
      </div>
    </section>
  );
};

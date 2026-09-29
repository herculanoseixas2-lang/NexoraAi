import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Send,
  MessageCircle,
  Linkedin,
  Instagram,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { GlowLetters } from './GlowLetters';
import { ContactFormData } from '../types';
import { messageStore } from '../utils/messageStore';
import { soundEffects } from '../utils/audioEffects';

interface ContactProps {
  prefilledService?: string;
  onOpenAdminPanel?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ prefilledService, onOpenAdminPanel }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    nome: '',
    email: '',
    empresa: '',
    telefone: '',
    mensagem: prefilledService
      ? `Olá! Gostaria de saber mais sobre a solução de ${prefilledService}.`
      : '',
    servicoInteresse: prefilledService || 'Consultoria Geral',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.nome.trim()) errs.nome = 'Por favor, indique o seu nome';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Por favor, introduza um e-mail válido';
    }
    if (!formData.mensagem.trim()) {
      errs.mensagem = 'Por favor, descreva brevemente a sua necessidade';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    soundEffects.playClick();

    // Store in developer admin inbox
    messageStore.addMessage({
      nome: formData.nome,
      email: formData.email,
      empresa: formData.empresa,
      telefone: formData.telefone,
      mensagem: formData.mensagem,
      servicoInteresse: formData.servicoInteresse,
    });

    // Simulate real network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      nome: '',
      email: '',
      empresa: '',
      telefone: '',
      mensagem: '',
      servicoInteresse: 'Consultoria Geral',
    });
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <section id="contacto" className="relative py-16 sm:py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151332]/80 border border-purple-500/30 text-xs font-mono text-[#38BDF8] tracking-widest uppercase mb-3">
            ATENDIMENTO EXCLUSIVO
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            <GlowLetters text="Vamos" glowColor="purple" />{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#38BDF8] to-[#60A5FA]">
              <GlowLetters text="conversar." glowColor="purple" letterClassName="text-purple-300" />
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] mt-3">
            Explique o seu desafio ou projeto e receba uma avaliação preliminar de viabilidade e arquitetura em até 24 horas úteis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct channels & credentials */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="rounded-2xl bg-gradient-to-b from-[#111027] to-[#080611] border border-purple-500/25 p-6 backdrop-blur-xl shadow-xl">
              <h3 className="font-display font-bold text-xl text-white mb-2">
                Canais Diretos de Comunicação
              </h3>
              <p className="text-xs sm:text-sm text-[#9CA3AF] mb-6">
                Fale diretamente com os nossos engenheiros e especialistas em inteligência artificial.
              </p>

              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/244928230620?text=Ol%C3%A1%20Nexora%20AI%2C%20gostaria%20de%20conversar%20sobre%20as%20solu%C3%A7%C3%B5es."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.03] hover:bg-emerald-950/30 border border-white/5 hover:border-emerald-500/40 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#A1A1AA] uppercase">
                      WhatsApp Oficial
                    </div>
                    <div className="text-sm font-semibold text-white font-mono">
                      928 230 620
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:nexoraai719@gmail.com"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.03] hover:bg-purple-950/30 border border-white/5 hover:border-purple-500/40 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-[#A78BFA] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#A1A1AA] uppercase">
                      E-mail Corporativo
                    </div>
                    <div className="text-sm font-semibold text-white font-mono">
                      nexoraai719@gmail.com
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-[#38BDF8] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#A1A1AA] uppercase">
                      Localização
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-white">
                      Luanda, Angola • Atendimento Global
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#A1A1AA] uppercase">
                      Tempo de Resposta
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-white">
                      Menos de 24 horas úteis
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#71717A]">
                  REDES SOCIAIS:
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn da Nexora AI"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#D1D5DB] hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram da Nexora AI"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#D1D5DB] hover:text-white transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-gradient-to-b from-[#151332]/95 via-[#0E0C26] to-[#080611] border border-purple-500/30 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-purple-950/50">
              {isSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4 shadow-lg shadow-emerald-950/50">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    Mensagem Recebida com Sucesso!
                  </h3>
                  <p className="text-sm text-[#D1D5DB] max-w-md mb-2 leading-relaxed">
                    Obrigado pelo seu contacto, <strong className="text-white">{formData.nome}</strong>. A mensagem foi transmitida diretamente para o nosso painel de engenharia.
                  </p>
                  <p className="text-xs text-purple-300 font-mono mb-8">
                    Receberá o retorno através do seu WhatsApp (<span className="text-emerald-400">{formData.telefone}</span>) ou E-mail (<span className="text-sky-300">{formData.email}</span>).
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-mono text-white transition-colors cursor-pointer"
                    >
                      ENVIAR NOVA MENSAGEM
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nome */}
                    <div>
                      <label className="block text-xs font-mono text-[#D1D5DB] mb-1">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Manuel da Costa"
                        value={formData.nome}
                        onChange={(e) =>
                          setFormData({ ...formData, nome: e.target.value })
                        }
                        className={`w-full px-4 py-3 rounded-xl bg-[#080611] border text-sm text-white placeholder-[#71717A] focus:outline-none transition-colors ${
                          errors.nome
                            ? 'border-rose-500/80 focus:border-rose-500'
                            : 'border-white/10 focus:border-purple-500/80'
                        }`}
                      />
                      {errors.nome && (
                        <span className="text-[11px] text-rose-400 mt-1 block">
                          {errors.nome}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono text-[#D1D5DB] mb-1">
                        E-mail Corporativo *
                      </label>
                      <input
                        type="email"
                        placeholder="nome@empresa.co.ao"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full px-4 py-3 rounded-xl bg-[#080611] border text-sm text-white placeholder-[#71717A] focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-rose-500/80 focus:border-rose-500'
                            : 'border-white/10 focus:border-purple-500/80'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-rose-400 mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Empresa */}
                    <div>
                      <label className="block text-xs font-mono text-[#D1D5DB] mb-1">
                        Empresa / Organização
                      </label>
                      <input
                        type="text"
                        placeholder="Nome da sua organização"
                        value={formData.empresa}
                        onChange={(e) =>
                          setFormData({ ...formData, empresa: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#080611] border border-white/10 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-purple-500/80 transition-colors"
                      />
                    </div>

                    {/* Telefone */}
                    <div>
                      <label className="block text-xs font-mono text-[#D1D5DB] mb-1">
                        Telefone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+244 9..."
                        value={formData.telefone}
                        onChange={(e) =>
                          setFormData({ ...formData, telefone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#080611] border border-white/10 text-sm text-white placeholder-[#71717A] focus:outline-none focus:border-purple-500/80 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Interesse */}
                  <div>
                    <label className="block text-xs font-mono text-[#D1D5DB] mb-1">
                      Área de Interesse Principal
                    </label>
                    <select
                      value={formData.servicoInteresse}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          servicoInteresse: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#080611] border border-white/10 text-sm text-white focus:outline-none focus:border-purple-500/80 transition-colors"
                    >
                      <option value="Consultoria em AI">Consultoria em AI</option>
                      <option value="Websites inteligentes">Websites inteligentes</option>
                      <option value="Aplicações com Ai">Aplicações com Ai</option>
                      <option value="Transformação digital">Transformação digital</option>
                    </select>
                  </div>

                  {/* Mensagem */}
                  <div>
                    <label className="block text-xs font-mono text-[#D1D5DB] mb-1">
                      Mensagem / Descreva o seu objetivo *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Conte-nos sobre os objetivos, requisitos ou problemas que gostaria de resolver..."
                      value={formData.mensagem}
                      onChange={(e) =>
                        setFormData({ ...formData, mensagem: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-xl bg-[#080611] border text-sm text-white placeholder-[#71717A] focus:outline-none transition-colors resize-none ${
                        errors.mensagem
                          ? 'border-rose-500/80 focus:border-rose-500'
                          : 'border-white/10 focus:border-purple-500/80'
                      }`}
                    />
                    {errors.mensagem && (
                      <span className="text-[11px] text-rose-400 mt-1 block">
                        {errors.mensagem}
                      </span>
                    )}
                  </div>

                  {/* Submit Button Floating & Interactive */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-floating group relative overflow-hidden w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#2563EB] text-white font-semibold text-sm sm:text-base shadow-xl shadow-purple-900/50 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>A PROCESSAR O SEU PEDIDO...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <span className="relative z-10">Enviar Mensagem</span>
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-[#71717A] pt-1">
                    Ao submeter, os seus dados permanecem estritamente confidenciais.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

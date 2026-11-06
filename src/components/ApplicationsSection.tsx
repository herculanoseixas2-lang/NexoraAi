import React, { useState } from 'react';
import {
  Heart,
  Baby,
  ArrowUpRight,
  Sparkles,
  MessageCircle,
  Calendar,
  Bell,
  BookOpen,
  Layers,
  SunMoon,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  X,
  Bot,
  HelpCircle,
  Activity,
  Award,
} from 'lucide-react';
import amoraCover from '../assets/images/amora_ai_app_cover_1793977009334.jpg';
import graviFlowCover from '../assets/images/graviflow_app_cover_1793977010415.jpg';

interface AppItem {
  id: 'amora' | 'graviflow';
  name: string;
  tagline: string;
  category: string;
  statusBadge: string;
  link: string;
  coverImage: string;
  accentGradient: string;
  badgeColor: string;
  borderColor: string;
  glowColor: string;
  shortDescription: string;
  fullDescription: string[];
  features: { icon: React.ReactNode; title: string; desc: string }[];
  targetAudience?: string;
  mission: string;
  motto: string;
  disclaimer?: string;
}

export const ApplicationsSection: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);

  const apps: AppItem[] = [
    {
      id: 'amora',
      name: 'Amora AI',
      tagline: 'O teu assistente inteligente para relacionamentos',
      category: 'Inteligência Emocional & Relacionamentos',
      statusBadge: 'ONLINE • APLICAÇÃO ATIVA',
      link: 'https://amor-ai.vercel.app',
      coverImage: amoraCover,
      accentGradient: 'from-[#F43F5E] via-[#E11D48] to-[#9333EA]',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      borderColor: 'border-rose-500/30 hover:border-rose-500/60',
      glowColor: 'shadow-rose-950/40',
      shortDescription:
        'O Amora AI é uma aplicação desenvolvida para ajudar-te a compreender melhor os relacionamentos, melhorar a comunicação e tomar decisões mais conscientes na tua vida amorosa.',
      fullDescription: [
        'O Amora AI é uma aplicação desenvolvida para ajudar-te a compreender melhor os relacionamentos, melhorar a comunicação e tomar decisões mais conscientes na tua vida amorosa.',
        'Com ferramentas inteligentes e funcionalidades práticas, o Amora AI oferece apoio para analisar situações, preparar mensagens e compreender melhor as conversas e os comportamentos dentro de uma relação.',
      ],
      features: [
        {
          icon: <Bot className="w-4 h-4 text-rose-400" />,
          title: 'AI Coach',
          desc: 'Recebe orientação inteligente e personalizada para lidar com qualquer situação amorosa.',
        },
        {
          icon: <MessageCircle className="w-4 h-4 text-emerald-400" />,
          title: 'Analisador de WhatsApp',
          desc: 'Analisa conversas reais para ajudar-te a compreender melhor o contexto, sinais e subtextos da comunicação.',
        },
        {
          icon: <Sparkles className="w-4 h-4 text-purple-400" />,
          title: 'Gerador de Mensagens',
          desc: 'Cria mensagens empáticas, claras e personalizadas para diferentes momentos da relação.',
        },
        {
          icon: <Activity className="w-4 h-4 text-cyan-400" />,
          title: 'Simulador de Chat',
          desc: 'Pratica conversas delicadas com a IA e prepara-te com segurança para diferentes cenários.',
        },
        {
          icon: <Heart className="w-4 h-4 text-rose-400" />,
          title: 'Análise de Relacionamento',
          desc: 'Obtém uma avaliação construtiva e insights sobre a dinâmica da tua relação.',
        },
        {
          icon: <Award className="w-4 h-4 text-amber-400" />,
          title: 'Área VIP',
          desc: 'Acede à experiência completa e às funcionalidades exclusivas disponibilizadas pelo Amora AI.',
        },
      ],
      mission:
        'Tornar a inteligência artificial uma aliada na tua vida amorosa, ajudando-te a comunicar melhor, compreender situações complicadas, fortalecer a autoestima e desenvolver relacionamentos mais saudáveis.',
      motto: 'Mais compreensão, melhores conversas e decisões mais inteligentes no amor. ❤️',
    },
    {
      id: 'graviflow',
      name: 'GraviFlow',
      tagline: 'Porque cada fase importa! ❤️',
      category: 'Saúde Materna & Gestação Inteligente',
      statusBadge: 'ONLINE • APLICAÇÃO ATIVA',
      link: 'https://graviflow.vercel.app/',
      coverImage: graviFlowCover,
      accentGradient: 'from-[#EC4899] via-[#8B5CF6] to-[#06B6D4]',
      badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      borderColor: 'border-pink-500/30 hover:border-pink-500/60',
      glowColor: 'shadow-pink-950/40',
      shortDescription:
        'A tua gravidez, acompanhada com carinho. Uma aplicação digital desenvolvida para acompanhar as mulheres durante a gravidez, oferecendo ferramentas práticas para uma jornada organizada e tranquila.',
      fullDescription: [
        'O GraviFlow é uma aplicação digital desenvolvida para acompanhar as mulheres durante a gravidez, oferecendo ferramentas práticas para tornar esta jornada mais organizada, informativa e tranquila.',
        'O nosso objetivo é ajudar cada futura mamã a acompanhar as diferentes fases da gestação, cuidar do seu bem-estar e manter-se informada sobre o desenvolvimento do bebé.',
      ],
      features: [
        {
          icon: <Baby className="w-4 h-4 text-pink-400" />,
          title: 'Acompanhamento da gravidez',
          desc: 'Acompanha o crescimento semanal da gestação e o desenvolvimento passo a passo do bebé.',
        },
        {
          icon: <Calendar className="w-4 h-4 text-cyan-400" />,
          title: 'Calendário inteligente',
          desc: 'Organiza consultas médicas pré-natais, ecografias, exames laboratoriais e datas essenciais.',
        },
        {
          icon: <Bell className="w-4 h-4 text-amber-400" />,
          title: 'Lembretes personalizados',
          desc: 'Recebe alertas pontuais para compromissos médicos e tomas de medicamentos ou vitaminas gestacionais.',
        },
        {
          icon: <BookOpen className="w-4 h-4 text-emerald-400" />,
          title: 'Guias e conteúdos informativos',
          desc: 'Orientações e artigos claros sobre saúde na gravidez, puerpério e maternidade consciente.',
        },
        {
          icon: <Layers className="w-4 h-4 text-purple-400" />,
          title: 'Acompanhamento por fases',
          desc: 'Descobre informações clínicas e emocionais relevantes adaptadas a cada trimestre da gravidez.',
        },
        {
          icon: <SunMoon className="w-4 h-4 text-violet-400" />,
          title: 'Experiência personalizada',
          desc: 'Interface fluida e moderna com alternância entre modo claro e escuro para conforto visual.',
        },
      ],
      targetAudience:
        'Mulheres grávidas que desejam acompanhar melhor a sua gestação, organizar a rotina e ter informações úteis e carinhosas sempre à mão.',
      mission:
        'Tornar a jornada da maternidade mais simples, organizada e especial, colocando tecnologia e informação ao serviço das futuras mamãs.',
      motto: 'Cuida de ti. Cuida do teu bebé. Porque cada fase importa! ❤️',
      disclaimer:
        'Nota importante: O GraviFlow é uma ferramenta digital de acompanhamento e informação. Não substitui consultas pré-natais regulares, diagnósticos médicos ou orientações de profissionais de saúde.',
    },
  ];

  return (
    <section id="aplicacoes" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-purple-900/15 via-rose-900/10 to-cyan-900/15 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-mono font-semibold text-purple-300 uppercase tracking-widest mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ECOSSISTEMA DE PRODUTOS • NEXORA AI</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            Aplicações Desenvolvidas pela{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#38BDF8]">
              Nexora
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-light">
            Conheça as nossas plataformas digitais proprietárias. Soluções inovadoras criadas para impactar positivamente a vida real, desde o equilíbrio emocional nos relacionamentos até ao carinho na maternidade.
          </p>
        </div>

        {/* 2-Column Application Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {apps.map((app) => (
            <div
              key={app.id}
              className={`group relative rounded-3xl bg-[#0B0820]/90 border ${app.borderColor} shadow-2xl ${app.glowColor} overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1`}
            >
              {/* App Image Cover with Device Showcase Style */}
              <div className="relative aspect-video w-full overflow-hidden bg-black/60 border-b border-white/10">
                <img
                  src={app.coverImage}
                  alt={`Interface da aplicação ${app.name}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0820] via-black/30 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold border backdrop-blur-md ${app.badgeColor}`}>
                    {app.statusBadge}
                  </span>
                  <a
                    href={app.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono font-medium backdrop-blur-md transition-colors"
                  >
                    <span>Aceder Web App</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Bottom App Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    {app.category}
                  </div>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white flex items-center gap-2">
                    {app.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Tagline */}
                  <div className="text-sm sm:text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 mb-3">
                    {app.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-light">
                    {app.shortDescription}
                  </p>

                  {/* Feature Highlights Grid */}
                  <div className="mb-6">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      <span>Principais Funcionalidades</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {app.features.slice(0, 4).map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
                        >
                          <div className="p-1 rounded-lg bg-white/5 mt-0.5">
                            {feat.icon}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-zinc-200">
                              {feat.title}
                            </div>
                            <div className="text-[11px] text-zinc-400 line-clamp-1">
                              {feat.desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mission / Goal Quote Box */}
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-zinc-300 mb-6">
                    <span className="font-semibold text-purple-300 block mb-1">
                      {app.id === 'amora' ? 'O Objetivo do Amora AI:' : 'A Nossa Missão:'}
                    </span>
                    <p className="font-light italic leading-relaxed text-zinc-400">
                      "{app.mission}"
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={app.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r ${app.accentGradient} hover:brightness-110 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 group-hover:shadow-purple-950/60`}
                  >
                    <span>Abrir {app.name}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <button
                    onClick={() => setSelectedApp(app)}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono font-medium transition-colors cursor-pointer"
                  >
                    Ver Tudo & Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Application Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-[#090717] border border-purple-500/40 shadow-2xl shadow-purple-950/90 overflow-hidden text-left">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-purple-500/20 bg-[#0E0C24] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-rose-600 flex items-center justify-center shadow-lg">
                  {selectedApp.id === 'amora' ? (
                    <Heart className="w-5 h-5 text-white" />
                  ) : (
                    <Baby className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
                    {selectedApp.name}
                  </h3>
                  <span className="text-xs font-mono text-purple-300">
                    {selectedApp.tagline}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedApp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 text-xs font-mono transition-colors"
                >
                  <span>Aceder App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Scrollable */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Cover Preview */}
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10">
                <img
                  src={selectedApp.coverImage}
                  alt={selectedApp.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <a
                    href={selectedApp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:brightness-110 text-white font-semibold text-xs shadow-xl"
                  >
                    <span>Visitar {selectedApp.link}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-3">
                {selectedApp.fullDescription.map((para, i) => (
                  <p key={i} className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                    {para}
                  </p>
                ))}
              </div>

              {/* Full Features List */}
              <div>
                <h4 className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>
                    {selectedApp.id === 'amora' ? 'Principais Funcionalidades' : 'O Que Podes Encontrar'}
                  </span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedApp.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <div className="p-1 rounded bg-white/5">{feat.icon}</div>
                        <span className="font-semibold text-xs sm:text-sm text-white">
                          {feat.title}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed pl-6">
                        {feat.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Audience if present */}
              {selectedApp.targetAudience && (
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                  <h5 className="font-mono text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
                    <span>Para quem é o {selectedApp.name}?</span>
                  </h5>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {selectedApp.targetAudience}
                  </p>
                </div>
              )}

              {/* Mission / Goal Box */}
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30">
                <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider block mb-1">
                  {selectedApp.id === 'amora' ? 'O Objetivo do Amora AI' : 'A Nossa Missão'}
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {selectedApp.mission}
                </p>
                <div className="mt-3 pt-3 border-t border-purple-500/20 text-xs font-semibold text-white">
                  {selectedApp.motto}
                </div>
              </div>

              {/* Medical Disclaimer if present */}
              {selectedApp.disclaimer && (
                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-[11px] text-amber-200/90 leading-relaxed flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{selectedApp.disclaimer}</span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-purple-500/20 bg-[#0E0C24] flex items-center justify-between gap-3">
              <span className="text-xs font-mono text-zinc-400 truncate">
                {selectedApp.link}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  Fechar
                </button>
                <a
                  href={selectedApp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-rose-600 to-cyan-600 hover:brightness-110 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-950/50"
                >
                  <span>Aceder à Aplicação</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

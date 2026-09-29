import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import introRobotImg from '../assets/images/intro_cinematic_robot_1790155464240.jpg';

interface IntroExperienceProps {
  onEnter: () => void;
}

export const IntroExperience: React.FC<IntroExperienceProps> = ({ onEnter }) => {
  const [isActivating, setIsActivating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse move and touch listener for 3D parallax
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: normX, y: normY });
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const normX = (touch.clientX / window.innerWidth - 0.5) * 2;
        const normY = (touch.clientY / window.innerHeight - 0.5) * 2;
        setMousePos({ x: normX, y: normY });
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, []);

  // Holographic floating particles & cybernetic data streams
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 65;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: -0.3 - Math.random() * 0.8,
      size: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? '#8B5CF6' : '#38BDF8',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint cybernetic grid
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.035)';
      ctx.lineWidth = 1;
      const step = 60;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw animated particles
      particles.forEach((p) => {
        p.x += p.vx * (isActivating ? 4 : 1);
        p.y += p.vy * (isActivating ? 4 : 1);

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = isActivating ? Math.min(1, p.alpha * 1.8) : p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (isActivating ? 1.5 : 1), 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActivating]);

  const handleStartTransition = () => {
    if (isActivating) return;
    setIsActivating(true);
    // Smooth cinematic warp duration before completing transition
    setTimeout(() => {
      onEnter();
    }, 1100);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-[#05040A] text-white transition-opacity duration-1000 ${
        isActivating ? 'scale-105 pointer-events-none' : ''
      }`}
    >
      {/* Background robot artwork with dark cinematic vignetting */}
      <div className="absolute inset-0 z-0 overflow-hidden perspective-[1200px]">
        <img
          src={introRobotImg}
          alt="Nexora AI Humanoid Intelligence"
          style={{
            transform: `scale(${isActivating ? 1.15 : 1.05}) translate3d(${-mousePos.x * 20}px, ${-mousePos.y * 20}px, 0) rotateX(${-mousePos.y * 6}deg) rotateY(${mousePos.x * 6}deg)`,
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className={`h-full w-full object-cover object-center ${
            isActivating
              ? 'brightness-130 contrast-125'
              : 'opacity-75 contrast-110'
          }`}
        />
        {/* Deep atmospheric gradients & radial lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05040A] via-[#080611]/80 to-[#05040A]/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#05040A]/70 to-[#05040A]" />
        {/* Glowing aura lights */}
        <div
          className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ${
            isActivating
              ? 'bg-[#7C3AED]/70 scale-150 opacity-100'
              : 'bg-[#7C3AED]/30 opacity-70 animate-pulse-slow'
          }`}
        />
        <div className="absolute top-1/2 left-1/3 w-[450px] h-[450px] rounded-full bg-[#2563EB]/25 blur-[120px] pointer-events-none" />
      </div>

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Top bar with quick skip button */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-12 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#2563EB] p-[1px] shadow-lg shadow-[#7C3AED]/30">
            <div className="w-full h-full bg-[#080611] rounded-[7px] flex items-center justify-center">
              <Cpu className="w-4 h-4 text-[#38BDF8]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold tracking-wider text-base text-white">
              NEXORA <span className="text-[#8B5CF6]">AI</span>
            </span>
          </div>
        </div>

        <button
          onClick={onEnter}
          className="text-xs uppercase tracking-widest text-[#A1A1AA] hover:text-white transition-colors duration-200 py-1.5 px-3 rounded border border-white/10 hover:border-purple-500/40 bg-white/5 backdrop-blur-sm cursor-pointer"
        >
          Saltar introdução
        </button>
      </header>

      {/* Main Center Cinematic Content */}
      <main className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-3xl mx-auto my-auto py-8">
        {/* Status indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151332]/80 border border-purple-500/30 text-xs text-[#38BDF8] tracking-wider uppercase mb-6 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38BDF8]" />
          </span>
          <span>SISTEMA DE INTELIGÊNCIA ARTIFICIAL ONLINE</span>
        </div>

        {/* Brand Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-none">
          NEXORA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#38BDF8] to-[#7C3AED]">AI</span>
        </h1>

        <p className="font-display text-lg sm:text-2xl font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E5E7EB] to-[#A1A1AA] mb-4">
          INTELIGÊNCIA QUE TRANSFORMA.
        </p>

        <p className="text-sm sm:text-base text-[#D1D5DB] max-w-xl mb-10 leading-relaxed font-light">
          Consultoria, tecnologia e soluções de inteligência artificial para negócios preparados para o futuro.
        </p>

        {/* Main CTA Trigger Button */}
        <div className="relative group">
          {/* Pulsing button glow */}
          <div
            className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#38BDF8] to-[#2563EB] opacity-75 blur-lg transition duration-500 group-hover:opacity-100 ${
              isActivating ? 'scale-125 opacity-100 blur-xl' : ''
            }`}
          />

          <button
            onClick={handleStartTransition}
            disabled={isActivating}
            className="btn-floating relative flex items-center gap-3 px-8 py-4 rounded-xl bg-[#0B0820] border border-purple-400/50 text-white font-semibold text-sm sm:text-base tracking-wide hover:bg-[#111027] transition-all duration-300 shadow-2xl cursor-pointer"
          >
            <Sparkles className={`w-4 h-4 text-[#38BDF8] ${isActivating ? 'animate-spin' : ''}`} />
            <span>{isActivating ? 'A CONECTAR AO NÚCLEO...' : 'ENTRAR NO UNIVERSO NEXORA'}</span>
            <ArrowRight
              className={`w-4 h-4 text-[#8B5CF6] transition-transform duration-300 group-hover:translate-x-1 ${
                isActivating ? 'translate-x-3' : ''
              }`}
            />
          </button>
        </div>

        {/* Floating Telemetry Indicators */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 pt-8 border-t border-white/10 text-left w-full max-w-md">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#A1A1AA]">Ambiente</div>
            <div className="text-xs font-mono text-white font-semibold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              NEURAL CORE
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#A1A1AA]">Processamento</div>
            <div className="text-xs font-mono text-[#38BDF8] font-semibold mt-0.5">
              98.7% PRONTO
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#A1A1AA]">Segurança</div>
            <div className="text-xs font-mono text-[#8B5CF6] font-semibold flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              CRIPTOGRAFADO
            </div>
          </div>
        </div>
      </main>

      {/* Footer minimal info */}
      <footer className="relative z-20 py-5 text-center text-xs text-[#71717A] tracking-wider">
        <span>© 2026 NEXORA AI • TECNOLOGIA & INTELIGÊNCIA ARTIFICIAL EM ANGOLA</span>
      </footer>

      {/* Intense energy flash on click */}
      {isActivating && (
        <div className="absolute inset-0 z-40 bg-gradient-to-r from-[#7C3AED]/40 via-[#38BDF8]/40 to-[#2563EB]/40 backdrop-blur-md animate-pulse pointer-events-none" />
      )}
    </div>
  );
};

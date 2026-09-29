import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Cpu, Zap, Activity, Scan, ShieldCheck, Sparkles, Sliders } from 'lucide-react';
import exteriorRobotImg from '../assets/images/nexora_robot_exterior_1790615610847.jpg';
import skeletonRobotImg from '../assets/images/nexora_robot_skeleton_1790615634365.jpg';
import { soundEffects } from '../utils/audioEffects';

interface NexoraRobotProps {
  onHoverStateChange?: (isHovered: boolean, intensity: number) => void;
}

export const NexoraRobot: React.FC<NexoraRobotProps> = ({ onHoverStateChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileToggled, setIsMobileToggled] = useState(false);
  const [lensMode, setLensMode] = useState(false); // Optional focal lens vs full body scan
  const [mouseCoord, setMouseCoord] = useState({ x: 50, y: 50 }); // % inside container
  const [globalMouse, setGlobalMouse] = useState({ x: 0, y: 0 }); // -1 to 1
  const [proximity, setProximity] = useState(0); // 0 to 1
  const [scanPulse, setScanPulse] = useState(0);

  // Determine active skeleton state (desktop hover or mobile tap)
  const isSkeletonActive = isHovered || isMobileToggled;

  // Track global cursor to compute proximity illumination and subtle parallax
  useEffect(() => {
    let rafId: number | null = null;
    let pendingX = 0;
    let pendingY = 0;
    let clientX = 0;
    let clientY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      pendingX = (e.clientX / innerWidth - 0.5) * 2;
      pendingY = (e.clientY / innerHeight - 0.5) * 2;
      clientX = e.clientX;
      clientY = e.clientY;

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          rafId = null;
          setGlobalMouse({ x: pendingX, y: pendingY });

          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            // Skip computation if robot container is completely offscreen
            if (rect.bottom < 0 || rect.top > window.innerHeight) return;

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dist = Math.hypot(clientX - centerX, clientY - centerY);
            const maxDist = Math.max(window.innerWidth, window.innerHeight) * 0.45;
            const prox = Math.max(0, 1 - dist / maxDist);
            // Only update proximity if changed noticeably
            setProximity((prev) => (Math.abs(prev - prox) > 0.04 ? prox : prev));
          }
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Keep onHoverStateChange in a ref so its reference doesn't re-trigger the effect
  const onHoverStateChangeRef = useRef(onHoverStateChange);
  useEffect(() => {
    onHoverStateChangeRef.current = onHoverStateChange;
  });

  // Update parent with hover & proximity intensity
  useEffect(() => {
    const intensity = isSkeletonActive ? 1.0 : Math.max(0.15, proximity);
    onHoverStateChangeRef.current?.(isSkeletonActive, intensity);
  }, [isSkeletonActive, proximity]);

  // Handle local mouse move inside robot container for lens mode & lighting angle
  const handleLocalMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setMouseCoord({ x, y });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setScanPulse((p) => p + 1);
    soundEffects.playXrayActivate();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    soundEffects.playXrayDeactivate();
  };

  // Mobile / touch tap toggle
  const handleTap = () => {
    setIsMobileToggled((prev) => {
      const next = !prev;
      if (next) {
        soundEffects.playXrayActivate();
        setScanPulse((p) => p + 1);
      } else {
        soundEffects.playXrayDeactivate();
      }
      return next;
    });
  };

  // Parallax transform calculation: responsive, smooth, subtle
  const tiltX = -globalMouse.y * 6; // pitch
  const tiltY = globalMouse.x * 7;  // yaw

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* Interactive Quick Mode Controls */}
      <div className="flex items-center gap-2 mb-3 z-30">
        <button
          onClick={() => setLensMode(false)}
          className={`px-3 py-1 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
            !lensMode
              ? 'bg-[#7C3AED]/25 border border-[#A855F7] text-white shadow-sm shadow-purple-900/50'
              : 'bg-[#120F24]/80 border border-white/10 text-zinc-400 hover:text-white'
          }`}
          title="Raio-X Completo"
        >
          <Scan className="w-3 h-3 text-[#A855F7]" />
          <span>RAIO-X TOTAL</span>
        </button>

        <button
          onClick={() => setLensMode(true)}
          className={`px-3 py-1 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
            lensMode
              ? 'bg-[#7C3AED]/25 border border-[#A855F7] text-white shadow-sm shadow-purple-900/50'
              : 'bg-[#120F24]/80 border border-white/10 text-zinc-400 hover:text-white'
          }`}
          title="Lente Focal Dinâmica"
        >
          <Sliders className="w-3 h-3 text-[#C084FC]" />
          <span>LENTE INTERATIVA</span>
        </button>

        {/* Mobile tap toggle button */}
        <button
          onClick={handleTap}
          className={`sm:hidden px-3 py-1 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
            isSkeletonActive
              ? 'bg-purple-600 text-white font-bold'
              : 'bg-[#1A1635] text-purple-300 border border-purple-500/40'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>{isSkeletonActive ? 'BLINDAGEM EXTERNA' : 'ATIVAR ESQUELETO'}</span>
        </button>
      </div>

      {/* Main 3D Interactive Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleLocalMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleTap}
        style={{
          transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[460px] lg:max-w-[500px] xl:max-w-[540px] aspect-[3/4] rounded-2xl sm:rounded-3xl cursor-pointer transition-transform duration-300 ease-out group"
      >
        {/* Volumetric background glow reacting to proximity and hover */}
        <div
          className="absolute -inset-4 rounded-3xl -z-10 pointer-events-none transition-all duration-500"
          style={{
            background: isSkeletonActive
              ? 'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.45) 0%, rgba(88, 28, 135, 0.2) 50%, transparent 80%)'
              : `radial-gradient(circle at 50% 50%, rgba(124, 58, 237, ${0.15 + proximity * 0.25}) 0%, transparent 70%)`,
            filter: 'blur(30px)',
          }}
        />

        {/* Outer futuristic frame / rim border */}
        <div
          className={`absolute -inset-[1px] rounded-2xl sm:rounded-3xl pointer-events-none transition-all duration-500 -z-5 ${
            isSkeletonActive
              ? 'bg-gradient-to-b from-[#A855F7] via-[#7C3AED]/70 to-[#3B82F6]/60 opacity-90 blur-[1px]'
              : 'bg-gradient-to-b from-purple-500/30 via-white/10 to-transparent opacity-60'
          }`}
        />

        {/* Robot Visual Layer Container */}
        <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#040308] border border-purple-500/25 shadow-2xl shadow-purple-950/80">
          {/* LAYER 1: Internal Mechanical Skeleton (Always underneath) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={skeletonRobotImg}
              alt="Nexora Internal Mechanical Skeleton Architecture"
              className="w-full h-full object-cover object-center transform scale-[1.02]"
              loading="eager"
            />

            {/* Glowing purple mechanical conduits & quantum core overlay */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-500 mix-blend-screen ${
                isSkeletonActive ? 'opacity-85' : 'opacity-0'
              }`}
              style={{
                background:
                  'radial-gradient(circle at 50% 48%, rgba(168, 85, 247, 0.45) 0%, rgba(124, 58, 237, 0.15) 35%, transparent 70%)',
              }}
            />

            {/* Scientific HUD Grid Overlay (Visible in skeleton mode) */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                isSkeletonActive ? 'opacity-60' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(168, 85, 247, 0.08) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(168, 85, 247, 0.08) 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px',
              }}
            />

            {/* Interactive Anatomical Callouts (Mechanical joints, spine, servo motors, pistons) */}
            {isSkeletonActive && !lensMode && (
              <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-100">
                {/* 1. Cervical/Head: Neural Sensor Array */}
                <div className="absolute top-[16%] left-[18%] flex items-center gap-2 animate-fadeIn">
                  <div className="w-2 h-2 rounded-full bg-[#C084FC] animate-ping" />
                  <div className="h-[1px] w-8 bg-gradient-to-r from-[#C084FC] to-transparent" />
                  <div className="px-2 py-0.5 rounded bg-black/80 border border-purple-500/40 text-[9px] font-mono text-purple-200 backdrop-blur-sm shadow-md">
                    SENSOR NEURAL // 8K OCULAR
                  </div>
                </div>

                {/* 2. Chest: Quantum Neural Core */}
                <div className="absolute top-[38%] right-[12%] flex items-center gap-2 animate-fadeIn">
                  <div className="px-2 py-0.5 rounded bg-black/85 border border-[#A855F7]/60 text-[9px] font-mono text-purple-300 backdrop-blur-sm shadow-md text-right">
                    NÚCLEO NEURAL // 128 TFLOPS
                  </div>
                  <div className="h-[1px] w-7 bg-gradient-to-l from-[#C084FC] to-transparent" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#A855F7] animate-pulse" />
                </div>

                {/* 3. Spinal Column / Titanium Truss */}
                <div className="absolute top-[52%] left-[14%] flex items-center gap-2 animate-fadeIn">
                  <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                  <div className="h-[1px] w-6 bg-gradient-to-r from-[#38BDF8] to-transparent" />
                  <div className="px-2 py-0.5 rounded bg-black/80 border border-sky-500/40 text-[9px] font-mono text-sky-200 backdrop-blur-sm shadow-md">
                    COLUNA DE TITÂNIO // 24 VÉRTEBRAS
                  </div>
                </div>

                {/* 4. Shoulder Servo Motors */}
                <div className="absolute top-[28%] left-[10%] flex items-center gap-2 animate-fadeIn">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <div className="h-[1px] w-5 bg-gradient-to-r from-purple-400 to-transparent" />
                  <div className="px-2 py-0.5 rounded bg-black/80 border border-purple-500/40 text-[9px] font-mono text-purple-200 backdrop-blur-sm">
                    SERVOMOTOR // 480 N·m
                  </div>
                </div>

                {/* 5. Forearm / Piston Cluster */}
                <div className="absolute bottom-[24%] right-[14%] flex items-center gap-2 animate-fadeIn">
                  <div className="px-2 py-0.5 rounded bg-black/85 border border-purple-500/50 text-[9px] font-mono text-purple-200 backdrop-blur-sm text-right">
                    PISTÕES HIDRÁULICOS // BIÔNICOS
                  </div>
                  <div className="h-[1px] w-6 bg-gradient-to-l from-purple-400 to-transparent" />
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                </div>
              </div>
            )}
          </div>

          {/* LAYER 2: Finished Exterior Armor & Metallic Shell */}
          {/* When lensMode is ON: uses CSS clip-path or radial mask around cursor */}
          {/* When lensMode is OFF (default): uses smooth 300-600ms opacity transition */}
          <div
            className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-out"
            style={{
              opacity: lensMode ? 1 : isSkeletonActive ? 0.05 : 1,
              maskImage:
                lensMode && isSkeletonActive
                  ? `radial-gradient(circle 120px at ${mouseCoord.x}% ${mouseCoord.y}%, transparent 40%, rgba(0,0,0,0.4) 65%, black 100%)`
                  : undefined,
              WebkitMaskImage:
                lensMode && isSkeletonActive
                  ? `radial-gradient(circle 120px at ${mouseCoord.x}% ${mouseCoord.y}%, transparent 40%, rgba(0,0,0,0.4) 65%, black 100%)`
                  : undefined,
            }}
          >
            <img
              src={exteriorRobotImg}
              alt="Nexora AI Autonomous Humanoid Robot"
              className="w-full h-full object-cover object-center transform scale-[1.02]"
              loading="eager"
            />

            {/* Specular metallic sheen tracking mouse position */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${mouseCoord.x}% ${mouseCoord.y}%, rgba(255, 255, 255, 0.22) 0%, rgba(168, 85, 247, 0.12) 35%, transparent 65%)`,
              }}
            />
          </div>

          {/* LAYER 3: Optical Lens Reticle in Lens Mode */}
          {lensMode && isSkeletonActive && (
            <div
              className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/80 shadow-[0_0_25px_rgba(168,85,247,0.7)] transition-transform duration-75"
              style={{
                left: `${mouseCoord.x}%`,
                top: `${mouseCoord.y}%`,
                width: '240px',
                height: '240px',
              }}
            >
              <div className="absolute inset-0 rounded-full border border-dashed border-purple-300/40 animate-spin [animation-duration:18s]" />
              <div className="absolute top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 text-[9px] font-mono text-purple-200 border border-purple-400/40">
                X-RAY FOCUS
              </div>
            </div>
          )}

          {/* LAYER 4: Laser Scan Sweep Animation on Hover Transition */}
          <div
            key={scanPulse}
            className={`absolute inset-x-0 h-2 bg-gradient-to-r from-transparent via-[#C084FC] to-transparent shadow-[0_0_20px_#A855F7] pointer-events-none ${
              isSkeletonActive ? 'animate-scan-sweep' : 'hidden'
            }`}
          />

          {/* Vignette Shadowing for Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#040308] via-transparent to-transparent opacity-75 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040308]/40 via-transparent to-transparent opacity-40 pointer-events-none" />

          {/* HUD Floating Readout: Top Bar */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-none z-10">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/75 border border-purple-500/30 backdrop-blur-md shadow-lg">
              <span
                className={`w-2 h-2 rounded-full ${
                  isSkeletonActive ? 'bg-purple-400 animate-ping' : 'bg-emerald-400 animate-pulse'
                }`}
              />
              <span className="text-[11px] font-mono tracking-wider text-purple-200">
                {isSkeletonActive ? 'VISUALIZAÇÃO RAIO-X // MECÂNICA' : 'MODO EXTERNO // BLINDAGEM'}
              </span>
            </div>

            <div className="px-2.5 py-1 rounded-lg bg-black/75 border border-white/10 text-[10px] font-mono text-zinc-300 backdrop-blur-md">
              NEXORA PROTOCOL 4.9
            </div>
          </div>

          {/* Bottom Telemetry Card inside Robot Frame */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-3 sm:p-3.5 rounded-xl bg-black/85 border border-purple-500/30 backdrop-blur-md shadow-xl pointer-events-none z-10">
            <div className="flex items-center justify-between text-xs">
              <div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-purple-300/80 flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-[#A855F7]" />
                  <span>ARQUITETURA INTELIGENTE</span>
                </div>
                <div className="text-sm font-display font-bold text-white mt-0.5">
                  {isSkeletonActive ? 'Endoesqueleto Mecatrónico' : 'Humanóide Nexora Mark IV'}
                </div>
              </div>

              <div className="text-right font-mono">
                <div className="text-[9px] text-zinc-400 uppercase">INTERAÇÃO</div>
                <div className="text-[11px] text-emerald-400 font-medium flex items-center justify-end gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isSkeletonActive ? 'ESQUELETO ATIVO' : 'PASSE O CURSOR'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient Ground Glow reflection under the robot */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full pointer-events-none blur-xl transition-all duration-500"
          style={{
            background: isSkeletonActive
              ? 'rgba(168, 85, 247, 0.45)'
              : `rgba(124, 58, 237, ${0.15 + proximity * 0.25})`,
          }}
        />
      </div>

      {/* Subtle Hint Text Below Robot */}
      <div className="mt-3.5 flex items-center gap-2 text-xs font-mono text-zinc-400">
        <Zap className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
        <span className="hidden sm:inline">
          Passe o cursor sobre o robô para inspecionar o esqueleto mecânico interno
        </span>
        <span className="sm:hidden">
          Toque no robô para inspecionar o esqueleto mecânico interno
        </span>
      </div>
    </div>
  );
};

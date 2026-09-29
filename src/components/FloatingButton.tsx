import React, { useRef, useState, useCallback } from 'react';
import { soundEffects } from '../utils/audioEffects';

interface FloatingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'neon';
  children: React.ReactNode;
  className?: string;
  magnetic?: boolean;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  magnetic = true,
  onClick,
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Magnetic pull up to 8px in X and 8px in Y
      const deltaX = (e.clientX - centerX) * 0.22;
      const deltaY = (e.clientY - centerY) * 0.22;

      setOffset({ x: deltaX, y: deltaY });
    },
    [magnetic]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundEffects.playClick();
    if (onClick) {
      onClick(e);
    }
  };

  // Base variant styles
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#7C3AED] via-[#6D28D9] to-[#3B82F6] text-white shadow-xl shadow-purple-950/70 hover:shadow-purple-600/50 hover:brightness-110 border border-purple-400/30',
    secondary:
      'bg-[#0F0C22]/90 hover:bg-[#1A1638] text-white border border-purple-500/35 hover:border-purple-400 shadow-lg shadow-purple-950/40 backdrop-blur-md',
    glass:
      'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-purple-400/50 backdrop-blur-lg shadow-md',
    neon:
      'bg-black/80 text-purple-300 border-2 border-purple-500/60 hover:border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] hover:text-white',
  };

  // Compute 3D tilt
  const tiltX = -offset.y * 0.8;
  const tiltY = offset.x * 0.8;

  return (
    <div className="relative inline-block group">
      {/* Floating ambient glow shadow underneath the button */}
      <div
        className={`absolute -inset-1 rounded-2xl pointer-events-none transition-all duration-500 -z-10 blur-lg ${
          isHovered
            ? 'opacity-85 bg-gradient-to-r from-purple-600/60 to-blue-500/60 scale-105'
            : 'opacity-40 bg-purple-900/30 scale-95'
        }`}
      />

      {/* Floating elevation shadow reflecting below the button */}
      <div
        className={`absolute -bottom-3 left-1/2 -translate-x-1/2 h-2 rounded-full bg-purple-950/80 blur-md pointer-events-none transition-all duration-500 -z-20 ${
          isHovered ? 'w-4/5 opacity-80 scale-110' : 'w-3/5 opacity-50'
        }`}
      />

      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          transform: isHovered
            ? `translate3d(${offset.x}px, ${offset.y - 6}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.025)`
            : undefined,
          transition: isHovered
            ? 'transform 0.08s ease-out, box-shadow 0.3s ease, border-color 0.3s ease'
            : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease',
        }}
        className={`btn-floating relative overflow-hidden select-none cursor-pointer flex items-center justify-center font-semibold text-sm rounded-xl px-7 py-4 transition-all duration-300 ${variantStyles[variant]} ${className}`}
        {...rest}
      >
        {/* Dynamic glossy light sheen that follows cursor */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 80px at ${50 + offset.x * 2}% ${
              50 + offset.y * 2
            }%, rgba(255,255,255,0.25), transparent 70%)`,
          }}
        />

        {/* Shimmer sweep animation across the surface */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

        <span className="relative z-10 flex items-center gap-2.5">{children}</span>
      </button>
    </div>
  );
};

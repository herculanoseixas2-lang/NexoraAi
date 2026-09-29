import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: string;
}

interface ParticleBackgroundProps {
  mousePos?: { x: number; y: number };
  glowIntensity?: number;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ glowIntensity = 0.35 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseActive = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Balanced particle count for silky smooth 60+ FPS
    const isMobile = width < 768;
    const particleCount = isMobile ? 22 : 40;
    const particles: Particle[] = [];
    const colors = [
      'rgba(168, 85, 247, ',
      'rgba(192, 132, 252, ',
      'rgba(147, 51, 234, ',
      'rgba(56, 189, 248, ',
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28 - 0.08, // subtle upward cosmic drift
        size: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.4 + 0.1,
        baseAlpha: Math.random() * 0.35 + 0.1,
        color: colors[i % colors.length],
      });
    }

    const maxDist = 110;
    const maxDistSq = maxDist * maxDist;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Fast connection lines with squared distance check
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * 0.07 * (1 + glowIntensity * 0.4);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (isMouseActive) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 32400) {
            // within 180px
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 180) * 0.012;
            p.x += dx * force;
            p.y += dy * force;
          }
        }

        // Boundary wrap
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const dynamicAlpha = Math.min(1, p.baseAlpha * (1 + glowIntensity * 0.5));
        ctx.fillStyle = `${p.color}${dynamicAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [glowIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1] w-full h-full opacity-65 will-change-transform"
    />
  );
};

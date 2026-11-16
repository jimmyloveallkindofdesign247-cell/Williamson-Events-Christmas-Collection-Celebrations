import { useEffect, useRef } from 'react';

interface Flake {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  drift: number;
  alpha: number;
  phase: number;
}

export function SnowfallCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const flakeCount = width < 768 ? 32 : 58;
    const flakes: Flake[] = Array.from({ length: flakeCount }, (_, idx) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 1.1 + (idx % 4) * 0.65,
      speedY: 0.35 + (idx % 5) * 0.16,
      drift: 0.15 + (idx % 3) * 0.12,
      alpha: 0.18 + (idx % 5) * 0.11,
      phase: Math.random() * Math.PI * 2,
    }));

    let tick = 0;
    const render = () => {
      tick += 0.012;
      ctx.clearRect(0, 0, width, height);

      for (const flake of flakes) {
        flake.y += flake.speedY;
        flake.x += Math.sin(tick + flake.phase) * flake.drift;

        if (flake.y > height + 8) {
          flake.y = -8;
          flake.x = Math.random() * width;
        }
        if (flake.x > width + 8) flake.x = -8;
        if (flake.x < -8) flake.x = width + 8;

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 253, 245, ${flake.alpha})`;
        ctx.fill();
      }

      animationId = window.requestAnimationFrame(render);
    };

    animationId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20"
    />
  );
}

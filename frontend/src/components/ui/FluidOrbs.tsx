"use client";

import { useEffect, useRef } from "react";

interface Orb {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  hue: number; hueSpeed: number;
  alpha: number;
}

interface FluidOrbsProps {
  count?: number;
  className?: string;
}

/**
 * Lusion-inspired fluid orb canvas background.
 * Smooth, slow-moving blobs that breathe and morph.
 */
export default function FluidOrbs({ count = 5, className = "" }: FluidOrbsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let W = 0, H = 0;

    const orbs: Orb[] = [];

    function resize() {
      W = canvas!.width  = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
    }

    function initOrbs() {
      orbs.length = 0;
      const hues = [230, 260, 200, 300, 180]; // indigo/purple/cyan range
      for (let i = 0; i < count; i++) {
        orbs.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.min(W, H) * (0.25 + Math.random() * 0.2),
          hue: hues[i % hues.length],
          hueSpeed: (Math.random() - 0.5) * 0.2,
          alpha: 0.12 + Math.random() * 0.1,
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      for (const orb of orbs) {
        // Move
        orb.x += orb.vx;
        orb.y += orb.vy;
        orb.hue += orb.hueSpeed;

        // Bounce
        if (orb.x < -orb.r) orb.x = W + orb.r;
        if (orb.x > W + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = H + orb.r;
        if (orb.y > H + orb.r) orb.y = -orb.r;

        // Draw radial gradient blob
        const grad = ctx!.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0,   `hsla(${orb.hue}, 70%, 60%, ${orb.alpha})`);
        grad.addColorStop(0.5, `hsla(${orb.hue + 20}, 60%, 50%, ${orb.alpha * 0.5})`);
        grad.addColorStop(1,   `hsla(${orb.hue + 40}, 50%, 40%, 0)`);

        ctx!.beginPath();
        ctx!.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    initOrbs();
    draw();

    const ro = new ResizeObserver(() => { resize(); initOrbs(); });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ filter: "blur(60px)" }}
    />
  );
}

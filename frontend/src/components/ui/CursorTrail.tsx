"use client";

import { useEffect, useRef, useState } from "react";

// Theme colors: HTML (Orange), CSS (Blue), JS (Yellow), React (Purple)
const COLORS = ["#ea6b1a", "#2563eb", "#eab308", "#7c3aed"];

class Point {
  x: number;
  y: number;
  age: number;
  color: string;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.age = 0;
    this.color = color;
  }
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device — hide cursor trail entirely
    const checkTouch = () => {
      const isCustomCursorDisabled = localStorage.getItem("beecodefi_custom_cursor") === "disabled";
      if (window.matchMedia("(pointer: coarse)").matches || isCustomCursorDisabled) {
        setIsTouch(true);
      }
    };
    checkTouch();

    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let points: Point[] = [];
    let animationFrameId: number;
    let lastMoveTime = 0;
    let currentColor = COLORS[Math.floor(Math.random() * COLORS.length)];

    // Handle resizing
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", updateSize);
    updateSize();

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      // If there was a pause of more than 150ms, pick a new random color for this new stroke
      if (now - lastMoveTime > 150) {
        let newColor;
        // Ensure it picks a different color than the current one
        do {
          newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        } while (newColor === currentColor && COLORS.length > 1);
        currentColor = newColor;
      }
      lastMoveTime = now;
      
      points.push(new Point(e.clientX, e.clientY, currentColor));
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw thick brush strokes
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.age++;

        // Remove old points (increased from 40 to 80 for slower fade)
        if (p.age > 80) {
          points.splice(i, 1);
          i--;
          continue;
        }

        // The older the point, the thinner and more transparent it gets
        const life = 1 - p.age / 80;
        
        ctx.beginPath();
        // A thick brush look — connecting to the previous point
        if (i > 0) {
          const prevP = points[i - 1];
          ctx.moveTo(prevP.x, prevP.y);
        } else {
          ctx.moveTo(p.x, p.y);
        }
        ctx.lineTo(p.x, p.y);
        
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 24 * life; // Thick start, tapers off
        
        // Convert hex to rgb for opacity
        const hex = p.color;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${life * 0.5})`;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}

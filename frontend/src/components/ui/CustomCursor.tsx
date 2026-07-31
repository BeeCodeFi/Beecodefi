"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CURSOR_COLORS = [
  "#ff6b35", "#ff3d81", "#f43f5e", "#ec4899",
  "#a855f7", "#7c3aed", "#3b82f6", "#06b6d4",
  "#14b8a6", "#22c55e", "#eab308", "#f97316",
];

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 40, mass: 0.3 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40, mass: 0.3 });

  const trailX = useSpring(cursorX, { stiffness: 120, damping: 28, mass: 0.6 });
  const trailY = useSpring(cursorY, { stiffness: 120, damping: 28, mass: 0.6 });

  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible]   = useState(false);
  const [isTouch, setIsTouch]   = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch device — hide cursor entirely
    const checkTouch = () => {
      const isCustomCursorDisabled = localStorage.getItem("beecodefi_custom_cursor") === "disabled";
      if (window.matchMedia("(pointer: coarse)").matches || isCustomCursorDisabled) {
        setIsTouch(true);
      }
    };
    checkTouch();

    const onMove = (e: MouseEvent) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        if (!visible) setVisible(true);
      });

      // Check if we're over an interactive element
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor-grow], input, textarea, select, label");
      setHovering(!!interactive);
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [cursorX, cursorY, visible]);

  if (isTouch) return null;

  return (
    <>
      {/* Trailing outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-indigo-500/40 dark:border-indigo-400/50"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width:  hovering ? 44 : clicking ? 24 : 32,
          height: hovering ? 44 : clicking ? 24 : 32,
          borderColor: hovering
            ? "rgba(255,255,255,0.85)"
            : clicking
            ? "rgba(255,255,255,0.95)"
            : CURSOR_COLORS,
        }}
        transition={{
          duration: hovering || clicking ? 0.2 : 4.5,
          repeat: hovering || clicking ? 0 : Infinity,
          ease: "linear",
        }}
      />

      {/* Sharp inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width:  hovering ? 6 : clicking ? 10 : 7,
          height: hovering ? 6 : clicking ? 10 : 7,
          opacity: visible ? (hovering ? 0.7 : 1) : 0,
          backgroundColor: clicking ? "#ffffff" : CURSOR_COLORS,
        }}
        transition={{
          duration: clicking ? 0.15 : 4.5,
          repeat: clicking ? 0 : Infinity,
          ease: "linear",
        }}
      />
    </>
  );
}

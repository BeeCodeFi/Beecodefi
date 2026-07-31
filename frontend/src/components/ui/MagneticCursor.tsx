"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "click";

export default function MagneticCursor() {
  const cursorX  = useMotionValue(-100);
  const cursorY  = useMotionValue(-100);
  const trailX   = useMotionValue(-100);
  const trailY   = useMotionValue(-100);

  // Smooth spring for main dot
  const springX = useSpring(cursorX, { stiffness: 700, damping: 30, mass: 0.3 });
  const springY = useSpring(cursorY, { stiffness: 700, damping: 30, mass: 0.3 });

  // Lagging spring for trail blob
  const trailSpringX = useSpring(trailX, { stiffness: 120, damping: 20, mass: 0.8 });
  const trailSpringY = useSpring(trailY, { stiffness: 120, damping: 20, mass: 0.8 });

  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Only show on non-touch devices
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const down = () => setState("click");
    const up   = () => setState("hover");

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isHoverable = el.closest("a, button, [data-cursor-hover]");
      setState(isHoverable ? "hover" : "default");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.style.cursor = "";
    };
  }, [cursorX, cursorY, trailX, trailY, visible]);

  if (isMobile) return null;

  const isHover = state === "hover";
  const isClick = state === "click";

  return (
    <>
      {/* Trail blob */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: trailSpringX, y: trailSpringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width:  isHover ? 48 : isClick ? 20 : 32,
            height: isHover ? 48 : isClick ? 20 : 32,
            opacity: visible ? (isHover ? 0.25 : 0.12) : 0,
            borderRadius: isHover ? "40%" : "50%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="bg-indigo-500 dark:bg-indigo-400"
        />
      </motion.div>

      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width:  isHover ? 10 : isClick ? 6 : 8,
            height: isHover ? 10 : isClick ? 6 : 8,
            opacity: visible ? 1 : 0,
            backgroundColor: isHover ? "#6366f1" : "#1f2937",
          }}
          transition={{ type: "spring", stiffness: 800, damping: 35 }}
          className="rounded-full dark:[background-color:#f1f5f9]"
        />
      </motion.div>
    </>
  );
}

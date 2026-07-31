"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
}

/**
 * Lusion-style character-by-character text reveal.
 * Each character slides up from below with staggered timing.
 */
export default function SplitText({
  text,
  className = "",
  delay = 0,
  duration = 0.6,
  stagger = 0.025,
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  const chars = text.split("");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const child: Variants = {
    hidden: { y: "105%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration,
        ease: [0.21, 1.02, 0.73, 1],
      },
    },
  };

  return (
    <span ref={ref} className={className} aria-label={text}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="inline-flex flex-wrap"
        aria-hidden="true"
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            variants={child}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </span>
  );
}

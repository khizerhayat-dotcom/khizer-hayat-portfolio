import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** y-axis rather than fade-only; set 0 to just fade */
  y?: number;
}

/**
 * Shared scroll-reveal used across the sections below the hero: a quiet
 * fade + slight rise, triggered once when the element enters the viewport.
 * Framer's `MotionConfig reducedMotion="user"` (set in App.tsx) disables
 * the transform/opacity animation automatically for prefers-reduced-motion.
 */
export default function Reveal({ children, delay = 0, className = "", y = 24 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

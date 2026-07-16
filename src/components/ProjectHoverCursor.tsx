import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function ProjectHoverCursor({ children }: { children: ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [canUseCursor, setCanUseCursor] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 620, damping: 46, mass: 0.35 });
  const smoothY = useSpring(y, { stiffness: 620, damping: 46, mass: 0.35 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setCanUseCursor(media.matches && !prefersReducedMotion);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!canUseCursor) setIsActive(false);
  }, [canUseCursor]);

  return (
    <div
      onPointerEnter={(event) => {
        if (!canUseCursor || event.pointerType !== "mouse") return;
        x.set(event.clientX);
        y.set(event.clientY);
        setIsActive(true);
      }}
      onPointerMove={(event) => {
        if (!canUseCursor || event.pointerType !== "mouse") return;
        x.set(event.clientX);
        y.set(event.clientY);
      }}
      onPointerLeave={() => setIsActive(false)}
    >
      {children}
      {canUseCursor && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[110] flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/28 bg-flame text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_44px_rgba(244,98,10,0.34)] backdrop-blur-md dark:border-white/18 dark:bg-flame/88 dark:text-white dark:shadow-[0_18px_52px_rgba(0,0,0,0.42)]"
          style={{ x: smoothX, y: smoothY }}
          initial={false}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.82 }}
          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          Explore
        </motion.span>
      )}
    </div>
  );
}

import { useEffect, useRef } from "react";
import type React from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import baseImg from "../assets/base-image.webp";
import revealImg from "../assets/reveal-image.webp";

interface SpotlightRevealProps {
  /** Spotlight radius in CSS px, measured at the design's 1440px reference width. */
  radius?: number;
  /** object-position applied to both layers at lg+ (desktop reference framing). */
  objectPosition?: string;
  /** object-position below lg, so the subject stays framed on narrow screens. */
  mobileObjectPosition?: string;
  className?: string;
}

const LERP_FACTOR = 0.1;
const OPACITY_LERP_FACTOR = 0.14;

/**
 * Cursor-following spotlight reveal.
 *
 * `base-image` is always visible. `reveal-image` sits on top and is clipped with a
 * CSS mask so it only shows inside a soft circular spotlight around the pointer.
 *
 * The spotlight's gradient shape is rendered once into a hidden (never-appended)
 * <canvas> and exported to a data URL, which becomes `mask-image`. Only
 * `mask-position` is written on every animation frame (via a lerped pointer
 * position), rather than re-encoding the canvas every frame — the gradient
 * bitmap itself never changes, only where it sits, so this keeps the effect at
 * 60fps instead of paying PNG-encode cost 60 times a second. The canvas is
 * regenerated only if the radius or the display's pixel ratio changes.
 */
export default function SpotlightReveal({
  radius = 260,
  objectPosition = "75% 12%",
  mobileObjectPosition = "40% 0%",
  className = "",
}: SpotlightRevealProps) {
  const posVars = {
    "--op-mobile": mobileObjectPosition,
    "--op-desktop": objectPosition,
  } as React.CSSProperties;
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number | null>(null);

  // Raw target (tx, ty) and smoothed (x, y) pointer position, in CSS px
  // relative to the container. Kept in refs so pointer movement never
  // triggers a React re-render.
  const pointer = useRef({ x: -9999, y: -9999, tx: -9999, ty: -9999, opacity: 0, targetOpacity: 0 });

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const revealEl = revealRef.current;
    if (!container || !revealEl || prefersReducedMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const buildMask = () => {
      const diameter = radius * 2 * dpr;
      const canvas = document.createElement("canvas"); // never appended to the DOM
      canvas.width = diameter;
      canvas.height = diameter;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const cx = diameter / 2;
      const cy = diameter / 2;
      const r = diameter / 2;

      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.55, "rgba(255,255,255,1)");
      gradient.addColorStop(0.78, "rgba(255,255,255,0.45)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      const dataUrl = canvas.toDataURL("image/png");
      const maskValue = `url(${dataUrl})`;
      revealEl.style.maskImage = maskValue;
      revealEl.style.webkitMaskImage = maskValue;
      revealEl.style.maskRepeat = "no-repeat";
      revealEl.style.webkitMaskRepeat = "no-repeat";
      revealEl.style.maskSize = `${radius * 2}px ${radius * 2}px`;
      revealEl.style.webkitMaskSize = `${radius * 2}px ${radius * 2}px`;
    };

    buildMask();

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.current.tx = e.clientX - rect.left;
      pointer.current.ty = e.clientY - rect.top;
      pointer.current.targetOpacity = 1;
    };

    const handlePointerLeave = () => {
      pointer.current.targetOpacity = 0;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave);
    container.addEventListener("pointercancel", handlePointerLeave);
    window.addEventListener("pointerup", handlePointerLeave, { passive: true });

    const tick = () => {
      const p = pointer.current;
      p.x += (p.tx - p.x) * LERP_FACTOR;
      p.y += (p.ty - p.y) * LERP_FACTOR;
      p.opacity += (p.targetOpacity - p.opacity) * OPACITY_LERP_FACTOR;

      const maskPos = `${p.x - radius}px ${p.y - radius}px`;
      revealEl.style.maskPosition = maskPos;
      revealEl.style.webkitMaskPosition = maskPos;
      revealEl.style.opacity = p.opacity.toFixed(3);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("pointercancel", handlePointerLeave);
      window.removeEventListener("pointerup", handlePointerLeave);
    };
  }, [radius, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={baseImg}
        alt="Portrait of a senior UI/UX designer, studio lit against an orange-red gradient backdrop"
        className="absolute inset-0 h-full w-full object-cover [object-position:var(--op-mobile)] lg:[object-position:var(--op-desktop)]"
        style={posVars}
        draggable={false}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      {!prefersReducedMotion && (
        <img
          ref={revealRef}
          src={revealImg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 [object-position:var(--op-mobile)] lg:[object-position:var(--op-desktop)]"
          style={posVars}
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}

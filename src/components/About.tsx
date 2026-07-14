import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { LinkButton } from "./ui";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import aboutProfile from "../assets/about/about-profile.webp";

const STATS = [
  { value: "40+", label: "Products Shipped", accent: true },
  { value: "10M+", label: "App Downloads", accent: false },
  { value: "3+", label: "Years Experience", accent: false },
];

const BADGES = ["UI/UX Designer", "Lahore, Pakistan", "Mobile Apps", "Dashboards", "Web Apps", "Websites"];

interface AboutPortraitProps {
  enableCursorGlow?: boolean;
}

export function AboutPortrait({ enableCursorGlow = false }: AboutPortraitProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [canTilt, setCanTilt] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowOpacity = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 140, damping: 24, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 140, damping: 24, mass: 0.4 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const imageX = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(244, 98, 10, 0.18), rgba(255, 255, 255, 0.1) 18%, transparent 48%)`;

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setCanTilt(media.matches && !prefersReducedMotion);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [prefersReducedMotion]);

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
    glowOpacity.set(0);
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(20,10,0,0.12)] dark:border-white/10 dark:bg-coal dark:shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
      style={canTilt ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      onPointerMove={(event) => {
        if (!canTilt) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        pointerX.set(x - 0.5);
        pointerY.set(y - 0.5);
        if (enableCursorGlow) {
          glowX.set(x * 100);
          glowY.set(y * 100);
          glowOpacity.set(1);
        }
      }}
      onPointerLeave={resetTilt}
    >
      <motion.img
        src={aboutProfile}
        alt="Khizer Hayat"
        loading="lazy"
        decoding="async"
        className="aspect-[4/5] w-full scale-[1.04] object-cover"
        style={canTilt ? { x: imageX, y: imageY } : undefined}
      />
      {enableCursorGlow && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={canTilt ? { background: glowBackground, opacity: glowOpacity } : { opacity: 0 }}
        />
      )}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="scroll-mt-28 bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1200px] px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-12">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame">About</p>
              <h2 className="mt-3 max-w-[20ch] font-display text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.04] tracking-normal text-ink dark:text-white">
                Product UI/UX for teams that need clarity, polish, and handoff-ready files.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.7] text-ink/65 dark:text-white/60">
                I design mobile apps, dashboards, AI tools, healthcare products, and utility experiences with a practical focus on usable flows, polished UI, and clean developer handoff.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/62 shadow-[0_10px_28px_rgba(20,10,0,0.05)] dark:border-white/10 dark:bg-coal dark:text-white/60 dark:shadow-none"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <LinkButton href="/about" className="mt-7">
                Explore About
              </LinkButton>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <AboutPortrait />
          </Reveal>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 lg:gap-5">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div
                className={
                  stat.accent
                    ? "flex h-full flex-col justify-between rounded-[18px] bg-accent p-6"
                    : "flex h-full flex-col justify-between rounded-[18px] border border-black/10 bg-white p-6 shadow-[0_14px_40px_rgba(20,10,0,0.06)] dark:border-white/10 dark:bg-coal dark:shadow-none"
                }
              >
                <span
                  className={
                    "font-display text-[clamp(2.5rem,8vw,3.5rem)] font-bold tracking-normal " +
                    (stat.accent ? "text-white" : "text-ink dark:text-white")
                  }
                >
                  {stat.value}
                </span>
                <span
                  className={
                    "mt-4 text-xs font-medium uppercase tracking-[0.16em] " +
                    (stat.accent ? "text-white/80" : "text-ink/50 dark:text-white/50")
                  }
                >
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

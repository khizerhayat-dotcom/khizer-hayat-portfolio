import { useEffect, useState } from "react";
import { useRef } from "react";
import type { PointerEvent } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import MixedText from "../components/MixedText";
import Reveal from "../components/Reveal";
import { AboutPortrait } from "../components/About";
import behanceIcon from "../assets/icons/behance.svg";
import downloadIcon from "../assets/icons/download.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import aboutImage2 from "../assets/about/about-image-2.webp";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const STATS: AboutStat[] = [
  { value: "40+", label: "Products Shipped", countTo: 40, suffix: "+" },
  { value: "10M+", label: "App Downloads", countTo: 10, suffix: "M+" },
  { value: "Lahore", label: "Pakistan" },
  { value: "UI/UX", label: "Designer" },
];

const SERVICES = [
  {
    number: "01",
    title: "Mobile App UI/UX",
    description: "Clean, modern app screens with strong hierarchy, usability, and conversion-focused flows.",
    detail: "From first flow to polished screens.",
  },
  {
    number: "02",
    title: "Product Redesign",
    description: "Improving existing apps with better structure, visual polish, onboarding, and user journeys.",
    detail: "Sharper structure without losing what works.",
  },
  {
    number: "03",
    title: "Design Systems",
    description: "Reusable components, typography, colors, spacing, and scalable UI foundations.",
    detail: "Consistent UI patterns teams can reuse.",
  },
  {
    number: "04",
    title: "Prototypes & Handoff",
    description: "Clickable prototypes, organized Figma files, specs, assets, and developer-ready handoff.",
    detail: "Clear files that reduce build questions.",
  },
];

const TOOL_GROUPS = [
  {
    title: "Design",
    items: ["Figma", "Mobile UI", "Wireframing", "Visual Design"],
    description: "Clean app screens, user flows, visual hierarchy, and polished product interfaces.",
  },
  {
    title: "Prototyping",
    items: ["FigJam", "User Flows", "Clickable Prototype", "Interaction Notes"],
    description: "Clickable flows, interaction notes, and realistic product journeys before build.",
  },
  {
    title: "Systems",
    items: ["Components", "Typography", "UI Patterns", "Design Systems"],
    description: "Reusable components, typography, spacing, UI patterns, and scalable foundations.",
  },
  {
    title: "Handoff",
    items: ["Specs", "Assets", "Design QA", "Developer Handoff"],
    description: "Organized specs, assets, states, and developer-ready implementation notes.",
  },
];

const TOOL_CARD_STYLES = [
  {
    accent: "from-flame/[0.14] to-transparent",
    dot: "bg-flame",
  },
  {
    accent: "from-[#d8480f]/[0.1] to-transparent",
    dot: "bg-[#d8480f]",
  },
  {
    accent: "from-flame/[0.12] to-transparent",
    dot: "bg-flame",
  },
  {
    accent: "from-[#b93612]/[0.11] to-transparent",
    dot: "bg-[#b93612]",
  },
];

const EXPERIENCE_TAGS = [
  "Mobile UI",
  "Design Systems",
  "Prototypes",
  "Handoff",
  "App Redesign",
  "Product Thinking",
  "User Flows",
  "Design QA",
  "Figma Systems",
  "Build Notes",
];

const EXPERIENCE_TAG_POSITIONS = [
  { x: 0.08, y: -0.38, rotate: -2 },
  { x: 0.34, y: -0.58, rotate: 1 },
  { x: 0.62, y: -0.44, rotate: -1 },
  { x: 0.2, y: -0.84, rotate: 2 },
  { x: 0.48, y: -0.92, rotate: -2 },
  { x: 0.7, y: -0.74, rotate: 1 },
  { x: 0.05, y: -1.08, rotate: 1 },
  { x: 0.42, y: -1.22, rotate: -1 },
  { x: 0.6, y: -1.12, rotate: 2 },
  { x: 0.26, y: -1.38, rotate: -2 },
];

const EXPERIENCE_PILL_CLASS =
  "relative z-10 inline-flex select-none rounded-full border border-white/30 bg-white/[0.14] px-3.5 py-2 text-xs font-semibold text-white/94 shadow-[0_12px_34px_rgba(72,17,0,0.14),inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-md transition-[border-color,background-color,box-shadow,color] duration-200 hover:border-white/46 hover:bg-white/[0.19] hover:text-white hover:shadow-[0_16px_42px_rgba(72,17,0,0.18),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.32)] dark:border-flame/34 dark:bg-white/[0.075] dark:text-white/90 dark:hover:border-flame/55 dark:hover:bg-flame/[0.14] dark:hover:text-white sm:px-4 sm:text-sm";

interface PhysicsPillBody {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  visualWidth: number;
  visualHeight: number;
  padX: number;
  padY: number;
  rotate: number;
  dragging: boolean;
}

function PhysicsExperiencePills({ enabled }: { enabled: boolean }) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bodiesRef = useRef<PhysicsPillBody[]>([]);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef<{
    index: number;
    pointerId: number;
    offsetX: number;
    offsetY: number;
    lastX: number;
    lastY: number;
    lastTime: number;
  } | null>(null);
  const isInView = useInView(fieldRef, { amount: 0.25 });

  useEffect(() => {
    if (!enabled || !isInView) return;

    const field = fieldRef.current;
    if (!field) return;

    const createBodies = () => {
      const bounds = field.getBoundingClientRect();
      const edgePadding = 8;
      bodiesRef.current = EXPERIENCE_TAGS.map((_, index) => {
        const element = pillRefs.current[index];
        const rect = element?.getBoundingClientRect();
        const visualWidth = rect?.width ?? 112;
        const visualHeight = rect?.height ?? 38;
        const padX = 9;
        const padY = 7;
        const width = visualWidth + padX * 2;
        const height = visualHeight + padY * 2;
        const position = EXPERIENCE_TAG_POSITIONS[index] ?? { x: 0.2, y: -0.6, rotate: 0 };
        const jitterX = (Math.random() - 0.5) * Math.min(bounds.width * 0.14, 88);
        const jitterY = Math.random() * -64;
        const maxX = Math.max(bounds.width - width - edgePadding, edgePadding);

        return {
          x: Math.min(Math.max(position.x * bounds.width + jitterX, edgePadding), maxX),
          y: position.y * bounds.height + jitterY,
          vx: ((Math.random() - 0.5) * 1.6) + (index % 2 === 0 ? 0.28 : -0.28),
          vy: Math.random() * 0.6,
          width,
          height,
          visualWidth,
          visualHeight,
          padX,
          padY,
          rotate: position.rotate,
          dragging: false,
        };
      });
    };

    createBodies();
    const resizeObserver = new ResizeObserver(createBodies);
    resizeObserver.observe(field);

    let lastTime = performance.now();
    const gravity = 0.24;
    const restitution = 0.2;
    const friction = 0.986;
    const floorFriction = 0.78;
    const edgePadding = 8;

    const applyTransforms = () => {
      bodiesRef.current.forEach((body, index) => {
        const element = pillRefs.current[index];
        if (!element) return;
        element.style.transform = `translate3d(${body.x + body.padX}px, ${body.y + body.padY}px, 0) rotate(${body.rotate}deg)`;
      });
    };

    const resolveBodyCollisions = () => {
      const bodies = bodiesRef.current;

      for (let pass = 0; pass < 4; pass += 1) {
        for (let i = 0; i < bodies.length; i += 1) {
          for (let j = i + 1; j < bodies.length; j += 1) {
            const a = bodies[i];
            const b = bodies[j];
            const dx = a.x + a.width / 2 - (b.x + b.width / 2);
            const dy = a.y + a.height / 2 - (b.y + b.height / 2);
            const overlapX = (a.width + b.width) / 2 - Math.abs(dx);
            const overlapY = (a.height + b.height) / 2 - Math.abs(dy);

            if (overlapX <= 0 || overlapY <= 0) continue;

            if (overlapX < overlapY) {
              const direction = dx < 0 ? -1 : 1;
              const correction = overlapX / (a.dragging || b.dragging ? 1.25 : 2);
              if (!a.dragging) a.x += direction * correction;
              if (!b.dragging) b.x -= direction * correction;

              const avx = a.vx;
              if (!a.dragging) a.vx = b.vx * restitution;
              if (!b.dragging) b.vx = avx * restitution;
            } else {
              const direction = dy < 0 ? -1 : 1;
              const correction = overlapY / (a.dragging || b.dragging ? 1.25 : 2);
              if (!a.dragging) a.y += direction * correction;
              if (!b.dragging) b.y -= direction * correction;

              const avy = a.vy;
              if (!a.dragging) a.vy = b.vy * restitution;
              if (!b.dragging) b.vy = avy * restitution;
            }
          }
        }
      }
    };

    const tick = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.67, 2);
      lastTime = time;
      const bounds = field.getBoundingClientRect();

      bodiesRef.current.forEach((body) => {
        if (!body.dragging) {
          body.vy += gravity * delta;
          body.x += body.vx * delta;
          body.y += body.vy * delta;
          body.vx *= friction;
          body.vy *= friction;
        }

        if (body.x < edgePadding) {
          body.x = edgePadding;
          body.vx = Math.abs(body.vx) * restitution;
        }

        if (body.x + body.width > bounds.width - edgePadding) {
          body.x = bounds.width - body.width - edgePadding;
          body.vx = -Math.abs(body.vx) * restitution;
        }

        if (body.y < edgePadding) {
          body.y = edgePadding;
          body.vy = Math.abs(body.vy) * restitution;
        }

        if (body.y + body.height > bounds.height - edgePadding) {
          body.y = bounds.height - body.height - edgePadding;
          body.vy = -Math.abs(body.vy) * restitution;
          body.vx *= floorFriction;
          if (Math.abs(body.vy) < 0.16) body.vy = 0;
          if (Math.abs(body.vx) < 0.055) body.vx = 0;
        }
      });

      resolveBodyCollisions();
      applyTransforms();
      frameRef.current = window.requestAnimationFrame(tick);
    };

    applyTransforms();
    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      resizeObserver.disconnect();
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      pointerRef.current = null;
    };
  }, [enabled, isInView]);

  const handlePointerDown = (event: PointerEvent<HTMLSpanElement>, index: number) => {
    if (!enabled) return;
    const field = fieldRef.current;
    const body = bodiesRef.current[index];
    if (!field || !body) return;

    const bounds = field.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left;
    const pointerY = event.clientY - bounds.top;

    body.dragging = true;
    body.vx = 0;
    body.vy = 0;
    pointerRef.current = {
      index,
      pointerId: event.pointerId,
      offsetX: pointerX - (body.x + body.padX),
      offsetY: pointerY - (body.y + body.padY),
      lastX: pointerX,
      lastY: pointerY,
      lastTime: performance.now(),
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (!enabled) return;
    const pointer = pointerRef.current;
    const field = fieldRef.current;
    if (!pointer || pointer.pointerId !== event.pointerId || !field) return;

    const body = bodiesRef.current[pointer.index];
    if (!body) return;

    const bounds = field.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left;
    const pointerY = event.clientY - bounds.top;
    const now = performance.now();
    const dt = Math.max(now - pointer.lastTime, 16);

    const edgePadding = 8;
    body.x = Math.min(Math.max(pointerX - pointer.offsetX - body.padX, edgePadding), Math.max(bounds.width - body.width - edgePadding, edgePadding));
    body.y = Math.min(Math.max(pointerY - pointer.offsetY - body.padY, edgePadding), Math.max(bounds.height - body.height - edgePadding, edgePadding));
    body.vx = ((pointerX - pointer.lastX) / dt) * 16.67;
    body.vy = ((pointerY - pointer.lastY) / dt) * 16.67;

    pointer.lastX = pointerX;
    pointer.lastY = pointerY;
    pointer.lastTime = now;
  };

  const handlePointerUp = (event: PointerEvent<HTMLSpanElement>) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.pointerId !== event.pointerId) return;

    const body = bodiesRef.current[pointer.index];
    if (body) body.dragging = false;
    pointerRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div ref={fieldRef} className={enabled ? "relative h-[270px] overflow-hidden lg:-ml-6 xl:-ml-10" : "relative flex min-h-0 flex-wrap content-start gap-2.5 sm:gap-3"}>
      {EXPERIENCE_TAGS.map((tag, index) => (
        <span
          key={tag}
          ref={(element) => {
            pillRefs.current[index] = element;
          }}
          onPointerDown={(event) => handlePointerDown(event, index)}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`${EXPERIENCE_PILL_CLASS} ${enabled ? "absolute left-0 top-0 cursor-grab active:z-20 active:cursor-grabbing" : ""}`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

const CONTACT_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/khizerdesigner/", icon: linkedinIcon },
  { label: "Behance", href: "https://www.behance.net/khizerhayat8743", icon: behanceIcon },
  { label: "Download CV", href: "/khizer-hayat-cv.pdf", icon: downloadIcon, download: true },
];

const EMAIL = "khizer8743@gmail.com";

interface AboutStat {
  value: string;
  label: string;
  countTo?: number;
  suffix?: string;
}

function AnimatedStat({ stat, index }: { stat: AboutStat; index: number }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const [displayValue, setDisplayValue] = useState(() => (stat.countTo ? `0${stat.suffix ?? ""}` : stat.value));

  useEffect(() => {
    if (!isInView) return;
    if (!stat.countTo || prefersReducedMotion) {
      setDisplayValue(stat.value);
      return;
    }

    const countTo = stat.countTo;
    let frame = 0;
    let animationFrame = 0;
    const totalFrames = 44;

    const tick = () => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(`${Math.round(countTo * eased)}${stat.suffix ?? ""}`);
      if (progress < 1) animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [isInView, prefersReducedMotion, stat]);

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.55 }}
      transition={{ duration: 0.62, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="h-full border-t border-black/12 py-2.5 transition-colors duration-300 hover:border-flame/40 dark:border-white/14 dark:hover:border-flame/50 sm:py-3"
    >
      <p className="font-display text-[clamp(1.25rem,5vw,1.65rem)] font-bold leading-none tracking-normal text-ink dark:text-white">
        {displayValue}
      </p>
      <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/50 dark:text-white/50 sm:text-[11px]">
        {stat.label}
      </p>
    </motion.div>
  );
}

function WorkTogetherPortrait() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [canTilt, setCanTilt] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 140, damping: 24, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 140, damping: 24, mass: 0.4 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2.5, -2.5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-3, 3]);
  const imageX = useTransform(smoothX, [-0.5, 0.5], [-3, 3]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], [-3, 3]);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setCanTilt(media.matches && !prefersReducedMotion);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [prefersReducedMotion]);

  return (
    <motion.div
      className="relative z-10 h-20 w-20 overflow-hidden rounded-full border-[5px] border-white/85 bg-white shadow-[0_16px_44px_rgba(72,17,0,0.2)] ring-1 ring-white/30 dark:border-white/75 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36 xl:h-40 xl:w-40"
      style={canTilt ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      onPointerMove={(event) => {
        if (!canTilt) return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <motion.img
        src={aboutImage2}
        alt="Khizer Hayat"
        loading="lazy"
        decoding="async"
        className="h-full w-full scale-[1.08] object-cover"
        style={canTilt ? { x: imageX, y: imageY } : undefined}
      />
    </motion.div>
  );
}

function ToolCardVisual({
  title,
}: {
  title: string;
}) {
  const shellClass = "relative min-h-[168px] overflow-hidden rounded-[20px] border border-[#eaded2] bg-[#fbf7f1] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] dark:border-white/[0.09] dark:bg-white/[0.045]";

  if (title === "Design") {
    return (
      <div className={shellClass}>
        <div className="pointer-events-none absolute right-[-3rem] top-[-3rem] h-28 w-28 rounded-full bg-flame/[0.12] blur-3xl dark:bg-flame/[0.16]" />
        <div className="relative flex h-full gap-3">
          <div className="flex w-16 shrink-0 flex-col gap-2 rounded-[16px] border border-black/[0.07] bg-white/78 p-2 dark:border-white/10 dark:bg-white/[0.055]">
            {["bg-ink dark:bg-white", "bg-flame", "bg-[#e8ddd1] dark:bg-white/22"].map((color, index) => (
              <span key={index} className={`h-8 rounded-xl ${color}`} />
            ))}
          </div>
          <div className="min-w-0 flex-1 rounded-[18px] border border-black/[0.07] bg-white/78 p-3 dark:border-white/10 dark:bg-white/[0.055]">
            <div className="flex items-center justify-between">
              <span className="h-2 w-20 rounded-full bg-ink/22 dark:bg-white/24" />
              <span className="h-6 w-6 rounded-full bg-flame/16 ring-1 ring-flame/20" />
            </div>
            <div className="mt-4 grid grid-cols-[1.2fr_0.8fr] gap-2">
              <span className="h-16 rounded-2xl bg-ink/[0.055] dark:bg-white/[0.08]" />
              <span className="h-16 rounded-2xl bg-flame/[0.095] dark:bg-flame/[0.13]" />
            </div>
            <div className="mt-3 space-y-2">
              <span className="block h-2 w-full rounded-full bg-ink/12 dark:bg-white/14" />
              <span className="block h-2 w-2/3 rounded-full bg-ink/8 dark:bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (title === "Prototyping") {
    return (
      <div className={shellClass}>
        <div className="pointer-events-none absolute left-[-2rem] bottom-[-3rem] h-28 w-28 rounded-full bg-flame/[0.11] blur-3xl dark:bg-flame/[0.15]" />
        <div className="relative grid h-full grid-cols-[1fr_auto_1fr] items-center gap-3">
          {["Flow", "Tap", "QA"].map((step, stepIndex) => (
            <div key={step} className="contents">
              <div className="rounded-[17px] border border-black/[0.07] bg-white/78 p-3 shadow-[0_10px_24px_rgba(70,38,18,0.035)] dark:border-white/10 dark:bg-white/[0.055]">
                <span className="block h-2 w-10 rounded-full bg-flame/50" />
                <span className="mt-3 block h-10 rounded-xl bg-ink/[0.055] dark:bg-white/[0.08]" />
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/42 dark:text-white/45">{step}</p>
              </div>
              {stepIndex < 2 && (
                <div className="hidden h-px w-7 bg-gradient-to-r from-flame/40 to-transparent sm:block" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (title === "Systems") {
    return (
      <div className={shellClass}>
        <div className="pointer-events-none absolute right-[-2rem] bottom-[-3rem] h-28 w-28 rounded-full bg-flame/[0.1] blur-3xl dark:bg-flame/[0.14]" />
        <div className="relative grid h-full grid-cols-[0.95fr_1.05fr] gap-3">
          <div className="rounded-[18px] border border-black/[0.07] bg-white/78 p-3 dark:border-white/10 dark:bg-white/[0.055]">
            <div className="font-display text-3xl font-bold leading-none text-ink dark:text-white">Aa</div>
            <div className="mt-4 space-y-2">
              <span className="block h-2 w-16 rounded-full bg-ink/18 dark:bg-white/22" />
              <span className="block h-2 w-24 rounded-full bg-ink/10 dark:bg-white/13" />
              <span className="block h-2 w-12 rounded-full bg-flame/45" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {["bg-ink dark:bg-white", "bg-flame", "bg-[#e8ddd1] dark:bg-white/20", "bg-white ring-1 ring-black/10 dark:bg-white/[0.06] dark:ring-white/10"].map((color, index) => (
              <span key={index} className={`rounded-2xl ${color}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={shellClass}>
      <div className="pointer-events-none absolute left-[-2rem] top-[-3rem] h-28 w-28 rounded-full bg-flame/[0.11] blur-3xl dark:bg-flame/[0.15]" />
      <div className="relative grid h-full grid-cols-[1fr_0.9fr] gap-3">
        <div className="rounded-[18px] border border-black/[0.07] bg-white/78 p-3 dark:border-white/10 dark:bg-white/[0.055]">
          <div className="flex items-center justify-between border-b border-black/[0.07] pb-2 dark:border-white/10">
            <span className="h-2 w-14 rounded-full bg-ink/18 dark:bg-white/22" />
            <span className="h-5 w-5 rounded-full bg-flame/16 ring-1 ring-flame/24" />
          </div>
          {["States", "Specs", "Assets"].map((item) => (
            <div key={item} className="flex items-center gap-2 py-2 text-xs font-medium text-ink/58 dark:text-white/58">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-flame text-[9px] font-bold text-white">✓</span>
              {item}
            </div>
          ))}
        </div>
        <div className="grid content-between gap-2">
          {["Spec", "Asset", "QA"].map((item) => (
            <span key={item} className="rounded-2xl border border-black/[0.07] bg-white/78 px-3 py-3 text-center text-[11px] font-semibold text-ink/58 dark:border-white/10 dark:bg-white/[0.055] dark:text-white/58">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const [copied, setCopied] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [canRunExperiencePhysics, setCanRunExperiencePhysics] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setCanRunExperiencePhysics(media.matches && !prefersReducedMotion);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [prefersReducedMotion]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "/contact";
    }
  };

  return (
    <main className="min-h-screen bg-paper text-ink transition-colors duration-300 dark:bg-ink dark:text-white">
      <section className="bg-[#f3f1ed] px-5 pb-12 pt-[6.25rem] transition-colors duration-300 dark:bg-[#100b07] sm:px-8 sm:pb-14 sm:pt-[7rem] lg:px-14 lg:pb-16 lg:pt-[7.5rem] xl:px-16">
        <div className="mx-auto grid w-full max-w-[1240px] gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:items-center lg:gap-10 xl:gap-12">
          <div className="min-w-0">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-flame">About Khizer Hayat</p>
              <h1 className="mt-4 max-w-[19ch] font-display text-[clamp(1.75rem,4.15vw,3.2rem)] font-bold leading-[1.08] tracking-normal text-ink dark:text-white sm:mt-5">
                <MixedText
                  text="3+ years of experience crafting mobile products, digital interfaces, and scalable design systems."
                  accent="crafting"
                  accentClassName="text-flame/80 dark:text-flame/85"
                />
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-5 max-w-[50ch] cursor-default text-[15px] leading-[1.65] text-ink/62 dark:text-white/62 sm:text-base" contentEditable={false}>
                I design clean, usable, developer-ready product experiences across mobile app UI/UX, redesigns, systems, prototypes, and handoff.
              </p>
            </Reveal>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:mt-7">
              {STATS.map((stat, index) => (
                <AnimatedStat key={`${stat.value}-${stat.label}`} stat={stat} index={index} />
              ))}
            </div>
          </div>

          <Reveal delay={0.12}>
            <div className="mx-auto w-full max-w-[210px] sm:max-w-[260px] lg:mx-0 lg:ml-auto lg:max-w-[300px]">
              <AboutPortrait enableCursorGlow />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative mt-4 overflow-hidden bg-gradient-to-br from-[#f4620a] via-[#d8480f] to-[#9f2308] px-5 py-9 text-white shadow-[0_20px_70px_rgba(216,72,15,0.22)] transition-colors duration-300 dark:bg-gradient-to-br dark:from-[#240904] dark:via-[#4a1307] dark:to-[#090403] dark:shadow-[0_22px_70px_rgba(0,0,0,0.38)] sm:mt-6 sm:px-8 sm:py-10 lg:px-14 lg:py-12 xl:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.26),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(255,185,116,0.24),transparent_30%),radial-gradient(circle_at_50%_110%,rgba(80,10,0,0.28),transparent_42%)] dark:bg-[radial-gradient(circle_at_18%_10%,rgba(244,98,10,0.28),transparent_30%),radial-gradient(circle_at_86%_18%,rgba(255,100,38,0.18),transparent_30%),radial-gradient(circle_at_50%_110%,rgba(0,0,0,0.42),transparent_44%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.14] dark:opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <Reveal className="mx-auto max-w-[1240px]">
          <div className="relative">
            <div className="relative grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(460px,540px)] lg:items-center xl:grid-cols-[minmax(0,1fr)_minmax(560px,620px)]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Experience</p>
                <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(2rem,5.6vw,3.7rem)] font-bold leading-[1] tracking-normal sm:max-w-[16ch]">
                  <MixedText text="I design interfaces that look polished, feel simple, and are ready to ship." accent="design" accentClassName="text-white" />
                </h2>
              </div>

              <div className="relative lg:min-h-[250px]">
                <PhysicsExperiencePills enabled={canRunExperiencePhysics} />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-10 sm:px-8 sm:py-12 lg:px-14 lg:py-14 xl:px-16">
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame">Services</p>
            <h2 className="mt-3 max-w-[15ch] font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.02] text-ink dark:text-white">
              <MixedText text="I can help you with" accent="help" />
            </h2>
          </div>
          <p className="max-w-[42ch] text-sm leading-[1.65] text-ink/55 dark:text-white/55">
            Focused UI/UX support for mobile products, redesigns, systems, prototypes, and handoff.
          </p>
        </Reveal>

        <div className="mt-5 grid gap-2.5 sm:mt-6 lg:gap-3">
          {SERVICES.map((service, index) => {
            const isActive = activeService === service.title;

            return (
              <Reveal key={service.title} delay={index * 0.05}>
                <motion.article
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  onClick={() => setActiveService(isActive ? null : service.title)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveService(isActive ? null : service.title);
                    }
                  }}
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className={
                    "group grid cursor-pointer gap-3 rounded-[16px] border border-black/10 bg-white p-4 shadow-[0_10px_30px_rgba(20,10,0,0.045)] outline-none transition-colors duration-300 ease-premium hover:border-flame/30 hover:shadow-[0_16px_44px_rgba(20,10,0,0.07)] focus-visible:ring-4 focus-visible:ring-flame/15 dark:border-white/10 dark:bg-coal dark:shadow-none dark:hover:border-flame/40 sm:gap-4 sm:rounded-[18px] sm:p-5 md:grid-cols-[72px_minmax(0,0.72fr)_minmax(0,1fr)] md:items-center lg:grid-cols-[86px_minmax(0,0.78fr)_minmax(0,1fr)] lg:p-5 xl:grid-cols-[96px_minmax(0,0.8fr)_minmax(0,1fr)] xl:p-6 " +
                    (isActive ? "border-flame/45 dark:border-flame/50" : "")
                  }
                >
                  <p
                    className={
                      "font-display text-[clamp(2rem,8vw,3.3rem)] font-bold leading-none tracking-normal transition-colors duration-300 " +
                      (isActive ? "text-flame" : "text-flame/70 group-hover:text-flame")
                    }
                  >
                    {service.number}
                  </p>
                  <h3 className="font-display text-lg font-bold tracking-normal text-ink transition-colors duration-300 group-hover:text-flame dark:text-white sm:text-xl lg:text-2xl">
                    {service.title}
                  </h3>
                  <div>
                    <p className="text-sm leading-[1.6] text-ink/60 dark:text-white/60 sm:text-[15px]">{service.description}</p>
                    <div
                      className={
                        "grid transition-[grid-template-rows,opacity,margin] duration-300 ease-premium group-hover:mt-3 group-hover:grid-rows-[1fr] group-hover:opacity-100 " +
                        (isActive ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0")
                      }
                    >
                      <p className="overflow-hidden text-sm font-medium text-flame">{service.detail}</p>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-10 sm:px-8 sm:pb-12 lg:px-14 lg:pb-14 xl:px-16">
        <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame">Tools / Skills</p>
            <h2 className="mt-3 max-w-[16ch] font-display text-[clamp(1.9rem,5vw,3rem)] font-bold leading-[1.04] text-ink dark:text-white">
              <MixedText text="Built around product craft, systems, and handoff." accent="craft" />
            </h2>
          </div>
          <p className="max-w-[40ch] text-sm leading-[1.65] text-ink/58 dark:text-white/58">
            A compact set of design capabilities I use to move product work from early structure to build-ready files.
          </p>
        </Reveal>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:gap-5">
          {TOOL_GROUPS.map((group, index) => {
            const style = TOOL_CARD_STYLES[index];

            return (
              <Reveal key={group.title} delay={index * 0.05}>
                <motion.article
                  whileHover={prefersReducedMotion ? undefined : { y: -5 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-full overflow-hidden rounded-[26px] border border-[#e7dbcf] bg-[#fffdf9] p-4 shadow-[0_18px_54px_rgba(70,38,18,0.06)] transition-all duration-300 hover:border-flame/[0.26] hover:bg-white hover:shadow-[0_24px_72px_rgba(70,38,18,0.09)] dark:border-white/[0.09] dark:bg-[#11100f] dark:shadow-none dark:hover:border-flame/34 dark:hover:bg-[#15120f] sm:p-5"
                >
                  <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${style.accent}`} />
                  <div className="pointer-events-none absolute right-[-4rem] top-[-4rem] h-36 w-36 rounded-full bg-flame/[0.07] opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100 dark:bg-flame/[0.12]" />

                  <motion.div
                    className="relative"
                    whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ToolCardVisual title={group.title} />
                  </motion.div>

                  <div className="relative mt-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-flame/80">
                          {String(index + 1).padStart(2, "0")} / Capability
                        </p>
                        <h3 className="mt-2 font-display text-[1.45rem] font-bold leading-tight text-ink dark:text-white sm:text-[1.7rem]">
                          {group.title}
                        </h3>
                      </div>
                      <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${style.dot} shadow-[0_0_0_6px_rgba(244,98,10,0.1)]`} />
                    </div>
                    <p className="mt-3 max-w-[42ch] text-sm leading-[1.62] text-ink/58 dark:text-white/58">
                      {group.description}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-[12px] border border-[#e4d8cc] bg-[#fbf7f1] px-3 py-2.5 text-xs font-semibold text-ink/[0.64] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] transition-colors duration-200 group-hover:border-flame/[0.22] group-hover:bg-[#fff7ef] group-hover:text-ink/75 dark:border-white/[0.09] dark:bg-white/[0.045] dark:text-white/[0.72] dark:shadow-none dark:group-hover:border-flame/32 dark:group-hover:bg-flame/[0.09] dark:group-hover:text-white"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 pb-10 sm:px-8 sm:pb-12 lg:px-14 lg:pb-14 xl:px-16 xl:pb-16">
        <Reveal>
            <div className="relative overflow-hidden rounded-[24px] border border-white/20 bg-[linear-gradient(135deg,#ff8a22_0%,#f4620a_34%,#d94811_68%,#9f2308_100%)] px-5 py-6 text-white shadow-[0_22px_70px_rgba(216,72,15,0.24)] transition-colors duration-300 dark:border-flame/18 dark:bg-[linear-gradient(135deg,#2a0803_0%,#551606_42%,#8f2209_76%,#160604_100%)] dark:shadow-[0_24px_76px_rgba(0,0,0,0.4)] sm:px-7 sm:py-7 lg:px-10 lg:py-8 xl:px-12">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_8%,rgba(255,232,190,0.34),transparent_30%),radial-gradient(circle_at_78%_0%,rgba(255,170,74,0.24),transparent_28%),radial-gradient(circle_at_50%_115%,rgba(103,16,0,0.28),transparent_45%)] dark:bg-[radial-gradient(circle_at_24%_8%,rgba(255,124,42,0.2),transparent_32%),radial-gradient(circle_at_78%_0%,rgba(255,93,28,0.16),transparent_30%),radial-gradient(circle_at_50%_115%,rgba(0,0,0,0.42),transparent_48%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-flame/36" />
            <div className="relative mx-auto flex max-w-[1040px] flex-col items-center text-center">
              <h2 className="font-display text-[clamp(2.2rem,8vw,5rem)] font-bold leading-[0.9] tracking-normal">
                <MixedText text="Let's work" accent="work" accentClassName="text-white" />
              </h2>
              <div className="my-1 sm:-my-1 lg:-my-2 xl:-my-3">
                <WorkTogetherPortrait />
              </div>
              <h2 className="font-display text-[clamp(2.2rem,8vw,5rem)] font-bold leading-[0.9] tracking-normal">
                <MixedText text="together" accent="together" accentClassName="text-white" />
              </h2>
            </div>

            <div className="relative mx-auto mt-5 flex max-w-[1060px] flex-col gap-4 border-t border-white/16 pt-5 sm:mt-6 sm:items-center lg:mt-7 lg:flex-row lg:items-end lg:justify-between">
              <div className="text-center lg:text-left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">Drop me an email</p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                  <a
                    href="/contact"
                    className="font-display text-lg font-bold leading-tight text-white underline-offset-4 transition-colors duration-200 hover:text-white/82 hover:underline sm:text-xl"
                  >
                    {EMAIL}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-full border border-white/22 bg-white/12 px-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/18 active:translate-y-0 focus-visible:ring-4 focus-visible:ring-white/25 dark:border-flame/28 dark:bg-[#120806]/38 dark:hover:border-flame/50 dark:hover:bg-flame/[0.14]"
                    aria-label="Copy email address"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M8 8H6.5C5.67 8 5 8.67 5 9.5V19C5 19.83 5.67 20.5 6.5 20.5H16C16.83 20.5 17.5 19.83 17.5 19V17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M9.5 3.5H18C18.83 3.5 19.5 4.17 19.5 5V13.5C19.5 14.33 18.83 15 18 15H9.5C8.67 15 8 14.33 8 13.5V5C8 4.17 8.67 3.5 9.5 3.5Z" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 lg:justify-end">
                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    download={link.download ? true : undefined}
                    className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/22 bg-white/12 text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/18 active:translate-y-0 focus-visible:ring-4 focus-visible:ring-white/25 dark:border-flame/28 dark:bg-[#120806]/38 dark:hover:border-flame/50 dark:hover:bg-flame/[0.14] sm:h-10 sm:w-10"
                    aria-label={link.label}
                  >
                    <img src={link.icon} alt="" className="h-4 w-4 brightness-0 invert transition duration-200 group-hover:opacity-85" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  "UX Flow",
  "Mobile UI",
  "Design Systems",
  "Prototypes",
  "Handoff",
  "App Redesign",
  "Figma",
  "Usability",
  "Product Thinking",
];

const EXPERIENCE_TAG_POSITIONS = [
  "lg:left-[4%] lg:top-[8%] lg:-rotate-2",
  "lg:left-[39%] lg:top-[2%] lg:rotate-1",
  "lg:left-[12%] lg:top-[32%] lg:rotate-1",
  "lg:left-[55%] lg:top-[30%] lg:-rotate-1",
  "lg:left-[2%] lg:top-[58%] lg:rotate-1",
  "lg:left-[36%] lg:top-[60%] lg:-rotate-1",
  "lg:left-[68%] lg:top-[10%] lg:rotate-2",
  "lg:left-[17%] lg:top-[82%] lg:-rotate-1",
  "lg:left-[57%] lg:top-[82%] lg:rotate-1",
];

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
      className="h-full border-t border-black/15 py-3 transition-colors duration-300 hover:border-flame/45 dark:border-white/15 dark:hover:border-flame/55 sm:py-3.5 lg:py-4"
    >
      <p className="font-display text-[clamp(1.35rem,5.5vw,1.75rem)] font-bold leading-none tracking-normal text-ink dark:text-white">
        {displayValue}
      </p>
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-ink/50 dark:text-white/50 sm:text-xs">
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
  if (title === "Design") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="h-8 rounded-full bg-ink px-4 text-[11px] font-semibold leading-8 text-white dark:bg-white dark:text-ink">Primary</span>
          <span className="h-8 rounded-full border border-black/10 bg-white px-4 text-[11px] font-semibold leading-8 text-ink/70 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/72">Secondary</span>
        </div>
        <div className="grid grid-cols-[0.85fr_1.15fr] gap-3">
          <div className="rounded-2xl border border-black/[0.08] bg-white p-3 dark:border-white/10 dark:bg-white/[0.055]">
            <div className="h-2 w-12 rounded-full bg-flame/55" />
            <div className="mt-3 h-14 rounded-xl bg-ink/[0.055] dark:bg-white/[0.08]" />
          </div>
          <div className="rounded-2xl border border-black/[0.08] bg-white p-3 dark:border-white/10 dark:bg-white/[0.055]">
            <div className="space-y-2">
              <span className="block h-2 w-20 rounded-full bg-ink/18 dark:bg-white/24" />
              <span className="block h-2 w-28 rounded-full bg-ink/10 dark:bg-white/14" />
              <span className="block h-8 rounded-xl bg-flame/[0.09] dark:bg-flame/[0.12]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (title === "Prototyping") {
    return (
      <div className="space-y-3">
        {["Entry", "Interaction", "Review"].map((step, stepIndex) => (
          <div key={step} className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-flame/20 bg-flame/[0.08] text-[11px] font-bold text-flame">
              {stepIndex + 1}
            </span>
            <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
            <span className="min-w-[92px] rounded-xl border border-black/[0.08] bg-white px-3 py-2 text-xs font-semibold text-ink/65 dark:border-white/10 dark:bg-white/[0.055] dark:text-white/65">
              {step}
            </span>
          </div>
        ))}
        <div className="rounded-2xl border border-dashed border-flame/24 bg-flame/[0.055] px-3 py-2 text-xs font-medium text-ink/58 dark:bg-flame/[0.08] dark:text-white/58">
          Tap states, edge cases, and motion notes before build.
        </div>
      </div>
    );
  }

  if (title === "Systems") {
    return (
      <div className="grid grid-cols-[0.9fr_1.1fr] gap-3">
        <div className="space-y-2">
          {["8", "12", "16", "24"].map((space) => (
            <div key={space} className="flex items-center gap-2">
              <span className="w-5 text-[10px] font-semibold text-ink/45 dark:text-white/45">{space}</span>
              <span className="h-2 rounded-full bg-flame/45" style={{ width: `${Number(space) * 3}px` }} />
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-black/[0.08] bg-white p-3 dark:border-white/10 dark:bg-white/[0.055]">
          <div className="font-display text-2xl font-bold leading-none text-ink dark:text-white">Aa</div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            <span className="h-7 rounded-lg bg-ink dark:bg-white" />
            <span className="h-7 rounded-lg bg-flame" />
            <span className="h-7 rounded-lg border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.06]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-black/[0.08] bg-white p-3 dark:border-white/10 dark:bg-white/[0.055]">
        {["Export states", "Name assets", "QA spacing"].map((item) => (
          <div key={item} className="flex items-center gap-2 py-1.5 text-xs font-medium text-ink/62 dark:text-white/62">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-flame text-[9px] font-bold text-white">✓</span>
            {item}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["Spec", "Asset", "State"].map((item) => (
          <span key={item} className="rounded-xl border border-black/[0.08] bg-white px-2.5 py-2 text-center text-[11px] font-semibold text-ink/58 dark:border-white/10 dark:bg-white/[0.055] dark:text-white/58">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const [copied, setCopied] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [canDragTags, setCanDragTags] = useState(false);
  const tagFieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 900px)");
    const update = () => setCanDragTags(media.matches && !prefersReducedMotion);
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
      <section className="bg-[#f3f1ed] px-5 pb-7 pt-[6.25rem] transition-colors duration-300 dark:bg-[#100b07] sm:px-8 sm:pb-9 sm:pt-[7rem] lg:px-14 lg:pb-11 lg:pt-[7.5rem] xl:px-16">
        <div className="mx-auto grid w-full max-w-[1240px] gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-end lg:gap-10 xl:gap-14">
          <div className="min-w-0">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-flame">About Khizer Hayat</p>
              <h1 className="mt-4 max-w-[18ch] font-display text-[clamp(1.85rem,4.8vw,3.75rem)] font-bold leading-[1.05] tracking-normal text-ink dark:text-white sm:mt-5">
                3+ years of experience crafting mobile products, digital interfaces, and scalable design systems.
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.6] text-ink/62 dark:text-white/62 sm:text-base">
                I help teams design clean, usable, and developer-ready product experiences, from mobile app UI/UX and redesigns to prototypes, systems, and handoff.
              </p>
            </Reveal>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:mt-8">
              {STATS.map((stat, index) => (
                <AnimatedStat key={`${stat.value}-${stat.label}`} stat={stat} index={index} />
              ))}
            </div>
          </div>

          <Reveal delay={0.12}>
            <div className="mx-auto w-full max-w-[220px] sm:max-w-[280px] lg:mx-0 lg:ml-auto lg:max-w-[340px]">
              <AboutPortrait enableCursorGlow />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-accent px-5 py-9 text-white shadow-[0_18px_60px_rgba(216,72,15,0.18)] transition-colors duration-300 dark:bg-gradient-to-br dark:from-[#210905] dark:via-[#351006] dark:to-[#090403] dark:shadow-[0_18px_60px_rgba(0,0,0,0.32)] sm:px-8 sm:py-10 lg:px-14 lg:py-12 xl:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <Reveal className="mx-auto max-w-[1240px]">
          <div className="relative">
            <div className="relative grid gap-7 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center xl:grid-cols-[minmax(0,1fr)_440px]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Experience</p>
                <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(2.1rem,6.4vw,4.3rem)] font-bold leading-[1] tracking-normal sm:max-w-[16ch]">
                  I design interfaces that look polished, feel simple, and are ready to ship.
                </h2>
              </div>

              <div className="relative lg:min-h-[238px]">
                <div ref={tagFieldRef} className="relative flex min-h-0 flex-wrap content-start gap-2.5 sm:gap-3 lg:h-[238px] lg:block">
                  {EXPERIENCE_TAGS.map((tag, index) => (
                    <motion.span
                      key={tag}
                      drag={canDragTags}
                      dragConstraints={tagFieldRef}
                      dragElastic={0.22}
                      dragMomentum={false}
                      dragSnapToOrigin={canDragTags}
                      dragTransition={{ bounceStiffness: 260, bounceDamping: 15 }}
                      whileHover={canDragTags ? { y: -2, scale: 1.015 } : undefined}
                      whileDrag={canDragTags ? { scale: 1.025, cursor: "grabbing", zIndex: 20 } : undefined}
                      animate={
                        canDragTags
                          ? {
                              y: index % 2 === 0 ? [0, -5, 0] : [0, 4, 0],
                            }
                          : undefined
                      }
                      transition={{
                        y: { duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut" },
                        default: { type: "spring", stiffness: 280, damping: 18 },
                      }}
                      className={
                        "relative z-10 inline-flex select-none rounded-full border border-white/28 bg-white/12 px-3.5 py-2 text-xs font-semibold text-white/92 backdrop-blur-md transition-colors duration-200 hover:border-white/44 hover:bg-white/18 hover:text-white dark:border-flame/35 dark:bg-[#120806]/45 dark:text-white/88 dark:hover:border-flame/55 dark:hover:bg-flame/[0.14] sm:px-4 sm:text-sm lg:absolute " +
                        (EXPERIENCE_TAG_POSITIONS[index] ?? "") +
                        (canDragTags ? " cursor-grab active:cursor-grabbing" : "")
                      }
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-10 sm:px-8 sm:py-12 lg:px-14 lg:py-14 xl:px-16">
        <Reveal className="flex flex-col justify-between gap-4 border-b border-black/10 pb-5 dark:border-white/10 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame">Services</p>
            <h2 className="mt-3 max-w-[15ch] font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.02] text-ink dark:text-white">
              I can help you with
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
              Built around product craft, systems, and handoff.
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
                  whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-full overflow-hidden rounded-[22px] border border-black/[0.08] bg-white p-4 shadow-[0_16px_42px_rgba(20,10,0,0.055)] transition-colors duration-300 hover:border-flame/[0.28] hover:shadow-[0_20px_54px_rgba(20,10,0,0.075)] dark:border-white/10 dark:bg-[#11100f] dark:shadow-none dark:hover:border-flame/35 sm:p-5"
                >
                  <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${style.accent}`} />

                  <motion.div
                    className="relative overflow-hidden rounded-[18px] border border-black/[0.08] bg-[#f7f5f1] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] transition-colors duration-300 dark:border-white/10 dark:bg-white/[0.045] sm:p-5"
                    whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ToolCardVisual title={group.title} />
                  </motion.div>

                  <div className="relative mt-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-flame">
                          {String(index + 1).padStart(2, "0")} / Capability
                        </p>
                        <h3 className="mt-2 font-display text-xl font-bold leading-tight text-ink dark:text-white sm:text-2xl">
                          {group.title}
                        </h3>
                      </div>
                      <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${style.dot} shadow-[0_0_0_6px_rgba(244,98,10,0.1)]`} />
                    </div>
                    <p className="mt-3 max-w-[42ch] text-sm leading-[1.58] text-ink/60 dark:text-white/60">
                      {group.description}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-[10px] border border-black/[0.08] bg-[#faf8f4] px-3 py-2 text-xs font-semibold text-ink/[0.66] transition-colors duration-200 group-hover:border-flame/[0.24] group-hover:bg-flame/[0.045] dark:border-white/10 dark:bg-white/[0.045] dark:text-white/[0.76] dark:group-hover:border-flame/35 dark:group-hover:bg-flame/[0.1] dark:group-hover:text-white"
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
          <div className="overflow-hidden rounded-[22px] bg-gradient-to-br from-accent via-flame to-[#8f1b08] px-5 py-6 text-white shadow-[0_20px_62px_rgba(216,72,15,0.22)] transition-colors duration-300 dark:border dark:border-flame/18 dark:from-[#240a04] dark:via-[#3a1207] dark:to-[#090403] dark:shadow-[0_24px_70px_rgba(0,0,0,0.36)] sm:rounded-[28px] sm:px-7 sm:py-8 lg:px-10 lg:py-10 xl:px-12 xl:py-12">
            <div className="mx-auto flex max-w-[1040px] flex-col items-center text-center">
              <h2 className="font-display text-[clamp(2.35rem,10vw,6.75rem)] font-bold leading-[0.9] tracking-normal">
                Let&apos;s work
              </h2>
              <div className="my-1 sm:-my-1 lg:-my-2 xl:-my-3">
                <WorkTogetherPortrait />
              </div>
              <h2 className="font-display text-[clamp(2.35rem,10vw,6.75rem)] font-bold leading-[0.9] tracking-normal">
                together
              </h2>
            </div>

            <div className="mx-auto mt-5 flex max-w-[1060px] flex-col gap-4 border-t border-white/20 pt-5 sm:mt-6 sm:items-center lg:mt-7 lg:flex-row lg:items-end lg:justify-between">
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

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

const CHIPS = [
  "Figma",
  "FigJam",
  "Prototyping",
  "Wireframing",
  "Design Systems",
  "Mobile UI",
  "App Redesign",
  "Developer Handoff",
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
  "lg:left-[3%] lg:top-[6%] lg:-rotate-3",
  "lg:left-[43%] lg:top-[3%] lg:rotate-2",
  "lg:left-[18%] lg:top-[28%] lg:rotate-1",
  "lg:left-[62%] lg:top-[28%] lg:-rotate-2",
  "lg:left-[7%] lg:top-[53%] lg:rotate-2",
  "lg:left-[42%] lg:top-[56%] lg:-rotate-1",
  "lg:left-[70%] lg:top-[8%] lg:rotate-3",
  "lg:left-[24%] lg:top-[76%] lg:-rotate-2",
  "lg:left-[56%] lg:top-[78%] lg:rotate-1",
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
      className="h-full border-t border-black/15 py-3.5 transition-colors duration-300 hover:border-flame/45 dark:border-white/15 dark:hover:border-flame/55 sm:py-4 lg:py-5"
    >
      <p className="font-display text-[clamp(1.45rem,6vw,1.875rem)] font-bold leading-none tracking-normal text-ink dark:text-white">
        {displayValue}
      </p>
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/50 dark:text-white/50 sm:mt-3 sm:text-xs">
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
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const imageX = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setCanTilt(media.matches && !prefersReducedMotion);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [prefersReducedMotion]);

  return (
    <motion.div
      className="relative z-10 h-20 w-20 overflow-hidden rounded-full border-[5px] border-white/85 bg-white shadow-[0_18px_52px_rgba(72,17,0,0.22)] ring-1 ring-white/30 dark:border-white/75 sm:h-28 sm:w-28 md:h-36 md:w-36 lg:h-40 lg:w-40 xl:h-44 xl:w-44"
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
      <section className="bg-[#f3f1ed] px-5 pb-10 pt-28 transition-colors duration-300 dark:bg-[#100b07] sm:px-8 sm:pb-12 sm:pt-32 lg:min-h-[calc(100dvh-18px)] lg:px-14 lg:pb-14 lg:pt-36 xl:px-16 xl:pb-20">
        <div className="flex min-h-full w-full flex-col justify-between gap-8 lg:gap-10 xl:gap-12">
          <div className="grid gap-7 lg:grid-cols-12 lg:items-start lg:gap-8 xl:gap-10">
            <Reveal className="lg:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-flame">About Khizer Hayat</p>
              <h1 className="mt-4 max-w-[13ch] font-display text-[clamp(2.05rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-normal text-ink dark:text-white sm:mt-5 lg:max-w-[15ch]">
                3+ years of experience crafting mobile products, digital interfaces, and scalable design systems.
              </h1>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-4 lg:pt-8 xl:pt-11">
              <div className="grid max-w-[520px] grid-cols-[minmax(0,1fr)_minmax(120px,180px)] items-start gap-4 lg:ml-auto lg:block lg:max-w-[420px]">
                <p className="text-sm leading-relaxed text-ink/62 dark:text-white/62 sm:text-base lg:text-lg">
                  I help teams design clean, usable, and developer-ready product experiences, from mobile app UI/UX and redesigns to prototypes, systems, and handoff.
                </p>
                <div className="w-full max-w-[180px] sm:max-w-[220px] lg:ml-auto lg:mt-8 lg:max-w-[300px] xl:mt-10 xl:max-w-[320px] 2xl:max-w-[380px]">
                  <AboutPortrait enableCursorGlow />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:ml-auto lg:w-[calc(100%-420px)] xl:w-[calc(100%-520px)]">
            {STATS.map((stat, index) => (
              <AnimatedStat key={`${stat.value}-${stat.label}`} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-10 sm:px-8 sm:py-12 lg:px-14 lg:py-16 xl:px-16 xl:py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[22px] bg-accent px-6 py-8 text-white shadow-[0_24px_70px_rgba(216,72,15,0.24)] sm:rounded-[28px] sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-12 xl:py-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-0 h-40 w-72 bg-gradient-to-tl from-[#8f1b08]/45 via-white/5 to-transparent"
            />

            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end xl:grid-cols-[minmax(0,1fr)_420px]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Experience</p>
                <h2 className="mt-4 max-w-[17ch] font-display text-[clamp(2rem,7vw,4.5rem)] font-bold leading-[0.98] tracking-normal sm:max-w-[15ch]">
                  I design interfaces that look polished, feel simple, and are ready to ship.
                </h2>
              </div>

              <div className="relative lg:min-h-[260px]">
                <div ref={tagFieldRef} className="relative flex min-h-[150px] flex-wrap content-start gap-2.5 sm:min-h-[160px] sm:gap-3 lg:h-[260px] lg:min-h-0 lg:block">
                  {EXPERIENCE_TAGS.map((tag, index) => (
                    <motion.span
                      key={tag}
                      drag={canDragTags}
                      dragConstraints={tagFieldRef}
                      dragElastic={0.22}
                      dragMomentum={false}
                      dragSnapToOrigin={canDragTags}
                      dragTransition={{ bounceStiffness: 260, bounceDamping: 15 }}
                      whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.025 }}
                      whileDrag={canDragTags ? { scale: 1.04, cursor: "grabbing", zIndex: 20 } : undefined}
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
                        "relative z-10 inline-flex select-none rounded-full border border-white/24 bg-white/14 px-3.5 py-2 text-xs font-semibold text-white shadow-[0_10px_30px_rgba(72,17,0,0.18)] backdrop-blur-md transition-colors duration-200 hover:border-white/48 hover:bg-white/20 hover:shadow-[0_14px_36px_rgba(72,17,0,0.25)] sm:px-4 sm:text-sm lg:absolute " +
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

      <section className="mx-auto max-w-[1240px] px-5 pb-10 sm:px-8 sm:pb-12 lg:px-14 lg:pb-16 xl:px-16 xl:pb-20">
        <Reveal className="flex flex-col justify-between gap-4 border-b border-black/10 pb-6 dark:border-white/10 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame">Services</p>
            <h2 className="mt-3 max-w-[12ch] font-display text-[clamp(2.35rem,8vw,3.75rem)] font-bold leading-none text-ink dark:text-white">
              I can help you with
            </h2>
          </div>
          <p className="max-w-[38ch] text-sm leading-relaxed text-ink/55 dark:text-white/55">
            Focused UI/UX support for mobile products, redesigns, systems, prototypes, and handoff.
          </p>
        </Reveal>

        <div className="mt-5 grid gap-3 sm:mt-6 lg:gap-4">
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
                    "group grid cursor-pointer gap-3 rounded-[18px] border border-black/10 bg-white p-4 shadow-[0_12px_36px_rgba(20,10,0,0.055)] outline-none transition-colors duration-300 ease-premium hover:border-flame/35 hover:shadow-[0_18px_54px_rgba(20,10,0,0.08)] focus-visible:ring-4 focus-visible:ring-flame/15 dark:border-white/10 dark:bg-coal dark:shadow-none dark:hover:border-flame/40 sm:gap-4 sm:rounded-[22px] sm:p-5 md:grid-cols-[86px_minmax(0,0.75fr)_minmax(0,1fr)] md:items-center lg:grid-cols-[104px_minmax(0,0.82fr)_minmax(0,1fr)] lg:p-6 xl:grid-cols-[120px_minmax(0,0.85fr)_minmax(0,1fr)] xl:p-8 " +
                    (isActive ? "border-flame/45 dark:border-flame/50" : "")
                  }
                >
                  <p
                    className={
                      "font-display text-[clamp(2.35rem,12vw,4.5rem)] font-bold leading-none tracking-normal transition-colors duration-300 " +
                      (isActive ? "text-flame" : "text-flame/70 group-hover:text-flame")
                    }
                  >
                    {service.number}
                  </p>
                  <h3 className="font-display text-xl font-bold tracking-normal text-ink transition-colors duration-300 group-hover:text-flame dark:text-white sm:text-2xl lg:text-3xl">
                    {service.title}
                  </h3>
                  <div>
                    <p className="text-sm leading-relaxed text-ink/60 dark:text-white/60 sm:text-[15px]">{service.description}</p>
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

      <section className="mx-auto max-w-[1240px] px-5 pb-10 sm:px-8 sm:pb-12 lg:px-14 lg:pb-16 xl:px-16 xl:pb-20">
        <Reveal>
          <div className="grid gap-5 rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_16px_50px_rgba(20,10,0,0.07)] dark:border-white/10 dark:bg-coal dark:shadow-none sm:p-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-8 lg:p-8 xl:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame">Tools / Skills</p>
              <h2 className="mt-3 font-display text-[clamp(1.8rem,7vw,2.5rem)] font-bold leading-none text-ink dark:text-white">Built around Figma and handoff.</h2>
            </div>
            <div className="flex flex-wrap content-start gap-2.5 sm:gap-3">
              {CHIPS.map((chip) => (
                <motion.span
                  key={chip}
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-full border border-black/10 bg-paper px-3 py-1.5 text-xs font-medium text-ink/65 shadow-none transition-colors duration-300 hover:border-flame/45 hover:bg-white hover:text-ink hover:shadow-[0_10px_30px_rgba(244,98,10,0.14)] dark:border-white/10 dark:bg-ink dark:text-white/65 dark:hover:border-flame/45 dark:hover:bg-white/[0.06] dark:hover:text-white dark:hover:shadow-[0_10px_30px_rgba(244,98,10,0.18)] sm:px-4 sm:py-2 sm:text-sm"
                >
                  {chip}
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 pb-12 sm:px-8 sm:pb-14 lg:px-14 lg:pb-16 xl:px-16 xl:pb-20">
        <Reveal>
          <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-accent via-flame to-[#8f1b08] px-5 py-7 text-white shadow-[0_22px_70px_rgba(216,72,15,0.22)] sm:rounded-[30px] sm:px-7 sm:py-9 lg:px-10 lg:py-12 xl:px-12 xl:py-14">
            <div className="mx-auto flex max-w-[1040px] flex-col items-center text-center">
              <h2 className="font-display text-[clamp(2.45rem,11vw,7.75rem)] font-bold leading-[0.9] tracking-normal">
                Let&apos;s work
              </h2>
              <div className="my-1 sm:-my-1 lg:-my-3 xl:-my-4">
                <WorkTogetherPortrait />
              </div>
              <h2 className="font-display text-[clamp(2.45rem,11vw,7.75rem)] font-bold leading-[0.9] tracking-normal">
                together
              </h2>
            </div>

            <div className="mx-auto mt-5 flex max-w-[1060px] flex-col gap-5 border-t border-white/20 pt-5 sm:mt-6 sm:items-center lg:mt-8 lg:flex-row lg:items-end lg:justify-between xl:mt-9">
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
                    className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-full border border-white/22 bg-white/12 px-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/18 active:translate-y-0"
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

              <div className="flex items-center justify-center gap-2.5 lg:justify-end">
                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    download={link.download ? true : undefined}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/22 bg-white/12 text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/18 active:translate-y-0"
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

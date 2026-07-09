import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "../components/Reveal";
import { AboutPortrait } from "../components/About";
import behanceIcon from "../assets/icons/behance.svg";
import downloadIcon from "../assets/icons/download.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import aboutImage2 from "../assets/about/about-image-2.webp";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const STATS = [
  { value: "40+", label: "Products Shipped" },
  { value: "10M+", label: "App Downloads" },
  { value: "Lahore", label: "Pakistan" },
  { value: "UI/UX", label: "Designer" },
];

const SERVICES = [
  {
    number: "01",
    title: "Mobile App UI/UX",
    description: "Clean, modern app screens with strong hierarchy, usability, and conversion-focused flows.",
  },
  {
    number: "02",
    title: "Product Redesign",
    description: "Improving existing apps with better structure, visual polish, onboarding, and user journeys.",
  },
  {
    number: "03",
    title: "Design Systems",
    description: "Reusable components, typography, colors, spacing, and scalable UI foundations.",
  },
  {
    number: "04",
    title: "Prototypes & Handoff",
    description: "Clickable prototypes, organized Figma files, specs, assets, and developer-ready handoff.",
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

const CONTACT_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/khizerdesigner/", icon: linkedinIcon },
  { label: "Behance", href: "https://www.behance.net/khizerhayat8743", icon: behanceIcon },
  { label: "Download CV", href: "/khizer-hayat-cv.pdf", icon: downloadIcon, download: true },
];

const EMAIL = "khizer8743@gmail.com";

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
      className="relative z-10 h-32 w-32 overflow-hidden rounded-full border-[6px] border-white/85 bg-white shadow-[0_26px_80px_rgba(72,17,0,0.26)] ring-1 ring-white/30 dark:border-white/75 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-52 lg:w-52"
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
      <section className="bg-[#f3f1ed] px-6 pb-16 pt-36 transition-colors duration-300 dark:bg-[#100b07] sm:px-10 sm:pt-40 lg:min-h-[calc(100dvh-24px)] lg:px-16 lg:pb-20 lg:pt-44">
        <div className="flex min-h-full w-full flex-col justify-between gap-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <Reveal className="lg:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-flame">About Khizer Hayat</p>
              <h1 className="mt-6 font-display text-[42px] font-bold leading-[1.02] tracking-normal text-ink dark:text-white sm:text-6xl lg:text-[72px] xl:text-[86px]">
                3+ years of experience crafting mobile products, digital interfaces, and scalable design systems.
              </h1>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-4 lg:pt-11">
              <div className="max-w-[420px] lg:ml-auto">
                <p className="text-base leading-relaxed text-ink/62 dark:text-white/62 sm:text-lg">
                  I help teams design clean, usable, and developer-ready product experiences, from mobile app UI/UX and redesigns to prototypes, systems, and handoff.
                </p>
                <div className="mt-8 w-full max-w-[390px] sm:mt-10 lg:ml-auto lg:max-w-[380px]">
                  <AboutPortrait />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:ml-auto lg:w-[calc(100%-520px)] lg:grid-cols-4">
            {STATS.map((stat, index) => (
              <Reveal key={`${stat.value}-${stat.label}`} delay={index * 0.05}>
                <div className="h-full border-t border-black/15 py-5 dark:border-white/15">
                  <p className="font-display text-3xl font-bold leading-none tracking-normal text-ink dark:text-white">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink/50 dark:text-white/50">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <Reveal>
          <div className="rounded-[28px] bg-accent px-7 py-12 text-white shadow-[0_28px_90px_rgba(216,72,15,0.28)] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Experience</p>
            <h2 className="mt-5 max-w-[14ch] font-display text-4xl font-bold leading-[0.95] tracking-[-0.02em] sm:text-6xl lg:text-7xl">
              I design interfaces that look polished, feel simple, and are ready to ship.
            </h2>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pb-16 sm:px-10 lg:px-16 lg:pb-20">
        <Reveal className="flex flex-col justify-between gap-5 border-b border-black/10 pb-8 dark:border-white/10 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame">Services</p>
            <h2 className="mt-4 max-w-[12ch] font-display text-5xl font-bold leading-none text-ink dark:text-white sm:text-6xl">
              I can help you with
            </h2>
          </div>
          <p className="max-w-[38ch] text-sm leading-relaxed text-ink/55 dark:text-white/55">
            Focused UI/UX support for mobile products, redesigns, systems, prototypes, and handoff.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.05}>
              <article className="group grid gap-5 rounded-[24px] border border-black/10 bg-white p-6 shadow-[0_16px_50px_rgba(20,10,0,0.06)] transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-flame/35 dark:border-white/10 dark:bg-coal dark:shadow-none md:grid-cols-[120px_minmax(0,0.85fr)_minmax(0,1fr)] md:items-center md:p-8">
                <p className="font-display text-6xl font-bold leading-none tracking-[-0.04em] text-flame/90 sm:text-7xl">
                  {service.number}
                </p>
                <h3 className="font-display text-2xl font-bold tracking-[-0.01em] text-ink dark:text-white sm:text-3xl">
                  {service.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-ink/60 dark:text-white/60">{service.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pb-16 sm:px-10 lg:px-16 lg:pb-20">
        <Reveal>
          <div className="grid gap-8 rounded-[28px] border border-black/10 bg-white p-7 shadow-[0_20px_70px_rgba(20,10,0,0.08)] dark:border-white/10 dark:bg-coal dark:shadow-none lg:grid-cols-[0.7fr_1.3fr] lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame">Tools / Skills</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-none text-ink dark:text-white">Built around Figma and handoff.</h2>
            </div>
            <div className="flex flex-wrap content-start gap-3">
              {CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-black/10 bg-paper px-4 py-2 text-sm font-medium text-ink/65 dark:border-white/10 dark:bg-ink dark:text-white/65"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1320px] px-6 pb-24 sm:px-10 lg:px-16">
        <Reveal>
          <div className="overflow-hidden rounded-[36px] bg-gradient-to-br from-accent via-flame to-[#8f1b08] px-6 py-14 text-white shadow-[0_30px_100px_rgba(216,72,15,0.28)] sm:px-8 sm:py-16 lg:px-14 lg:py-20">
            <div className="mx-auto flex max-w-[1040px] flex-col items-center text-center">
              <h2 className="font-display text-[56px] font-bold leading-[0.9] tracking-normal sm:text-[86px] md:text-[112px] lg:text-[144px] xl:text-[164px]">
                Let&apos;s work
              </h2>
              <div className="my-4 sm:-my-1 lg:-my-6">
                <WorkTogetherPortrait />
              </div>
              <h2 className="font-display text-[56px] font-bold leading-[0.9] tracking-normal sm:text-[86px] md:text-[112px] lg:text-[144px] xl:text-[164px]">
                together
              </h2>
            </div>

            <div className="mx-auto mt-12 grid max-w-[1060px] gap-5 border-t border-white/20 pt-8 lg:mt-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch lg:gap-6">
              <div className="rounded-[24px] border border-white/18 bg-white/10 p-5 backdrop-blur-sm sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Drop me an email:</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="/contact"
                    className="min-w-0 flex-1 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 font-display text-xl font-bold leading-tight text-white underline-offset-4 transition-colors duration-200 hover:bg-white/15 hover:underline sm:text-2xl"
                  >
                    {EMAIL}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-white/25 bg-white px-5 text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:text-white active:translate-y-0"
                    aria-label="Copy email address"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M8 8H6.5C5.67 8 5 8.67 5 9.5V19C5 19.83 5.67 20.5 6.5 20.5H16C16.83 20.5 17.5 19.83 17.5 19V17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M9.5 3.5H18C18.83 3.5 19.5 4.17 19.5 5V13.5C19.5 14.33 18.83 15 18 15H9.5C8.67 15 8 14.33 8 13.5V5C8 4.17 8.67 3.5 9.5 3.5Z" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <p className="mt-4 text-base leading-relaxed text-white/75">
                  Have a product, role, or design challenge? Email me or view my CV.
                </p>
              </div>

              <div className="grid content-start items-start gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    download={link.download ? true : undefined}
                    className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-white/25 bg-white px-5 py-3 text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-flame hover:text-white active:translate-y-0"
                  >
                    <img src={link.icon} alt="" className="h-4 w-4 transition duration-200 group-hover:invert" aria-hidden="true" />
                    {link.label}
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

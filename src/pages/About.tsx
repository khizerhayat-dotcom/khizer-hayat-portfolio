import MixedText from "../components/MixedText";
import Reveal from "../components/Reveal";
import { AboutPortrait } from "../components/About";
import { PremiumCard, SectionHeader } from "../components/ui";
import { useState } from "react";
import behanceIcon from "../assets/icons/behance.svg";
import downloadIcon from "../assets/icons/download.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import aboutImage2 from "../assets/about/about-image-2.webp";

const EMAIL = "khizer8743@gmail.com";

const CONTACT_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/khizerdesigner/", icon: linkedinIcon },
  { label: "Behance", href: "https://www.behance.net/khizerhayat8743", icon: behanceIcon },
  { label: "Download CV", href: "/khizer-hayat-cv.pdf", icon: downloadIcon, download: true },
];

const STATS = [
  { value: "40+", label: "Products Shipped" },
  { value: "10M+", label: "App Downloads" },
  { value: "Lahore", label: "Pakistan" },
  { value: "UI/UX", label: "Designer" },
];

const SERVICES = [
  {
    title: "Mobile App UI/UX",
    text: "Flows, screens, onboarding, states, and polished app interfaces.",
  },
  {
    title: "Product Redesign",
    text: "Sharper structure, hierarchy, and visual polish for existing products.",
  },
  {
    title: "Design Systems",
    text: "Components, typography, color, spacing, states, and reusable patterns.",
  },
  {
    title: "Prototypes & Developer Handoff",
    text: "Clickable flows, organized Figma files, specs, assets, and build notes.",
  },
];

const EXPERIENCE_TAGS = [
  "Mobile UI",
  "Design Systems",
  "Product Redesign",
  "Prototypes",
  "Developer Handoff",
  "User Flows",
  "Design QA",
  "Figma Systems",
];

const TOOL_GROUPS = [
  {
    title: "Product Craft",
    items: ["Mobile UI", "Wireframes", "Visual Design", "User Flows"],
    visual: "craft",
  },
  {
    title: "Systems",
    items: ["Components", "Type", "Color", "States"],
    visual: "systems",
  },
  {
    title: "Handoff",
    items: ["Specs", "Assets", "Prototypes", "Design QA"],
    visual: "handoff",
  },
];

function ToolGroupIcon({ type }: { type: string }) {
  if (type === "systems") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4.5" y="4.5" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.45" />
        <rect x="13.5" y="4.5" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.45" opacity="0.72" />
        <rect x="4.5" y="13.5" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.45" opacity="0.72" />
        <rect x="13.5" y="13.5" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.45" />
      </svg>
    );
  }

  if (type === "handoff") {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 4.5H14.4L18 8.1V19.5H7V4.5Z" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="round" />
        <path d="M14.25 4.75V8.25H17.75" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="round" opacity="0.72" />
        <path d="M9.6 11.25H14.4M9.6 14H13.25" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" opacity="0.72" />
        <path d="M13.9 16.25L15 17.35L17.25 14.85" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="5" width="15" height="14" rx="2.3" stroke="currentColor" strokeWidth="1.45" />
      <path d="M4.75 9H19.25" stroke="currentColor" strokeWidth="1.45" opacity="0.72" />
      <path d="M8.25 12.25H12.25M8.25 15.25H15.75" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
      <circle cx="7.25" cy="7" r="0.75" fill="currentColor" opacity="0.72" />
    </svg>
  );
}

function WorkTogetherPortrait() {
  return (
    <div className="relative z-10 my-1 h-20 w-20 overflow-hidden rounded-full border-[5px] border-white/85 bg-white shadow-[0_14px_38px_rgba(72,17,0,0.18)] ring-1 ring-white/35 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
      <img
        src={aboutImage2}
        alt="Khizer Hayat"
        loading="lazy"
        decoding="async"
        className="h-full w-full scale-[1.08] object-cover"
      />
    </div>
  );
}

function WorkTogetherCTA() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = "/contact";
    }
  };

  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-12 sm:px-8 sm:pb-14 lg:px-14 lg:pb-16 xl:px-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-[26px] border border-white/20 bg-[linear-gradient(135deg,#ff8a22_0%,#f4620a_34%,#d94811_68%,#9f2308_100%)] px-5 py-7 text-white shadow-[0_22px_70px_rgba(216,72,15,0.22)] transition-colors duration-300 dark:border-flame/18 dark:bg-[linear-gradient(135deg,#2a0803_0%,#551606_42%,#8f2209_76%,#160604_100%)] dark:shadow-[0_24px_76px_rgba(0,0,0,0.4)] sm:px-7 sm:py-8 lg:px-10 lg:py-9">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_8%,rgba(255,232,190,0.28),transparent_30%),radial-gradient(circle_at_78%_0%,rgba(255,170,74,0.18),transparent_28%),radial-gradient(circle_at_50%_115%,rgba(103,16,0,0.24),transparent_45%)] dark:bg-[radial-gradient(circle_at_24%_8%,rgba(255,124,42,0.18),transparent_32%),radial-gradient(circle_at_78%_0%,rgba(255,93,28,0.14),transparent_30%),radial-gradient(circle_at_50%_115%,rgba(0,0,0,0.42),transparent_48%)]" />

          <div className="relative mx-auto flex max-w-[980px] flex-col items-center text-center">
            <h2 className="font-display text-[clamp(2.15rem,8vw,4.5rem)] font-bold leading-[0.92] tracking-normal">
              Let&apos;s <span className="font-normal italic text-white" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>work</span>
            </h2>
            <WorkTogetherPortrait />
            <h2 className="font-display text-[clamp(2.15rem,8vw,4.5rem)] font-bold leading-[0.92] tracking-normal">
              <span className="font-normal italic text-white" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>together</span>
            </h2>
          </div>

          <div className="relative mx-auto mt-5 flex max-w-[1040px] flex-col gap-4 border-t border-white/18 pt-5 sm:mt-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="text-center lg:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/68">Drop me an email</p>
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
                  className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-full border border-white/24 bg-white/12 px-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/18 hover:text-white active:translate-y-0 focus-visible:ring-4 focus-visible:ring-white/25"
                  aria-label="Copy email address"
                >
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
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/24 bg-white/12 text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/48 hover:bg-white/18 hover:text-white active:translate-y-0 focus-visible:ring-4 focus-visible:ring-white/25 sm:h-10 sm:w-10"
                  aria-label={link.label}
                >
                  <img src={link.icon} alt="" className="h-4 w-4 brightness-0 invert opacity-90 transition duration-200 group-hover:opacity-100" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function About() {
  return (
    <main className="min-h-screen bg-paper text-ink transition-colors duration-300 dark:bg-ink dark:text-white">
      <section className="bg-[#f3f1ed] px-5 pb-12 pt-[6.25rem] transition-colors duration-300 dark:bg-[#100b07] sm:px-8 sm:pb-14 sm:pt-[7rem] lg:px-14 lg:pb-16 lg:pt-[7.5rem] xl:px-16">
        <div className="mx-auto grid w-full max-w-[1240px] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:items-center lg:gap-12">
          <div className="min-w-0">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-flame">About Khizer Hayat</p>
              <h1 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,5.2vw,3.75rem)] font-bold leading-[1.04] tracking-normal text-ink dark:text-white">
                <MixedText
                  text="UI/UX Designer crafting clean mobile products and scalable design systems."
                  accent="crafting"
                />
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.7] text-ink/64 dark:text-white/62 sm:text-base">
                I am Khizer Hayat, a UI/UX Designer in Lahore, Pakistan focused on mobile app UI/UX, product redesign, design systems, prototypes, and developer handoff.
              </p>
            </Reveal>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((stat, index) => (
                <Reveal key={`${stat.value}-${stat.label}`} delay={index * 0.04}>
                  <div className="h-full rounded-[18px] border border-black/[0.08] bg-white/70 p-4 shadow-[0_10px_28px_rgba(20,10,0,0.045)] dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none">
                    <p className="font-display text-[clamp(1.3rem,4vw,1.75rem)] font-bold leading-none text-ink dark:text-white">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-ink/50 dark:text-white/50">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.12}>
            <div className="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:mx-0 lg:ml-auto lg:max-w-[340px]">
              <AboutPortrait enableCursorGlow />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 sm:py-12 lg:px-14 lg:py-14 xl:px-16">
        <Reveal className="mx-auto max-w-[1240px] overflow-hidden rounded-[28px] border border-white/18 bg-[linear-gradient(135deg,#f4620a_0%,#d8480f_55%,#a92a0b_100%)] px-5 py-8 text-white shadow-[0_20px_64px_rgba(216,72,15,0.22)] dark:border-flame/18 dark:bg-[linear-gradient(135deg,#2a0803_0%,#551606_52%,#120504_100%)] dark:shadow-[0_24px_76px_rgba(0,0,0,0.36)] sm:px-7 sm:py-9 lg:px-9">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/72">Experience</p>
              <h2 className="mt-3 max-w-[17ch] font-display text-[clamp(2rem,5vw,3.45rem)] font-bold leading-[1.02] tracking-normal">
                <MixedText text="Interfaces that look polished, feel simple, and are ready to ship." accent="polished" accentClassName="text-white" />
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {EXPERIENCE_TAGS.map((tag) => (
                <span key={tag} className="rounded-full border border-white/24 bg-white/12 px-3.5 py-2 text-xs font-semibold text-white/88 backdrop-blur-sm sm:text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-10 sm:px-8 sm:pb-12 lg:px-14 lg:pb-14 xl:px-16">
        <Reveal>
          <SectionHeader
            eyebrow="Services"
            title={<MixedText text="Focused product design support." accent="product" />}
            description="Short, practical support across mobile app UI/UX, redesign, systems, prototypes, and handoff."
            titleClassName="max-w-[15ch]"
          />
        </Reveal>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.05}>
              <PremiumCard className="h-full p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-flame">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-xl font-bold leading-tight text-ink dark:text-white sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.65] text-ink/60 dark:text-white/60">
                  {service.text}
                </p>
              </PremiumCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-12 sm:px-8 sm:pb-14 lg:px-14 lg:pb-16 xl:px-16">
        <Reveal>
          <SectionHeader
            eyebrow="Tools / Skills"
            title={<MixedText text="Built around craft, systems, and handoff." accent="craft" />}
            description="A compact capability set for moving product work from structure to build-ready files."
            titleClassName="max-w-[16ch]"
          />
        </Reveal>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {TOOL_GROUPS.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.05}>
              <PremiumCard className="h-full border-[#e4d7ca] bg-[#fffbf6]/92 p-5 shadow-[0_14px_42px_rgba(70,38,18,0.055)] hover:border-flame/30 hover:shadow-[0_20px_58px_rgba(70,38,18,0.085)] dark:border-white/[0.09] dark:bg-[#11100f] dark:hover:border-flame/34 sm:p-6">
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-flame/38 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-flame/75">
                      0{index + 1} / Skill set
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold leading-tight text-ink dark:text-white">{group.title}</h3>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#e3d5c8] bg-[#fbf4ec] text-flame shadow-[0_8px_22px_rgba(70,38,18,0.045)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-flame/28 group-hover:bg-[#fff7ef] dark:border-white/[0.09] dark:bg-white/[0.045] dark:text-flame/90 dark:shadow-none dark:group-hover:border-flame/32 dark:group-hover:bg-flame/[0.09]">
                    <ToolGroupIcon type={group.visual} />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="inline-flex min-h-8 items-center rounded-full border border-[#dfd1c4] bg-[#fbf4ec] px-3.5 py-1.5 text-xs font-semibold text-ink/64 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] transition-colors duration-200 group-hover:border-flame/22 group-hover:bg-[#fff7ef] group-hover:text-ink/76 dark:border-white/[0.09] dark:bg-white/[0.045] dark:text-white/68 dark:shadow-none dark:group-hover:border-flame/28 dark:group-hover:bg-flame/[0.08] dark:group-hover:text-white">
                      {item}
                    </span>
                  ))}
                </div>
              </PremiumCard>
            </Reveal>
          ))}
        </div>

      </section>

      <WorkTogetherCTA />
    </main>
  );
}

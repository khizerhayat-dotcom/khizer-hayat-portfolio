import MixedText from "../components/MixedText";
import Reveal from "../components/Reveal";
import { PremiumCard, SectionHeader } from "../components/ui";

const SERVICES = [
  {
    number: "01",
    title: "Mobile App UI/UX",
    help: "Clean app flows, onboarding, and polished mobile screens.",
    solves: "Turns app ideas into clear, usable journeys.",
    deliverable: "Figma screens, flows, prototype, and handoff notes.",
    categories: ["Mobile UI", "App Flows", "Onboarding", "User Journeys", "Interaction Design", "Figma Screens"],
    visual: "mobile",
  },
  {
    number: "02",
    title: "Web App & Dashboard UI",
    help: "Structured dashboards, admin panels, and data-heavy web UI.",
    solves: "Makes complex product data easier to scan and act on.",
    deliverable: "Responsive web UI, dashboard states, tables, and handoff.",
    categories: ["Web Apps", "Dashboards", "SaaS UI", "Admin Panels", "Data Tables", "Responsive Web"],
    visual: "dashboard",
  },
  {
    number: "03",
    title: "Product Redesign",
    help: "Sharper hierarchy, cleaner navigation, and stronger visuals.",
    solves: "Improves clarity in dated or unclear products.",
    deliverable: "UX audit, refreshed screens, rationale, and specs.",
    categories: ["UX Audit", "UI Refresh", "Navigation", "Visual Polish", "Usability Fixes", "Conversion Flow"],
    visual: "redesign",
  },
  {
    number: "04",
    title: "Design Systems",
    help: "Reusable components, tokens, states, and UI foundations.",
    solves: "Keeps interface quality consistent as products grow.",
    deliverable: "Components, UI patterns, tokens, and usage rules.",
    categories: ["Components", "UI Patterns", "Typography", "Color System", "States", "Design Tokens"],
    visual: "systems",
  },
  {
    number: "05",
    title: "Prototype & Handoff",
    help: "Clickable flows, specs, assets, and handoff notes.",
    solves: "Reduces uncertainty before implementation.",
    deliverable: "Prototype, user flows, specs, assets, and design QA notes.",
    categories: ["Prototypes", "User Flows", "Specs", "Assets", "Developer Handoff", "Design QA"],
    visual: "handoff",
  },
];

function ServiceVisual({ type }: { type: string }) {
  if (type === "dashboard") {
    return (
      <div className="flex h-20 items-center rounded-2xl border border-black/[0.08] bg-[#faf8f4] p-3 dark:border-white/10 dark:bg-white/[0.045]">
        <div className="grid h-full w-full grid-cols-[1fr_0.8fr] gap-2">
          <span className="rounded-lg bg-flame/16" />
          <span className="rounded-lg bg-ink/[0.08] dark:bg-white/[0.12]" />
          <span className="col-span-2 rounded-lg bg-ink/[0.07] dark:bg-white/[0.1]" />
        </div>
      </div>
    );
  }

  if (type === "redesign") {
    return (
      <div className="flex h-20 items-center rounded-2xl border border-black/[0.08] bg-[#faf8f4] p-3 dark:border-white/10 dark:bg-white/[0.045]">
        <div className="grid h-full w-full grid-cols-2 gap-2">
          <span className="rounded-lg bg-ink/[0.08] dark:bg-white/[0.12]" />
          <span className="rounded-lg bg-flame/16" />
        </div>
      </div>
    );
  }

  if (type === "systems") {
    return (
      <div className="flex h-20 items-center rounded-2xl border border-black/[0.08] bg-[#faf8f4] p-3 dark:border-white/10 dark:bg-white/[0.045]">
        <div className="grid h-full w-full grid-cols-3 gap-2">
          <span className="rounded-lg bg-flame/16" />
          <span className="rounded-lg bg-ink/[0.08] dark:bg-white/[0.12]" />
          <span className="rounded-lg bg-ink/[0.08] dark:bg-white/[0.12]" />
          <span className="col-span-3 rounded-lg bg-ink/[0.07] dark:bg-white/[0.1]" />
        </div>
      </div>
    );
  }

  if (type === "handoff") {
    return (
      <div className="flex h-20 items-center rounded-2xl border border-black/[0.08] bg-[#faf8f4] p-3 dark:border-white/10 dark:bg-white/[0.045]">
        <div className="flex w-full items-center gap-2">
          <span className="h-9 w-9 rounded-full border border-flame/30 bg-flame/14" />
          <span className="h-px flex-1 bg-ink/16 dark:bg-white/18" />
          <span className="h-9 w-9 rounded-full border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.08]" />
          <span className="h-px flex-1 bg-ink/16 dark:bg-white/18" />
          <span className="h-9 w-9 rounded-lg border border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.08]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-20 items-center justify-center rounded-2xl border border-black/[0.08] bg-[#faf8f4] dark:border-white/10 dark:bg-white/[0.045]">
      <div className="h-14 w-9 rounded-[14px] border border-ink/20 p-1.5 dark:border-white/24">
        <span className="block h-2 rounded bg-flame/45" />
        <span className="mt-1.5 block h-4 rounded bg-ink/[0.08] dark:bg-white/[0.12]" />
        <span className="mt-1.5 block h-1 rounded bg-ink/14 dark:bg-white/18" />
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <main className="min-h-screen bg-paper pt-28 text-ink transition-colors duration-300 dark:bg-ink dark:text-white lg:pt-[7.25rem]">
      <section className="relative mx-auto max-w-[1240px] overflow-hidden px-6 pb-16 sm:px-10 lg:px-16 lg:pb-20">
        <Reveal>
          <SectionHeader
            eyebrow="Services"
            title={<MixedText text="Design support for apps, dashboards, and systems." accent="Design" />}
            titleAs="h1"
            description="Mobile apps, web apps, SaaS dashboards, design systems, prototypes, and developer-ready handoff."
            titleClassName="max-w-[19ch] text-[clamp(2.35rem,5.4vw,4rem)] leading-[1.02]"
            className="relative gap-5 pb-6 md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.7fr)] md:items-end lg:pb-7"
          />
        </Reveal>

        <div className="relative mt-7 grid gap-4 md:grid-cols-2 lg:mt-8 lg:gap-5">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06}>
              <PremiumCard className="h-full p-5 sm:p-6">
                <div className="grid gap-5">
                  <ServiceVisual type={service.visual} />
                </div>
                <div className="mt-5 flex items-start justify-between gap-5">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-flame/80">
                    {service.number}
                  </p>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-paper text-flame transition-colors duration-300 group-hover:border-flame/60 group-hover:bg-flame group-hover:text-white dark:border-white/10 dark:bg-ink">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-normal text-ink dark:text-white">
                  {service.title}
                </h2>
                <p className="mt-2 max-w-[38ch] text-[15px] font-normal leading-[1.6] text-ink/58 dark:text-white/60">{service.help}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.categories.slice(0, 4).map((category) => (
                    <span key={category} className="rounded-full border border-black/[0.07] bg-[#faf8f4] px-3 py-1 text-[11px] font-medium text-ink/52 dark:border-white/10 dark:bg-white/[0.045] dark:text-white/58">
                      {category}
                    </span>
                  ))}
                </div>
                <div className="mt-5 grid gap-2 text-sm font-normal text-ink/60 dark:text-white/62">
                  <p className="rounded-2xl border border-black/[0.07] bg-[#faf8f4]/70 px-3.5 py-2 dark:border-white/10 dark:bg-white/[0.04]">{service.solves}</p>
                  <p className="rounded-2xl border border-black/[0.07] bg-[#faf8f4]/70 px-3.5 py-2 dark:border-white/10 dark:bg-white/[0.04]">{service.deliverable}</p>
                </div>
              </PremiumCard>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}

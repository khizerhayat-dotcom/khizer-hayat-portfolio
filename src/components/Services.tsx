import Reveal from "./Reveal";
import MixedText from "./MixedText";
import { LinkButton, PremiumCard, SectionHeader } from "./ui";

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
    help: "Sharper hierarchy, navigation, and visual polish.",
    solves: "Improves clarity in dated or unclear products.",
    deliverable: "UX audit, refreshed screens, rationale, and specs.",
    categories: ["UX Audit", "UI Refresh", "Navigation", "Visual Polish", "Usability Fixes", "Conversion Flow"],
    visual: "redesign",
  },
  {
    number: "04",
    title: "Design Systems",
    help: "Reusable components, tokens, states, and UI foundations.",
    solves: "Keeps product teams consistent as the interface grows.",
    deliverable: "Components, UI patterns, tokens, and usage rules.",
    categories: ["Components", "UI Patterns", "Typography", "Color System", "States", "Design Tokens"],
    visual: "systems",
  },
  {
    number: "05",
    title: "Prototype & Handoff",
    help: "Clickable flows, specs, assets, and handoff notes.",
    solves: "Removes ambiguity before implementation.",
    deliverable: "Prototype, user flows, specs, assets, and design QA notes.",
    categories: ["Prototypes", "User Flows", "Specs", "Assets", "Developer Handoff", "Design QA"],
    visual: "handoff",
  },
];

function ServiceVisual({ type }: { type: string }) {
  const baseLine = "block h-px rounded-full bg-ink/18 dark:bg-white/20";

  if (type === "mobile") {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-black/[0.08] bg-[#faf8f4] transition-transform duration-300 group-hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/[0.045]">
        <div className="h-11 w-7 rounded-[10px] border border-ink/34 p-1 dark:border-white/38">
          <span className="mx-auto block h-0.5 w-2 rounded-full bg-ink/35 dark:bg-white/40" />
          <div className="mt-1.5 space-y-1">
            <span className="block h-1.5 rounded-sm bg-flame/55" />
            <span className="block h-1.5 rounded-sm bg-ink/14 dark:bg-white/20" />
            <span className="block h-3 rounded-md bg-ink/[0.08] dark:bg-white/[0.12]" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "redesign") {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-black/[0.08] bg-[#faf8f4] transition-transform duration-300 group-hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/[0.045]">
        <div className="relative h-9 w-10 overflow-hidden rounded-lg border border-ink/20 dark:border-white/24">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-ink/[0.08] dark:bg-white/[0.1]" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-flame/[0.12]" />
          <span className="absolute inset-y-1/2 left-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-flame/70" />
          <span className="absolute left-1.5 top-2 h-px w-3 bg-ink/24 dark:bg-white/30" />
          <span className="absolute right-1.5 top-2 h-px w-4 bg-flame/70" />
          <span className="absolute bottom-2 left-1.5 h-px w-4 bg-ink/16 dark:bg-white/24" />
          <span className="absolute bottom-2 right-1.5 h-px w-3 bg-flame/50" />
        </div>
      </div>
    );
  }

  if (type === "dashboard") {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-black/[0.08] bg-[#faf8f4] transition-transform duration-300 group-hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/[0.045]">
        <div className="h-9 w-10 rounded-lg border border-ink/20 p-1.5 dark:border-white/24">
          <span className="block h-1.5 rounded-sm bg-flame/55" />
          <div className="mt-1.5 grid grid-cols-[1fr_0.8fr] gap-1">
            <span className="h-4 rounded bg-ink/[0.08] dark:bg-white/[0.12]" />
            <span className="h-4 rounded bg-ink/[0.08] dark:bg-white/[0.12]" />
          </div>
          <span className="mt-1.5 block h-px rounded-full bg-ink/18 dark:bg-white/20" />
        </div>
      </div>
    );
  }

  if (type === "systems") {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-black/[0.08] bg-[#faf8f4] transition-transform duration-300 group-hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/[0.045]">
        <div className="grid h-9 w-9 grid-cols-2 gap-1.5">
          <span className="rounded-md border border-flame/30 bg-flame/[0.12]" />
          <span className="rounded-md border border-ink/12 bg-white dark:border-white/12 dark:bg-white/[0.07]" />
          <span className="rounded-md border border-ink/12 bg-white dark:border-white/12 dark:bg-white/[0.07]" />
          <span className="rounded-md border border-ink/12 bg-ink/[0.08] dark:border-white/12 dark:bg-white/[0.12]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-black/[0.08] bg-[#faf8f4] transition-transform duration-300 group-hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/[0.045]">
      <div className="w-10 space-y-1.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-flame/40 bg-flame/[0.14]" />
          <span className={`${baseLine} w-6`} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-ink/16 dark:border-white/18" />
          <span className={`${baseLine} w-7`} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-ink/16 dark:border-white/18" />
          <span className={`${baseLine} w-5`} />
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="scroll-mt-28 bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1200px] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
        <Reveal>
          <SectionHeader
            eyebrow="Services"
            title={<MixedText text="Design support for apps, dashboards, and systems." accent="Design" />}
            description="Mobile apps, web apps, SaaS dashboards, design systems, prototypes, and developer-ready handoff."
            action={<LinkButton href="/services" variant="secondary">Explore services</LinkButton>}
            titleClassName="max-w-[16ch] text-[clamp(2rem,5vw,3.35rem)]"
            className="pb-6"
          />
        </Reveal>

        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:gap-5">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.07}>
              <PremiumCard className="h-full p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <ServiceVisual type={service.visual} />
                  <div className="rounded-full border border-black/[0.08] bg-[#faf8f4] px-2.5 py-1 text-[10px] font-medium text-ink/48 transition-colors duration-300 group-hover:border-flame/24 group-hover:text-flame dark:border-white/10 dark:bg-white/[0.045] dark:text-white/48 dark:group-hover:text-flame">
                    {service.number}
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="font-display text-xl font-semibold leading-tight tracking-normal text-ink transition-colors duration-300 group-hover:text-flame dark:text-white sm:text-[1.35rem]">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-[38ch] text-sm font-normal leading-[1.6] text-ink/58 dark:text-white/60">
                    {service.help}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.categories.slice(0, 3).map((category) => (
                      <span key={category} className="rounded-full border border-black/[0.07] bg-[#faf8f4] px-3 py-1 text-[11px] font-medium text-ink/52 dark:border-white/10 dark:bg-white/[0.045] dark:text-white/58">
                        {category}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-ink/46 transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-flame group-hover:bg-flame group-hover:text-white dark:border-white/10 dark:text-white/46 dark:group-hover:border-flame" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3.5 8H12.5M12.5 8L8.75 4.25M12.5 8L8.75 11.75" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </PremiumCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

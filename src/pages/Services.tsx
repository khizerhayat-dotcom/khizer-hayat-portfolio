import Reveal from "../components/Reveal";
import { Card, LinkButton, SectionHeader } from "../components/ui";

const SERVICES = [
  {
    number: "01",
    title: "Mobile App UI/UX",
    summary: "Clear app flows, polished screens, onboarding, and conversion-focused mobile moments.",
    included: ["User flows", "High-fidelity UI", "Prototype", "Responsive states"],
  },
  {
    number: "02",
    title: "Product Redesign",
    summary: "Sharper hierarchy, cleaner navigation, stronger visuals, and fewer friction points.",
    included: ["UX audit", "Screen structure", "Visual refresh", "Handoff notes"],
  },
  {
    number: "03",
    title: "Design Systems",
    summary: "Reusable foundations for teams shipping many screens with consistent quality.",
    included: ["Type and color", "Components", "States", "Usage rules"],
  },
  {
    number: "04",
    title: "Prototype & Handoff",
    summary: "Clickable flows and organized Figma files that help developers build accurately.",
    included: ["Prototype links", "Specs", "Assets", "Design QA"],
  },
];

export default function Services() {
  return (
    <main className="min-h-screen bg-paper pt-32 text-ink transition-colors duration-300 dark:bg-ink dark:text-white">
      <section className="relative mx-auto max-w-[1240px] overflow-hidden px-6 pb-20 sm:px-10 lg:px-16 lg:pb-24">
        <div className="pointer-events-none absolute right-[-12rem] top-16 h-80 w-80 rounded-full bg-flame/10 blur-3xl dark:bg-flame/15" />
        <Reveal>
          <SectionHeader
            eyebrow="Services"
            title="UI/UX support for products ready to ship."
            titleAs="h1"
            description="Focused design help for mobile apps, redesigns, systems, prototypes, and developer-ready handoff."
            titleClassName="max-w-[11ch] text-5xl sm:text-6xl lg:text-7xl"
            className="relative pb-9 lg:grid lg:grid-cols-[1.1fr_0.7fr] lg:items-end"
          />
        </Reveal>

        <div className="relative mt-10 grid gap-5 md:grid-cols-2 lg:gap-6">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06}>
              <Card className="group h-full rounded-[24px] p-6 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-flame/35 hover:shadow-[0_26px_70px_rgba(20,10,0,0.1)] dark:hover:border-flame/40 sm:p-7 lg:p-8">
                <div className="flex items-start justify-between gap-6">
                  <p className="font-display text-6xl font-bold leading-none tracking-[-0.04em] text-flame/90 sm:text-7xl">
                    {service.number}
                  </p>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/10 bg-paper text-flame transition-colors duration-300 group-hover:border-flame group-hover:bg-flame group-hover:text-white dark:border-white/10 dark:bg-ink">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <h2 className="mt-7 font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-ink dark:text-white">
                  {service.title}
                </h2>
                <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-ink/60 dark:text-white/60">{service.summary}</p>
                <div className="mt-7 grid gap-2 sm:grid-cols-2">
                  {service.included.map((item) => (
                    <div key={item} className="rounded-2xl border border-black/5 bg-black/[0.035] px-4 py-3 text-sm font-medium text-ink/65 dark:border-white/10 dark:bg-white/10 dark:text-white/65">
                      {item}
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 flex justify-center">
            <LinkButton href="/contact">Start a Project</LinkButton>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

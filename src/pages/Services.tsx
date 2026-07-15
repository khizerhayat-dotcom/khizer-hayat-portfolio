import MixedText from "../components/MixedText";
import Reveal from "../components/Reveal";
import { LinkButton, PremiumCard, SectionHeader } from "../components/ui";

const SERVICES = [
  {
    number: "01",
    title: "Mobile App UI/UX",
    help: "Flows, screens, onboarding, and key states.",
    solves: "Makes complex mobile products easier to use.",
    deliverable: "Figma UI, prototype, handoff notes.",
  },
  {
    number: "02",
    title: "Product Redesign",
    help: "Audit, hierarchy, journeys, and visual polish.",
    solves: "Reduces friction in dated or unclear products.",
    deliverable: "Priority screens, rationale, specs.",
  },
  {
    number: "03",
    title: "Design Systems",
    help: "Components, states, type, color, and spacing.",
    solves: "Keeps interface quality consistent as products grow.",
    deliverable: "Foundations, variants, usage rules.",
  },
  {
    number: "04",
    title: "Prototype & Handoff",
    help: "Clickable flows, specs, assets, and build notes.",
    solves: "Reduces uncertainty before implementation.",
    deliverable: "Prototype, assets, edge states, clean Figma.",
  },
];

export default function Services() {
  return (
    <main className="min-h-screen bg-paper pt-28 text-ink transition-colors duration-300 dark:bg-ink dark:text-white lg:pt-[7.25rem]">
      <section className="relative mx-auto max-w-[1240px] overflow-hidden px-6 pb-16 sm:px-10 lg:px-16 lg:pb-20">
        <div className="pointer-events-none absolute right-[-12rem] top-8 h-72 w-72 rounded-full bg-flame/10 blur-3xl dark:bg-flame/15" />
        <Reveal>
          <SectionHeader
            eyebrow="Services"
            title={<MixedText text="UI/UX services for products ready to ship." accent="ship" />}
            titleAs="h1"
            description="Focused support for mobile app UI/UX, redesigns, systems, prototypes, and developer-ready handoff."
            titleClassName="max-w-[19ch] text-[clamp(2.35rem,5.4vw,4rem)] leading-[1.02]"
            className="relative gap-5 pb-6 md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.7fr)] md:items-end lg:pb-7"
          />
        </Reveal>

        <div className="relative mt-6 grid gap-5 md:grid-cols-2 lg:mt-7 lg:gap-6">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06}>
              <PremiumCard className="h-full p-5 sm:p-6">
                <div className="flex items-start justify-between gap-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-flame/80">
                    {service.number}
                  </p>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-paper text-flame transition-colors duration-300 group-hover:border-flame group-hover:bg-flame group-hover:text-white dark:border-white/10 dark:bg-ink">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <h2 className="mt-6 font-display text-2xl font-bold leading-tight tracking-normal text-ink dark:text-white">
                  {service.title}
                </h2>
                <p className="mt-2 max-w-[40ch] text-[15px] leading-[1.6] text-ink/60 dark:text-white/60">{service.help}</p>
                <dl className="mt-6 grid gap-3 text-sm">
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/40 dark:text-white/40">Solves</dt>
                    <dd className="mt-1 leading-[1.55] text-ink/64 dark:text-white/66">{service.solves}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/40 dark:text-white/40">Output</dt>
                    <dd className="mt-1 leading-[1.55] text-ink/64 dark:text-white/66">{service.deliverable}</dd>
                  </div>
                </dl>
              </PremiumCard>
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

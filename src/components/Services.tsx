import Reveal from "./Reveal";
import { Card, LinkButton, SectionHeader } from "./ui";

const SERVICES = [
  {
    number: "01",
    title: "Mobile App UI/UX",
    description: "Clear app flows, polished screens, and mobile-first interaction patterns.",
  },
  {
    number: "02",
    title: "Product Redesign",
    description: "Sharper hierarchy, cleaner journeys, and stronger visual polish.",
  },
  {
    number: "03",
    title: "Design Systems",
    description: "Reusable components, typography, spacing, color, and scalable UI rules.",
  },
  {
    number: "04",
    title: "Prototype & Handoff",
    description: "Clickable flows, organized Figma files, specs, assets, and build notes.",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-28 bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1200px] px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
        <Reveal>
          <SectionHeader
            eyebrow="Services"
            title="Design support that moves products forward"
            description="Focused UI/UX work for shipped products: apps, redesigns, systems, prototypes, and developer handoff."
            action={<LinkButton href="/services" variant="secondary">Explore services</LinkButton>}
            titleClassName="max-w-[15ch] text-[clamp(2.25rem,5vw,3.6rem)]"
          />
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:gap-5">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.07}>
              <Card className="group relative h-full overflow-hidden p-5 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-flame/35 hover:shadow-[0_22px_58px_rgba(20,10,0,0.09)] dark:hover:border-flame/40 sm:p-6">
                <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-flame/[0.055] transition-colors duration-300 group-hover:bg-flame/10 dark:bg-flame/10" />
                <div className="relative flex items-center justify-between gap-4">
                  <p className="font-display text-[clamp(2.35rem,6vw,3.25rem)] font-bold leading-none tracking-normal text-flame/90">
                    {service.number}
                  </p>
                  <span className="h-px flex-1 bg-black/10 transition-colors duration-300 group-hover:bg-flame/40 dark:bg-white/10" />
                </div>
                <h3 className="relative mt-6 font-display text-[clamp(1.35rem,3vw,1.8rem)] font-bold leading-tight tracking-normal text-ink dark:text-white">
                  {service.title}
                </h3>
                <p className="relative mt-3 max-w-[34ch] text-sm leading-[1.65] text-ink/58 dark:text-white/60">
                  {service.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

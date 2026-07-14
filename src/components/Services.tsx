import Reveal from "./Reveal";
import { Card, LinkButton, SectionHeader } from "./ui";

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
    description: "Reusable components, spacing rules, typography, colors, and scalable UI foundations.",
  },
  {
    number: "04",
    title: "Prototype & Handoff",
    description: "Clickable prototypes, organized Figma files, specs, assets, and developer-ready handoff.",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-28 bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <Reveal>
          <SectionHeader
            eyebrow="Services"
            title="What I do"
            description="Focused UI/UX support for mobile apps, redesigns, systems, prototypes, and handoff."
            action={<LinkButton href="/services" variant="text">Explore Services</LinkButton>}
            titleClassName="max-w-[12ch] text-5xl sm:text-6xl"
          />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:gap-5">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.07}>
              <Card className="group h-full p-6 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-flame/35 dark:hover:border-flame/40">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-display text-5xl font-bold leading-none tracking-[-0.04em] text-flame/90">
                    {service.number}
                  </p>
                  <span className="h-px flex-1 bg-black/10 transition-colors duration-300 group-hover:bg-flame/40 dark:bg-white/10" />
                </div>
                <h3 className="mt-7 font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-ink dark:text-white sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-ink/55 dark:text-white/60">
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

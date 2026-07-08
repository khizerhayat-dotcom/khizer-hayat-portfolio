import Reveal from "./Reveal";

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
        <Reveal className="flex flex-col justify-between gap-6 border-b border-black/10 pb-8 dark:border-white/10 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-flame">Services</p>
            <h2 className="mt-5 max-w-[12ch] font-display text-5xl font-bold leading-[0.95] tracking-[-0.02em] text-ink dark:text-white sm:text-6xl">
              What I do
            </h2>
          </div>
          <div className="max-w-[40ch]">
            <p className="text-base leading-relaxed text-ink/60 dark:text-white/60">
              Focused UI/UX support for mobile apps, redesigns, systems, prototypes, and handoff.
            </p>
            <a href="/services" className="mt-5 inline-flex text-sm font-semibold text-flame underline-offset-4 hover:underline">
              Explore Services
            </a>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:gap-5">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.07}>
              <article className="group h-full rounded-[24px] border border-black/10 bg-white p-6 shadow-[0_18px_55px_rgba(20,10,0,0.06)] transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-flame/35 dark:border-white/10 dark:bg-coal dark:shadow-none dark:hover:border-flame/40">
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
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

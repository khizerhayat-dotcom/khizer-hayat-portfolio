import Reveal from "./Reveal";

const STEPS = [
  {
    number: "01",
    title: "Discover",
    description: "Stakeholder interviews and audits to find where the real problem lives.",
  },
  {
    number: "02",
    title: "Define",
    description: "Turning research into a scoped brief: what we're solving, and what we're not.",
  },
  {
    number: "03",
    title: "Design",
    description: "Wireframes to high-fidelity UI, tested against real tasks along the way.",
  },
  {
    number: "04",
    title: "Deliver",
    description: "Developer handoff, QA passes, and support through to launch.",
  },
];

export default function Process() {
  return (
    <section className="bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-flame">Process</p>
          <h2 className="mt-5 max-w-[20ch] font-display text-4xl font-bold leading-[1.05] tracking-[-0.01em] text-ink dark:text-white sm:text-5xl uppercase">
            Four stages, every project
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08} className="relative">
              <span className="font-display text-5xl font-bold tracking-[-0.02em] text-ink/10 dark:text-white/10">
                {step.number}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold tracking-[-0.01em] text-ink dark:text-white">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[32ch] text-[15px] leading-relaxed text-ink/60 dark:text-white/55">
                {step.description}
              </p>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute right-[-1.25rem] top-3 hidden h-px w-8 bg-black/15 dark:bg-white/15 lg:block"
                />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

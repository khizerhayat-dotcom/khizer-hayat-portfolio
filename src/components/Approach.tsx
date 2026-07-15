import MixedText from "./MixedText";
import Reveal from "./Reveal";

const PRINCIPLES = [
  {
    title: "Research before pixels",
    description:
      "Interviews, personas, and journey maps come first, so design decisions are grounded in real user tasks rather than guesswork.",
  },
  {
    title: "Built for the handoff",
    description:
      "High-fidelity Figma prototypes and clear specs, made so engineering can ship the design accurately, not approximately.",
  },
  {
    title: "Clarity over decoration",
    description:
      "Interfaces that stay usable as they scale across web, mobile, and dashboards, balancing usability with business goals.",
  },
];

export default function Approach() {
  return (
    <section className="bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-flame">Approach</p>
          <h2 className="mt-5 max-w-[20ch] font-display text-4xl font-bold leading-[1.05] tracking-normal text-ink dark:text-white sm:text-5xl uppercase">
            <MixedText text="How I work" accent="work" />
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:mt-14 lg:grid-cols-3 lg:gap-8">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-8 shadow-[0_14px_40px_rgba(20,10,0,0.06)] dark:border-white/10 dark:bg-coal dark:shadow-none">
                <span className="font-display text-2xl font-bold tracking-normal text-flame">
                  0{i + 1}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold tracking-normal text-ink dark:text-white">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/60 dark:text-white/55">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

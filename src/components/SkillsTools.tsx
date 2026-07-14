import Reveal from "./Reveal";

const SKILL_GROUPS = [
  {
    title: "Product UX",
    items: ["User flows", "Information architecture", "Mobile app UX", "Dashboard UX"],
  },
  {
    title: "Interface Systems",
    items: ["Design systems", "Component states", "Responsive web UI", "Website UI"],
  },
  {
    title: "Prototyping",
    items: ["Figma prototypes", "Interaction specs", "Microinteractions", "Design QA"],
  },
  {
    title: "Handoff",
    items: ["Developer handoff", "Figma components", "Redlines", "Product documentation"],
  },
];

const TOOLS = [
  "Figma",
  "FigJam",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Prototyping",
  "Handoff tools",
  "Design systems",
  "Mobile apps",
  "Dashboards",
];

export default function SkillsTools() {
  return (
    <section className="bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-flame">Skills & tools</p>
            <h2 className="mt-5 max-w-[18ch] font-display text-4xl font-bold leading-[1.05] tracking-normal text-ink dark:text-white sm:text-5xl uppercase">
              Built for product teams
            </h2>
          </div>
          <div className="flex max-w-[42ch] flex-wrap gap-2">
            {TOOLS.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-ink/60 dark:border-white/10 dark:bg-coal dark:text-white/60"
              >
                {tool}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-black/10 bg-white p-6 shadow-[0_14px_40px_rgba(20,10,0,0.06)] dark:border-white/10 dark:bg-coal dark:shadow-none">
                <h3 className="font-display text-lg font-bold text-ink dark:text-white">{group.title}</h3>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/60 dark:text-white/60">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-flame" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

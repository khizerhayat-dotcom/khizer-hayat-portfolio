import Reveal from "./Reveal";
import { LinkButton, SectionHeader } from "./ui";
import aspireCover from "../assets/work/aspire-cover.webp";
import voicifyCover from "../assets/work/voicify-cover.webp";
import aurumCover from "../assets/work/aurum-cover.webp";
import hdCameraCover from "../assets/work/hdcamera-cover.webp";

interface Project {
  name: string;
  category: string;
  description: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    name: "Aspire",
    category: "AI Platform",
    description: "A cleaner AI creation experience for photos, videos, and creative templates.",
    image: aspireCover,
  },
  {
    name: "Voicify",
    category: "AI Audio App",
    description: "A mobile toolkit for voice effects, text-to-speech, and translation flows.",
    image: voicifyCover,
  },
  {
    name: "Aurum",
    category: "Web3 Mobile App",
    description: "A rewards and wallet experience shaped around daily retention loops.",
    image: aurumCover,
  },
  {
    name: "HD Camera",
    category: "Photography App",
    description: "A compact camera and editing interface for fast AI-assisted photo actions.",
    image: hdCameraCover,
  },
];

export default function Work() {
  return (
    <section id="work" className="scroll-mt-28 bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <Reveal>
          <SectionHeader
            eyebrow="Selected work"
            title="Featured projects"
            description="A concise look at selected work across AI, mobile apps, dashboards, web apps, and product interfaces."
            action={<LinkButton href="/work" variant="text">View More</LinkButton>}
            titleClassName="text-4xl uppercase sm:text-5xl"
          />
        </Reveal>

        <div className="mt-12 grid gap-7 sm:mt-14 md:grid-cols-2 lg:gap-9">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.08}>
              <a
                href="/work"
                className="group block rounded-2xl border border-black/10 bg-white p-3 shadow-[0_18px_55px_rgba(20,10,0,0.08)] transition-transform duration-300 ease-premium hover:-translate-y-1 dark:border-white/10 dark:bg-coal dark:shadow-none"
                aria-label={`View ${project.name} in work gallery`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-black/5 dark:bg-white/5">
                  <img
                    src={project.image}
                    alt={`${project.name} case study cover`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-premium group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                </div>

                <div className="px-2 pb-3 pt-5">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-flame">
                    {project.category}
                  </p>
                  <div className="mt-2 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-bold tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-flame dark:text-white">
                        {project.name}
                      </h3>
                      <p className="mt-2 max-w-[42ch] text-[15px] leading-relaxed text-ink/60 dark:text-white/60">
                        {project.description}
                      </p>
                    </div>
                    <span
                      className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/15 text-ink transition-all duration-300 group-hover:translate-x-1 group-hover:border-flame group-hover:text-flame dark:border-white/20 dark:text-white"
                      aria-hidden="true"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <span className="mt-5 inline-flex text-sm font-medium text-flame underline-offset-4 group-hover:underline">
                    View Project
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

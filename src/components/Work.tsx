import Reveal from "./Reveal";
import MixedText from "./MixedText";
import ProjectHoverCursor from "./ProjectHoverCursor";
import { LinkButton, SectionHeader } from "./ui";
import aspireCover from "../assets/work/aspire-cover.webp";
import voicifyCover from "../assets/work/voicify-cover.webp";
import aurumCover from "../assets/work/aurum-cover.webp";
import hdCameraCover from "../assets/work/hdcamera-cover.webp";

interface Project {
  name: string;
  category: string;
  value: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    name: "Aspire",
    category: "Web & Mobile Product",
    value: "Scalable platform UI with clear creation flows.",
    image: aspireCover,
  },
  {
    name: "Voicify",
    category: "Mobile App",
    value: "Fast AI voice creation shaped for mobile.",
    image: voicifyCover,
  },
  {
    name: "Aurum",
    category: "Mobile App",
    value: "Wallet and rewards flows with cleaner hierarchy.",
    image: aurumCover,
  },
  {
    name: "HD Camera",
    category: "Mobile App",
    value: "Capture and editing screens built for speed.",
    image: hdCameraCover,
  },
];

export default function Work() {
  return (
    <section id="work" className="scroll-mt-28 bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1200px] px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
        <Reveal>
          <SectionHeader
            eyebrow="Selected work"
            title={<MixedText text="Featured product work" accent="product" />}
            description="A small set of mobile, web app, dashboard, and product UI work led by final screens."
            action={<LinkButton href="/work" variant="secondary">View all work</LinkButton>}
            titleClassName="text-[clamp(2.25rem,5vw,3.5rem)] uppercase"
            className="[border-bottom-width:0] pb-0"
          />
        </Reveal>

        <ProjectHoverCursor>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:mt-10 lg:gap-5 [&_a]:lg:cursor-none">
            {PROJECTS.map((project, i) => (
              <Reveal key={project.name} delay={i * 0.08}>
                <a
                  href="/work"
                  className="group block overflow-hidden rounded-[22px] border border-black/[0.075] bg-white/88 shadow-[0_14px_42px_rgba(20,10,0,0.055)] transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-flame/24 hover:bg-white hover:shadow-[0_20px_58px_rgba(20,10,0,0.08)] dark:border-white/10 dark:bg-[#11100f] dark:shadow-none dark:hover:border-flame/32"
                  aria-label={`View ${project.name} in work gallery`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/5 dark:bg-white/5">
                    <img
                      src={project.image}
                      alt={`${project.name} case study cover`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-premium group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-flame">
                          {project.category}
                        </p>
                        <h3 className="mt-1 font-display text-[clamp(1.45rem,3vw,1.75rem)] font-bold leading-tight tracking-normal text-ink transition-colors duration-300 group-hover:text-flame dark:text-white">
                          {project.name}
                        </h3>
                        <p className="mt-2 line-clamp-2 max-w-[34ch] text-sm font-normal leading-[1.6] text-ink/56 dark:text-white/58">
                          {project.value}
                        </p>
                      </div>
                      <span
                        className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/12 text-ink transition-all duration-300 group-hover:translate-x-1 group-hover:border-flame group-hover:bg-flame group-hover:text-white dark:border-white/15 dark:text-white"
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
                    <span className="mt-4 inline-flex text-sm font-medium text-flame underline-offset-4 group-hover:underline">
                      View Project
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </ProjectHoverCursor>
      </div>
    </section>
  );
}

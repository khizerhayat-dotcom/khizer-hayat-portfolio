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
    description: "AI creation flows for photos, videos, and templates.",
    image: aspireCover,
  },
  {
    name: "Voicify",
    category: "AI Audio App",
    description: "Voice effects, text-to-speech, and translation tooling.",
    image: voicifyCover,
  },
  {
    name: "Aurum",
    category: "Web3 Mobile App",
    description: "Wallet and rewards screens shaped around retention.",
    image: aurumCover,
  },
  {
    name: "HD Camera",
    category: "Photography App",
    description: "A compact camera and AI-assisted editing interface.",
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
            title="Featured projects"
            description="A short preview of shipped product design work across AI, mobile, utility, and web app experiences."
            action={<LinkButton href="/work" variant="secondary">View all work</LinkButton>}
            titleClassName="text-[clamp(2.25rem,5vw,3.5rem)] uppercase"
            className="[border-bottom-width:0] pb-0"
          />
        </Reveal>

        <div className="mt-7 grid gap-5 md:grid-cols-2 lg:mt-8 lg:gap-6">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.08}>
              <a
                href="/work"
                className="group block overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_16px_46px_rgba(20,10,0,0.075)] transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-flame/35 hover:shadow-[0_22px_62px_rgba(20,10,0,0.1)] dark:border-white/10 dark:bg-coal dark:shadow-none dark:hover:border-flame/40"
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

                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-flame">
                    {project.category}
                  </p>
                  <div className="mt-2.5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-[clamp(1.45rem,3vw,1.75rem)] font-bold leading-tight tracking-normal text-ink transition-colors duration-300 group-hover:text-flame dark:text-white">
                        {project.name}
                      </h3>
                      <p className="mt-2 max-w-[36ch] text-sm leading-[1.6] text-ink/58 dark:text-white/58">
                        {project.description}
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
                  <span className="mt-4 inline-flex text-sm font-semibold text-flame underline-offset-4 group-hover:underline">
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

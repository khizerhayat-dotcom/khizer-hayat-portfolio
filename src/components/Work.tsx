import Reveal from "./Reveal";
import MixedText from "./MixedText";
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
    category: "AI Platform - Web & Mobile",
    value: "Designed a scalable AI product experience from interface structure to polished screens.",
    image: aspireCover,
  },
  {
    name: "Voicify",
    category: "AI Audio - Mobile App",
    value: "Shaped fast mobile creation flows for voice effects, text-to-speech, and translation tools.",
    image: voicifyCover,
  },
  {
    name: "Aurum",
    category: "Web3 - Mobile App",
    value: "Structured wallet, rewards, and activity screens around clarity, trust, and retention.",
    image: aurumCover,
  },
  {
    name: "HD Camera",
    category: "Photography - Mobile App",
    value: "Created a compact camera and AI editing interface for quick capture-to-result workflows.",
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
            description="Image-led product work across mobile apps, AI tools, utilities, and web products."
            action={<LinkButton href="/work" variant="secondary">View all work</LinkButton>}
            titleClassName="text-[clamp(2.25rem,5vw,3.5rem)] uppercase"
            className="[border-bottom-width:0] pb-0"
          />
        </Reveal>

        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:mt-9 lg:gap-5">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.08}>
              <a
                href="/work"
                className="group block overflow-hidden rounded-[22px] border border-black/[0.075] bg-white/86 shadow-[0_16px_48px_rgba(20,10,0,0.06)] transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-flame/28 hover:bg-white hover:shadow-[0_24px_70px_rgba(20,10,0,0.09)] dark:border-white/10 dark:bg-[#11100f] dark:shadow-none dark:hover:border-flame/35"
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
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-flame">
                        {project.category}
                      </p>
                      <h3 className="font-display text-[clamp(1.45rem,3vw,1.75rem)] font-bold leading-tight tracking-normal text-ink transition-colors duration-300 group-hover:text-flame dark:text-white">
                        {project.name}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 max-w-[38ch] text-sm leading-[1.55] text-ink/56 dark:text-white/56">
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
                  <span className="mt-3 inline-flex text-sm font-semibold text-flame underline-offset-4 group-hover:underline">
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

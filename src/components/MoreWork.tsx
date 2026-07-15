import Reveal from "./Reveal";
import MixedText from "./MixedText";
import { LinkButton } from "./ui";
import aiVoiceChangerIcon from "../assets/work/ai-voice-changer.png";
import aspireIcon from "../assets/work/aspire-icon.png";
import eshaafiIcon from "../assets/work/eshaafi.png";
import goQrIcon from "../assets/work/goqr.png";
import snaptuneIcon from "../assets/work/snaptune.png";
import wallHubIcon from "../assets/work/wall-hub.png";
import zmPlayerIcon from "../assets/work/zm-player.png";

const BEHANCE_URL = "https://www.behance.net/khizerhayat8743";

interface Project {
  initials: string;
  color: string;
  name: string;
  category: string;
  tag: string;
  icon?: string;
  href?: string;
}

const PROJECTS: Project[] = [
  {
    initials: "AI",
    color: "#191919",
    name: "AI Voice Changer",
    category: "AI Audio - Mobile App",
    tag: "Live App",
    icon: aiVoiceChangerIcon,
    href: BEHANCE_URL,
  },
  {
    initials: "AS",
    color: "#1F2430",
    name: "Aspire",
    category: "AI Platform - Web & Mobile",
    tag: "Case Study",
    icon: aspireIcon,
    href: BEHANCE_URL,
  },
  {
    initials: "eS",
    color: "#0E7C7B",
    name: "eShaafi",
    category: "Healthcare - Web & Mobile",
    tag: "Product Ecosystem",
    icon: eshaafiIcon,
    href: BEHANCE_URL,
  },
  {
    initials: "ZM",
    color: "#C4291C",
    name: "ZM Player",
    category: "Mobile App",
    tag: "Live App",
    icon: zmPlayerIcon,
    href: BEHANCE_URL,
  },
  {
    initials: "Sn",
    color: "#6B3FA0",
    name: "Snaptune",
    category: "Mobile App",
    tag: "Live App",
    icon: snaptuneIcon,
    href: BEHANCE_URL,
  },
  {
    initials: "QR",
    color: "#1F2430",
    name: "GoQR",
    category: "Utility - Mobile App",
    tag: "Utility",
    icon: goQrIcon,
    href: BEHANCE_URL,
  },
  {
    initials: "WH",
    color: "#2A5C8A",
    name: "Wall Hub",
    category: "Wallpaper App",
    tag: "Live App",
    icon: wallHubIcon,
    href: BEHANCE_URL,
  },
];

export default function MoreWork({ preview = false }: { preview?: boolean }) {
  return (
    <section className="bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1200px] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
        <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame">Proof wall</p>
            <h2 className="mt-3 max-w-[18ch] font-display text-[clamp(2rem,4.6vw,3.15rem)] font-bold leading-[1.03] tracking-normal text-ink dark:text-white">
              <MixedText text="More shipped products" accent="shipped" />
            </h2>
          </div>
          {preview && (
            <LinkButton href="/work" variant="text" className="group gap-1.5">
              Explore all work
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                -&gt;
              </span>
            </LinkButton>
          )}
        </Reveal>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.04}>
              <a
                href={project.href ?? BEHANCE_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative flex h-full min-h-[132px] flex-col overflow-hidden rounded-[20px] border border-black/[0.075] bg-[#fbf7f1]/72 p-4 shadow-[0_10px_32px_rgba(20,10,0,0.04)] transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-flame/24 hover:bg-white/90 dark:border-white/10 dark:bg-[#11100f] dark:shadow-none dark:hover:border-flame/32 dark:hover:bg-[#15120f] sm:p-5"
                aria-label={`View ${project.name} on Behance`}
              >
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[15px] border border-black/[0.06] bg-white text-xs font-bold text-white shadow-[0_8px_20px_rgba(20,10,0,0.06)] ring-1 ring-white/70 transition-transform duration-300 group-hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/[0.07] dark:shadow-none dark:ring-white/5"
                      style={{ backgroundColor: project.icon ? undefined : project.color }}
                      aria-hidden="true"
                    >
                      {project.icon ? (
                        <img src={project.icon} alt="" loading="lazy" className="h-full w-full object-cover" />
                      ) : (
                        project.initials
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-bold leading-tight tracking-normal text-ink transition-colors duration-300 group-hover:text-flame dark:text-white">
                        {project.name}
                      </h3>
                      <p className="mt-1.5 text-sm leading-[1.45] text-ink/58 dark:text-white/58">
                        {project.category}
                      </p>
                    </div>
                  </div>

                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-white/50 text-ink/42 transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-flame/40 group-hover:bg-flame/[0.08] group-hover:text-flame dark:border-white/10 dark:bg-white/[0.045] dark:text-white/42">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 8H12M12 8L8.75 4.75M12 8L8.75 11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>

                <div className="relative mt-auto pt-4">
                  <span className="inline-flex rounded-full border border-black/[0.07] bg-white/62 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/58 transition-colors duration-300 group-hover:border-flame/20 group-hover:bg-flame/[0.055] group-hover:text-ink/70 dark:border-white/10 dark:bg-white/[0.055] dark:text-white/66 dark:group-hover:border-flame/30 dark:group-hover:bg-flame/[0.09] dark:group-hover:text-white">
                    {project.tag}
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

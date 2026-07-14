import Reveal from "./Reveal";
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
  status: string;
  description: string;
  icon?: string;
  href?: string;
}

const PROJECTS: Project[] = [
  {
    initials: "AI",
    color: "#191919",
    name: "AI Voice Changer",
    category: "AI Audio - Mobile App",
    status: "Shipped product",
    description:
      "Voice effects, audio transformation, and creator-friendly tooling built around fast mobile workflows.",
    icon: aiVoiceChangerIcon,
    href: BEHANCE_URL,
  },
  {
    initials: "AS",
    color: "#1F2430",
    name: "Aspire",
    category: "AI Platform - Web & Mobile",
    status: "Featured case study",
    description:
      "An AI-powered platform for generating photos, videos, and creative templates designed to make creative tools feel simple and accessible.",
    icon: aspireIcon,
    href: BEHANCE_URL,
  },
  {
    initials: "eS",
    color: "#0E7C7B",
    name: "eShaafi",
    category: "Healthcare - Web & Mobile - Dashboard",
    status: "Product ecosystem",
    description:
      "A full-scale healthcare platform offering 24/7 doctor consultations, mental health support, lab bookings, and medicine delivery across the marketing website, patient app, and admin dashboard.",
    icon: eshaafiIcon,
    href: BEHANCE_URL,
  },
  {
    initials: "ZM",
    color: "#C4291C",
    name: "ZM Player",
    category: "Mobile App - 1M+ downloads",
    status: "Live mobile app",
    description:
      "An all-in-one media app covering HD video playback, downloading, a music player, and a video cutter built for fast performance and clean navigation.",
    icon: zmPlayerIcon,
    href: BEHANCE_URL,
  },
  {
    initials: "Sn",
    color: "#6B3FA0",
    name: "Snaptune",
    category: "Mobile App - 5M+ downloads",
    status: "Live mobile app",
    description:
      "An AI-powered photo editor covering editing, collage-making, background removal, and social templates built to make powerful tools feel simple.",
    icon: snaptuneIcon,
    href: BEHANCE_URL,
  },
  {
    initials: "QR",
    color: "#1F2430",
    name: "GoQR",
    category: "Utility - Mobile App",
    status: "Shipped utility",
    description:
      "A QR and document scanner designed around a single goal: get users to their result in as few taps as possible.",
    icon: goQrIcon,
    href: BEHANCE_URL,
  },
  {
    initials: "WH",
    color: "#2A5C8A",
    name: "Wall Hub",
    category: "Mobile App - 1M+ downloads",
    status: "Live mobile app",
    description:
      "A live wallpaper and HD video background app with thousands of 4K themes across nature, fantasy, and AI.",
    icon: wallHubIcon,
    href: BEHANCE_URL,
  },
];

export default function MoreWork({ preview = false }: { preview?: boolean }) {
  const visibleProjects = preview ? PROJECTS.slice(0, 4) : PROJECTS;

  return (
    <section className="bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-flame">More work</p>
          <h2 className="mt-5 max-w-[22ch] font-display text-4xl font-bold leading-[1.05] tracking-[-0.01em] text-ink dark:text-white sm:text-5xl uppercase">
            More shipped products
          </h2>
          {preview && (
            <LinkButton href="/work" variant="text" className="mt-6">
              Explore All Work
            </LinkButton>
          )}
        </Reveal>

        <div className="mt-12 divide-y divide-black/10 border-t border-black/10 sm:mt-14 dark:divide-white/10 dark:border-white/10">
          {visibleProjects.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.05}>
              <a
                href={project.href ?? BEHANCE_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:gap-8"
                aria-label={`View ${project.name} on Behance`}
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: project.color }}
                  aria-hidden="true"
                >
                  {project.icon ? (
                    <img
                      src={project.icon}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    project.initials
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-flame dark:text-white">
                      {project.name}
                    </h3>
                    <span className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-ink/55 dark:bg-white/10 dark:text-white/55">
                      {project.status}
                    </span>
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink/45 dark:text-white/45">
                      {project.category}
                    </p>
                  </div>
                  <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-ink/60 dark:text-white/55">
                    {project.description}
                  </p>
                </div>

                <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-flame underline-offset-4 group-hover:underline">
                  View
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

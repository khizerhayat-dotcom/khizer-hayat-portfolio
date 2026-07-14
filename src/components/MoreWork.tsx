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
  const visibleProjects = preview ? PROJECTS.slice(0, 6) : PROJECTS;

  return (
    <section className="bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1200px] px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
        <Reveal className="flex flex-col justify-between gap-5 border-b border-black/10 pb-6 dark:border-white/10 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame">Proof wall</p>
            <h2 className="mt-3 max-w-[18ch] font-display text-[clamp(2.1rem,5vw,3.4rem)] font-bold leading-[1.02] tracking-normal text-ink dark:text-white">
              More shipped products
            </h2>
          </div>
          <div className="max-w-[38ch]">
            <p className="text-sm leading-[1.65] text-ink/60 dark:text-white/60">
              A quick scan of live apps, product systems, and utility experiences designed for real users.
            </p>
            {preview && (
              <LinkButton href="/work" variant="text" className="mt-4">
                Explore all work
              </LinkButton>
            )}
          </div>
        </Reveal>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.05}>
              <a
                href={project.href ?? BEHANCE_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full items-start gap-3 rounded-[18px] border border-black/10 bg-white p-4 shadow-[0_12px_34px_rgba(20,10,0,0.055)] transition-all duration-300 hover:-translate-y-0.5 hover:border-flame/35 hover:shadow-[0_16px_44px_rgba(20,10,0,0.08)] dark:border-white/10 dark:bg-coal dark:shadow-none dark:hover:border-flame/40"
                aria-label={`View ${project.name} on Behance`}
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
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

                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-bold leading-tight tracking-normal text-ink transition-colors duration-300 group-hover:text-flame dark:text-white">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-flame/85">
                    {project.status}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm leading-[1.55] text-ink/55 dark:text-white/55">
                    {project.category}
                  </p>
                </div>

                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 text-flame transition-all duration-300 group-hover:border-flame group-hover:bg-flame group-hover:text-white dark:border-white/10">
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

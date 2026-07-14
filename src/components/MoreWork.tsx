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
  tags: string[];
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
    tags: ["Live App", "AI Platform"],
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
    tags: ["Case Study", "AI Platform"],
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
    tags: ["Healthcare", "System"],
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
    tags: ["Live App", "Utility"],
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
    tags: ["Live App", "Editor"],
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
    tags: ["Utility", "Scanner"],
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
    tags: ["Live App", "Utility"],
    icon: wallHubIcon,
    href: BEHANCE_URL,
  },
];

export default function MoreWork({ preview = false }: { preview?: boolean }) {
  const visibleProjects = PROJECTS;

  return (
    <section className="bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1200px] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
        <Reveal className="flex flex-col justify-between gap-5 pb-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame">Proof wall</p>
            <h2 className="mt-3 max-w-[18ch] font-display text-[clamp(2rem,4.6vw,3.15rem)] font-bold leading-[1.03] tracking-normal text-ink dark:text-white">
              More shipped products
            </h2>
          </div>
          <div className="max-w-[40ch]">
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

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.05}>
              <a
                href={project.href ?? BEHANCE_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full min-h-[168px] flex-col rounded-[18px] border border-black/[0.08] bg-white p-4 shadow-[0_10px_28px_rgba(20,10,0,0.045)] transition-all duration-300 hover:-translate-y-0.5 hover:border-flame/28 hover:bg-[#fffdfa] hover:shadow-[0_14px_34px_rgba(20,10,0,0.06)] dark:border-white/10 dark:bg-[#11100f] dark:shadow-none dark:hover:border-flame/32 dark:hover:bg-[#14110f]"
                aria-label={`View ${project.name} on Behance`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[13px] border border-black/[0.06] bg-[#f7f5f1] text-xs font-bold text-white ring-1 ring-white/50 dark:border-white/10 dark:bg-white/[0.055] dark:ring-white/5"
                      style={{ backgroundColor: project.icon ? undefined : project.color }}
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

                    <div className="min-w-0">
                      <h3 className="truncate font-display text-lg font-bold leading-tight tracking-normal text-ink transition-colors duration-300 group-hover:text-flame dark:text-white">
                        {project.name}
                      </h3>
                      <p className="mt-1 truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/42 dark:text-white/42">
                        {project.status}
                      </p>
                    </div>
                  </div>

                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-ink/36 transition-colors duration-300 group-hover:text-flame dark:text-white/36 dark:group-hover:text-flame">
                    View
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <path
                        d="M4 8H12M12 8L8.75 4.75M12 8L8.75 11.25"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                <div className="mt-4 flex flex-1 flex-col justify-between">
                  <p className="line-clamp-2 text-sm leading-[1.55] text-ink/58 dark:text-white/58">
                    {project.category}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-black/[0.07] bg-[#faf8f4] px-2.5 py-1 text-[11px] font-semibold text-ink/60 transition-colors duration-300 group-hover:border-flame/20 group-hover:bg-flame/[0.045] dark:border-white/10 dark:bg-white/[0.045] dark:text-white/70 dark:group-hover:border-flame/30 dark:group-hover:bg-flame/[0.09] dark:group-hover:text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

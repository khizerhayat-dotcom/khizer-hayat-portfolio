import Reveal from "./Reveal";
import behanceIcon from "../assets/icons/behance.svg";
import downloadIcon from "../assets/icons/download.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import mailIcon from "../assets/icons/mail.svg";

const QUICK_LINKS = [
  { label: "Email", href: "mailto:khizer8743@gmail.com", icon: mailIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/khizerdesigner/", icon: linkedinIcon },
  { label: "Behance", href: "https://www.behance.net/khizerhayat8743", icon: behanceIcon },
  { label: "Download CV", href: "/khizer-hayat-cv.pdf", icon: downloadIcon, download: true },
];

export default function CTA() {
  return (
    <section id="contact" className="scroll-mt-28 bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1240px] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_22px_70px_rgba(20,10,0,0.08)] transition-colors duration-300 dark:border-white/10 dark:bg-coal dark:shadow-none">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(244,98,10,0.14),transparent_34%),linear-gradient(135deg,rgba(244,98,10,0.08),transparent_44%)] dark:bg-[radial-gradient(circle_at_18%_0%,rgba(244,98,10,0.2),transparent_34%),linear-gradient(135deg,rgba(244,98,10,0.12),transparent_44%)]" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(10,4,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(10,4,0,0.07) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />

            <div className="relative grid gap-7 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center lg:p-10 xl:grid-cols-[minmax(0,1fr)_400px]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame sm:text-sm">Contact</p>
                <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(2rem,5vw,3.9rem)] font-bold leading-[1.02] tracking-normal text-ink dark:text-white">
                  Need a UI/UX designer who can ship polished product screens?
                </h2>
                <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.65] text-ink/65 dark:text-white/65">
                  I&apos;m open to UI/UX roles, mobile app design projects, redesigns, design systems, prototypes, and developer-ready handoff.
                </p>
              </div>

              <div className="rounded-[22px] border border-black/10 bg-paper/78 p-4 shadow-[0_16px_42px_rgba(20,10,0,0.06)] backdrop-blur-sm dark:border-white/10 dark:bg-ink/58 dark:shadow-none sm:p-5">
                <a
                  href="/contact"
                  className="group flex min-h-12 items-center justify-between gap-4 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame active:translate-y-0 dark:bg-white dark:text-black dark:hover:bg-flame dark:hover:text-white"
                >
                  <span>Open Contact Page</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.12] text-white transition-transform duration-200 group-hover:translate-x-0.5 dark:bg-black/[0.08] dark:text-black dark:group-hover:text-white">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>

                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  {QUICK_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      download={link.download ? true : undefined}
                      className="group flex min-h-12 items-center gap-3 rounded-[16px] border border-black/10 bg-white px-3 py-3 text-sm font-semibold text-ink/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-flame/35 hover:bg-flame/[0.06] hover:text-ink active:translate-y-0 dark:border-white/10 dark:bg-white/[0.055] dark:text-white/70 dark:hover:border-flame/40 dark:hover:bg-flame/[0.1] dark:hover:text-white"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-flame/[0.1] transition-colors duration-200 group-hover:bg-flame">
                        <img
                          src={link.icon}
                          alt=""
                          className="h-4 w-4 transition duration-200 group-hover:brightness-0 group-hover:invert dark:invert"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0 truncate">{link.label}</span>
                    </a>
                  ))}
                </div>

                <p className="mt-4 text-xs leading-relaxed text-ink/45 dark:text-white/45">
                  Usually available for product design, redesign, and handoff-focused work.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

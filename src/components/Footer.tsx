import behanceIcon from "../assets/icons/behance.svg";
import downloadIcon from "../assets/icons/download.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import mailIcon from "../assets/icons/mail.svg";

const SITEMAP = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
];

const CONTACT = [
  { label: "Email", href: "mailto:khizer8743@gmail.com", icon: mailIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/khizerdesigner/", icon: linkedinIcon },
  { label: "Behance", href: "https://www.behance.net/khizerhayat8743", icon: behanceIcon },
  { label: "Download CV", href: "/khizer-hayat-cv.pdf", icon: downloadIcon, download: true },
] satisfies Array<{
  label: string;
  href: string;
  icon: string;
  download?: boolean;
}>;

export default function Footer() {
  return (
    <footer className="bg-paper text-ink/60 transition-colors duration-300 dark:bg-ink dark:text-white/60">
      <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-14 sm:px-10 sm:pt-20 lg:px-16">
        <div className="rounded-[28px] border border-black/10 bg-white/55 px-5 py-8 shadow-[0_24px_80px_rgba(20,10,0,0.06)] transition-colors duration-300 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none sm:px-7 sm:py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-flame">Let&apos;s connect.</p>
              <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-ink/65 dark:text-white/65">
                I&apos;m open to UI/UX roles, mobile app projects, redesigns, design systems, prototypes, and developer handoff.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {CONTACT.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  download={item.download ? true : undefined}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-paper/80 px-4 py-2 text-sm font-semibold text-ink/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-flame hover:bg-white hover:text-flame active:translate-y-0 dark:border-white/10 dark:bg-coal/80 dark:text-white/70 dark:hover:border-flame dark:hover:bg-coal dark:hover:text-flame"
                >
                  <img src={item.icon} alt="" className="h-4 w-4 shrink-0 dark:invert" aria-hidden="true" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <h2
            className="select-none py-8 text-center font-display font-semibold leading-[0.88] tracking-normal text-ink [text-shadow:0_12px_34px_rgba(20,10,0,0.08)] dark:text-white dark:[text-shadow:0_18px_50px_rgba(0,0,0,0.35)] sm:whitespace-nowrap lg:py-10"
            style={{ fontSize: "clamp(56px, 12.4vw, 188px)" }}
          >
            Khizer Hayat
          </h2>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
            <div className="max-w-[48ch]">
              <a
                href="/"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-paper shadow-[0_8px_24px_rgba(20,10,0,0.12)] transition-colors duration-300 dark:bg-white dark:shadow-none"
                aria-label="Home"
              >
                <svg width="18" height="16" viewBox="0 0 20 18" aria-hidden="true">
                  <path d="M0 0H4V7.2L9.6 0H14.4L7.6 8.6L14.8 18H10L4 10.2V18H0V0Z" fill="#0A0400" />
                  <path d="M16 0H20V7.4H16V0Z" fill="#0A0400" />
                  <path d="M16 10.6H20V18H16V10.6Z" fill="#0A0400" />
                  <path d="M13.4 7.4H20L16.2 10.6H9.6L13.4 7.4Z" fill="#F4620A" />
                </svg>
              </a>
              <p className="mt-5 text-sm leading-relaxed text-ink/60 dark:text-white/60">
                UI/UX designer for mobile apps, dashboards, AI products, healthcare platforms, and scalable design systems.
              </p>
            </div>

            <nav aria-label="Footer" className="lg:justify-self-end">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-flame">Navigate</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-7 gap-y-3 text-sm sm:flex sm:flex-wrap lg:grid lg:grid-cols-1">
                {SITEMAP.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="transition-colors duration-200 hover:text-ink dark:hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-8 flex flex-col gap-3 text-xs font-medium uppercase tracking-[0.14em] text-ink/45 dark:text-white/45 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <p>© 2026 Khizer Hayat</p>
            <p>Built with care</p>
            <p>40+ Products Shipped · 10M+ App Downloads</p>
          </div>
        </div>
      </div>
    </footer>
  );
}



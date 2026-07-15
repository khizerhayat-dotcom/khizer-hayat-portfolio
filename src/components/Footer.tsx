import { LinkButton } from "./ui";

const SITEMAP = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
];

const WORDMARK = "Khizer Hayat";

function FooterWordmark() {
  return (
    <h2
      className="footer-wordmark group/wordmark flex select-none flex-wrap justify-center gap-x-[0.08em] py-5 text-center font-display font-semibold leading-[0.9] tracking-normal transition-colors duration-300 sm:flex-nowrap lg:py-7"
      style={{ fontSize: "clamp(3rem, 10vw, 9.25rem)" }}
      aria-label={WORDMARK}
    >
      {WORDMARK.split("").map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          aria-hidden="true"
          className={
            letter === " "
              ? "w-[0.18em]"
              : "inline-block transition-transform duration-300 ease-premium motion-reduce:transform-none md:group-hover/wordmark:-translate-y-1"
          }
          style={{ transitionDelay: `${index * 16}ms` }}
        >
          {letter}
        </span>
      ))}
    </h2>
  );
}

export default function Footer() {
  return (
    <footer className="bg-paper text-ink/60 transition-colors duration-300 dark:bg-ink dark:text-white/60">
      <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-8 sm:px-10 sm:pb-24 sm:pt-10 lg:px-16 lg:pb-12 lg:pr-24 xl:pr-28">
        <div className="rounded-[24px] border border-black/[0.08] bg-[#fffdf9]/74 px-5 py-6 shadow-[0_16px_50px_rgba(20,10,0,0.045)] transition-colors duration-300 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none sm:px-7 sm:py-8 lg:px-9">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame">Let&apos;s connect.</p>
              <p className="mt-3 max-w-[46ch] text-sm leading-[1.6] text-ink/66 dark:text-white/66">
                UI/UX designer in Lahore, Pakistan. Mobile apps, redesigns, systems, prototypes, and handoff.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              <LinkButton href="/contact">Contact Khizer</LinkButton>
            </div>
          </div>

          <FooterWordmark />

          <div className="grid gap-6 border-t border-black/[0.08] pt-6 dark:border-white/10 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
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
              <p className="mt-4 text-sm font-semibold leading-[1.6] text-ink/68 dark:text-white/70">
                40+ Products Shipped <span className="text-flame">·</span> 10M+ App Downloads
              </p>
            </div>

            <nav aria-label="Footer" className="lg:justify-self-end">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-flame dark:text-flame">Navigate</p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm lg:grid lg:grid-cols-1 lg:gap-y-2.5">
                {SITEMAP.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="font-semibold text-ink/76 transition-colors duration-200 hover:text-flame dark:text-white/78 dark:hover:text-flame">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-7 flex flex-col gap-3 text-xs font-medium uppercase tracking-[0.14em] text-ink/48 dark:text-white/48 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <p>(c) 2026 Khizer Hayat</p>
            <p>Built with care</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

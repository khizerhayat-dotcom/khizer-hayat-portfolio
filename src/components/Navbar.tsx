import { motion } from "framer-motion";
import { useState } from "react";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
];

const container = {
  hidden: { opacity: 0, y: -16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      variants={container}
      initial="hidden"
      animate="show"
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6 lg:top-[4.9%]"
    >
      <nav
        aria-label="Primary"
        className="relative flex w-full max-w-[570px] items-center justify-between gap-2 rounded-full border border-black/10 bg-white/85 py-2 pl-2 pr-2 text-ink shadow-[0_8px_30px_rgba(20,10,0,0.12)] backdrop-blur-md transition-colors duration-300 dark:border-white/10 dark:bg-ink/75 dark:text-white dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)] sm:gap-3 sm:pl-3"
      >
        <a
          href="/"
          className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white sm:h-[38px] sm:w-[38px]"
          aria-label="Home"
        >
          <svg width="20" height="18" viewBox="0 0 20 18" aria-hidden="true">
            <path d="M0 0H4V7.2L9.6 0H14.4L7.6 8.6L14.8 18H10L4 10.2V18H0V0Z" fill="#0A0400" />
            <path d="M16 0H20V7.4H16V0Z" fill="#0A0400" />
            <path d="M16 10.6H20V18H16V10.6Z" fill="#0A0400" />
            <path d="M13.4 7.4H20L16.2 10.6H9.6L13.4 7.4Z" fill="#F4620A" />
          </svg>
        </a>

        <ul className="hidden items-center gap-3 text-sm text-ink/75 dark:text-white/85 md:flex lg:gap-4">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="transition-colors duration-200 hover:text-ink dark:hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/[0.04] text-ink transition-colors duration-200 hover:bg-black/[0.08] dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {isMenuOpen ? (
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M5 7H19M5 12H19M5 17H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>

        <a
          href="/contact"
          className="shrink-0 rounded-full bg-ink px-4 py-2 text-xs font-medium text-white transition-transform duration-200 ease-premium hover:scale-[1.04] active:scale-[0.98] dark:bg-white dark:text-black sm:px-5 sm:py-[9px] sm:text-sm"
        >
          Get in Touch
        </a>

        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+10px)] rounded-2xl border border-black/10 bg-white/95 p-3 shadow-[0_18px_60px_rgba(20,10,0,0.16)] backdrop-blur-md dark:border-white/10 dark:bg-ink/95 md:hidden">
            <ul className="grid gap-1 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 font-medium text-ink/75 transition-colors duration-200 hover:bg-black/[0.04] hover:text-ink dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </motion.header>
  );
}

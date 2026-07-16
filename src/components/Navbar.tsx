import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

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

function LogoMark() {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" aria-hidden="true">
      <path d="M0 0H4V7.2L9.6 0H14.4L7.6 8.6L14.8 18H10L4 10.2V18H0V0Z" fill="#0A0400" />
      <path d="M16 0H20V7.4H16V0Z" fill="#0A0400" />
      <path d="M16 10.6H20V18H16V10.6Z" fill="#0A0400" />
      <path d="M13.4 7.4H20L16.2 10.6H9.6L13.4 7.4Z" fill="#F4620A" />
    </svg>
  );
}

interface NavbarProps {
  currentPath: string;
}

export default function Navbar({ currentPath }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isScrollingDown = scrollY > lastScrollY.current;

      setIsScrolled(scrollY > 12);
      setIsCompact(scrollY > 90 && isScrollingDown);
      lastScrollY.current = scrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const isActivePath = (href: string) => currentPath === href;
  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (currentPath !== "/") return;

    event.preventDefault();
    setIsMenuOpen(false);

    if (window.scrollY > 80) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.location.reload();
  };

  return (
    <motion.header
      variants={container}
      initial="hidden"
      animate="show"
      className={`fixed inset-x-0 z-[100] flex justify-center px-3 transition-[top,transform] duration-300 ease-premium sm:px-4 ${
        isCompact ? "top-2 sm:top-3 lg:top-4" : "top-3 sm:top-5 lg:top-6"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`relative flex w-full max-w-[570px] items-center justify-between gap-2 rounded-full border text-ink backdrop-blur-xl transition-all duration-300 dark:text-white sm:gap-3 sm:pl-3 ${
          isCompact ? "py-1.5 pl-1.5 pr-1.5 sm:scale-[0.97]" : "py-2 pl-2 pr-2"
        } ${
          isScrolled
            ? "border-black/10 bg-white/80 shadow-[0_14px_45px_rgba(20,10,0,0.14)] dark:border-white/10 dark:bg-ink/75 dark:shadow-[0_14px_45px_rgba(0,0,0,0.32)]"
            : "border-black/10 bg-white/90 shadow-[0_8px_30px_rgba(20,10,0,0.10)] dark:border-white/10 dark:bg-ink/80 dark:shadow-[0_8px_30px_rgba(0,0,0,0.22)]"
        }`}
      >
        <a
          href="/"
          onClick={handleLogoClick}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] sm:h-[38px] sm:w-[38px]"
          aria-label="Home"
        >
          <LogoMark />
        </a>

        <ul className="hidden items-center gap-1 text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                aria-current={isActivePath(link.href) ? "page" : undefined}
                className={`rounded-full px-3 py-2 transition-all duration-200 ${
                  isActivePath(link.href)
                    ? "bg-flame/10 text-flame dark:bg-flame/20 dark:!text-flame"
                    : "text-ink/70 hover:bg-black/[0.04] hover:text-ink dark:!text-white/80 dark:hover:bg-white/10 dark:hover:!text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/[0.04] text-ink transition-colors duration-200 hover:bg-black/[0.08] dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 md:hidden"
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
          className="hidden shrink-0 rounded-full bg-ink px-5 py-[9px] text-sm font-medium text-white transition-transform duration-200 ease-premium hover:scale-[1.04] active:scale-[0.98] dark:bg-white dark:text-black md:inline-flex"
        >
          Get in Touch
        </a>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Close menu backdrop"
                className="fixed inset-0 z-[80] cursor-default bg-black/20 backdrop-blur-[2px] dark:bg-black/50 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                onClick={() => setIsMenuOpen(false)}
              />

              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                initial={{ opacity: 0, y: -14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-3 right-3 top-3 z-[90] max-h-[calc(100svh-24px)] overflow-y-auto overscroll-contain rounded-[24px] border border-black/10 bg-[#fffaf4]/[0.98] p-3 text-ink shadow-[0_24px_80px_rgba(20,10,0,0.26)] backdrop-blur-2xl dark:border-white/[0.12] dark:bg-[#100d0b]/[0.98] dark:text-white dark:shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:left-4 sm:right-4 sm:top-4 md:hidden"
              >
                <div className="flex items-center justify-between gap-3">
                  <a
                    href="/"
                    onClick={handleLogoClick}
                    className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_10px_26px_rgba(20,10,0,0.10)] transition-transform duration-200 active:scale-[0.97]"
                    aria-label="Home"
                  >
                    <LogoMark />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/[0.05] text-ink transition-colors duration-200 active:bg-black/[0.09] dark:border-white/[0.12] dark:bg-white/10 dark:text-white dark:active:bg-white/[0.16]"
                    aria-label="Close menu"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <ul className="mt-5 grid gap-2 text-base">
                  {NAV_LINKS.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        aria-current={isActivePath(link.href) ? "page" : undefined}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex min-h-12 items-center rounded-2xl px-4 font-semibold transition-colors duration-200 ${
                          isActivePath(link.href)
                            ? "bg-flame/[0.12] text-flame dark:bg-flame/20 dark:!text-flame"
                            : "text-ink/[0.86] hover:bg-black/[0.05] hover:text-ink dark:!text-white/[0.88] dark:hover:bg-white/10 dark:hover:!text-white"
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                  <li className="pt-2">
                    <a
                      href="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex min-h-12 items-center justify-center rounded-2xl bg-ink px-4 font-semibold text-white shadow-[0_14px_34px_rgba(20,10,0,0.18)] transition-transform duration-200 active:scale-[0.98] dark:bg-white dark:text-black dark:shadow-[0_14px_34px_rgba(0,0,0,0.35)]"
                    >
                      Get in Touch
                    </a>
                  </li>
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

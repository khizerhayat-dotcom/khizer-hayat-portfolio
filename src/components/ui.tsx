import { motion } from "framer-motion";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import behanceIcon from "../assets/icons/behance.svg";
import downloadIcon from "../assets/icons/download.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import mailIcon from "../assets/icons/mail.svg";

const CONTACT_LINKS = [
  { label: "Email", href: "/contact", icon: mailIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/khizerdesigner/", icon: linkedinIcon },
  { label: "Behance", href: "https://www.behance.net/khizerhayat8743", icon: behanceIcon },
  { label: "Download CV", href: "/khizer-hayat-cv.pdf", icon: downloadIcon, download: true },
] satisfies Array<{
  label: string;
  href: string;
  icon: string;
  download?: boolean;
}>;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
  titleClassName,
  titleAs = "h2",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
  titleClassName?: string;
  titleAs?: "h1" | "h2";
}) {
  const TitleTag = titleAs;

  return (
    <div className={cn("flex flex-col justify-between gap-4 md:flex-row md:items-end", className)}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-flame">{eyebrow}</p>
        <TitleTag className={cn("mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.04] tracking-normal text-ink dark:text-white", titleClassName)}>
          {title}
        </TitleTag>
      </div>
      {(description || action) && (
        <div className="max-w-[40ch]">
          {description && <p className="text-[15px] font-normal leading-[1.7] text-ink/56 dark:text-white/58">{description}</p>}
          {action && <div className="mt-4">{action}</div>}
        </div>
      )}
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[22px] border border-black/[0.075] bg-white shadow-[0_14px_44px_rgba(20,10,0,0.055)] transition-colors duration-300 dark:border-white/10 dark:bg-coal dark:shadow-none",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PremiumCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[22px] border border-black/[0.075] bg-white/88 shadow-[0_12px_38px_rgba(20,10,0,0.05)] transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-flame/24 hover:bg-white hover:shadow-[0_18px_54px_rgba(20,10,0,0.075)] dark:border-white/10 dark:bg-[#11100f] dark:shadow-none dark:hover:border-flame/32 dark:hover:bg-[#15120f]",
        className,
      )}
    >
      {children}
    </div>
  );
}

type LinkButtonVariant = "primary" | "secondary" | "text";

export function LinkButton({
  children,
  variant = "primary",
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: LinkButtonVariant;
}) {
  const base = "inline-flex min-h-11 items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ease-premium active:scale-[0.98]";
  const variants: Record<LinkButtonVariant, string> = {
    primary: "bg-ink px-6 py-3 text-white hover:-translate-y-0.5 dark:bg-white dark:text-black",
    secondary: "border border-black/10 bg-white px-5 py-3 text-ink hover:-translate-y-0.5 hover:border-flame hover:text-flame dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-flame dark:hover:text-flame",
    text: "min-h-0 rounded-none p-0 text-flame underline-offset-4 hover:underline",
  };

  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}

export function CTAButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
}) {
  return (
    <button
      className={cn(
        "inline-flex min-h-14 items-center justify-center rounded-full bg-accent px-6 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(216,72,15,0.24)] transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:bg-flame active:translate-y-0 disabled:cursor-wait disabled:opacity-70",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ContactLinks({
  links = CONTACT_LINKS,
  variant = "neutral",
  className,
}: {
  links?: typeof CONTACT_LINKS;
  variant?: "neutral" | "darkPanel" | "footer" | "compact";
  className?: string;
}) {
  if (variant === "compact") {
    return (
      <div className={cn("grid grid-cols-4 gap-3", className)}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            download={link.download ? true : undefined}
            aria-label={link.label}
            title={link.label}
            className="group flex min-w-0 flex-col items-center gap-2 text-center text-[11px] font-medium text-ink/52 transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:text-ink active:translate-y-0 dark:text-white/56 dark:hover:text-white"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e2d5c8] bg-white/60 shadow-[0_10px_28px_rgba(70,38,18,0.045)] backdrop-blur-sm transition-all duration-200 group-hover:border-flame/34 group-hover:bg-white group-hover:shadow-[0_14px_34px_rgba(216,72,15,0.12)] dark:border-white/[0.09] dark:bg-white/[0.045] dark:shadow-none dark:group-hover:border-flame/40 dark:group-hover:bg-white/[0.075]">
              <img src={link.icon} alt="" className="h-4 w-4 opacity-75 transition duration-200 group-hover:opacity-90 dark:invert dark:opacity-85 dark:group-hover:opacity-100" aria-hidden="true" />
            </span>
            <span className="truncate leading-none">{link.label}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
          download={link.download ? true : undefined}
          className={cn(
            "group inline-flex items-center text-sm font-medium transition-all duration-200 ease-premium hover:-translate-y-0.5 active:translate-y-0",
            variant === "darkPanel"
              ? "min-h-14 justify-center gap-3 rounded-full border border-white/18 bg-white/10 px-5 py-3 text-white backdrop-blur-sm hover:border-white/35 hover:bg-white/18"
              : variant === "footer"
                ? "min-h-14 justify-center gap-3 rounded-full border border-black/10 bg-paper/80 px-5 py-3 text-ink/70 hover:border-flame hover:bg-flame hover:text-white dark:border-white/10 dark:bg-coal/80 dark:text-white/70 dark:hover:border-flame dark:hover:bg-flame dark:hover:text-white"
                : "min-h-14 justify-center gap-3 rounded-full border border-black/10 bg-paper px-5 py-3 text-ink hover:border-flame hover:bg-flame hover:text-white dark:border-white/10 dark:bg-ink dark:text-white dark:hover:border-flame dark:hover:bg-flame dark:hover:text-white",
          )}
        >
          <img
            src={link.icon}
            alt=""
            className={cn("h-4 w-4 shrink-0 transition duration-200", variant === "darkPanel" ? "invert" : "group-hover:invert dark:invert")}
            aria-hidden="true"
          />
          {link.label}
        </a>
      ))}
    </div>
  );
}

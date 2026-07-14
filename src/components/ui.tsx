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
    <div className={cn("flex flex-col justify-between gap-6 border-b border-black/10 pb-8 dark:border-white/10 md:flex-row md:items-end", className)}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame sm:text-sm">{eyebrow}</p>
        <TitleTag className={cn("mt-4 font-display text-4xl font-bold leading-[0.98] tracking-normal text-ink dark:text-white sm:text-5xl", titleClassName)}>
          {title}
        </TitleTag>
      </div>
      {(description || action) && (
        <div className="max-w-[42ch]">
          {description && <p className="text-[15px] leading-relaxed text-ink/60 dark:text-white/60 sm:text-base">{description}</p>}
          {action && <div className="mt-5">{action}</div>}
        </div>
      )}
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-black/10 bg-white shadow-[0_18px_55px_rgba(20,10,0,0.07)] transition-colors duration-300 dark:border-white/10 dark:bg-coal dark:shadow-none",
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
  const base = "inline-flex min-h-11 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 ease-premium active:scale-[0.98]";
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
  variant?: "neutral" | "darkPanel" | "footer";
  className?: string;
}) {
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
            "group inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0",
            variant === "darkPanel"
              ? "border border-white/18 bg-white/10 text-white backdrop-blur-sm hover:border-white/35 hover:bg-white/18"
              : variant === "footer"
                ? "border border-black/10 bg-paper/80 text-ink/70 hover:border-flame hover:bg-flame hover:text-white dark:border-white/10 dark:bg-coal/80 dark:text-white/70 dark:hover:border-flame dark:hover:bg-flame dark:hover:text-white"
                : "border border-black/10 bg-paper text-ink hover:border-flame hover:bg-flame hover:text-white dark:border-white/10 dark:bg-ink dark:text-white dark:hover:border-flame dark:hover:bg-flame dark:hover:text-white",
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

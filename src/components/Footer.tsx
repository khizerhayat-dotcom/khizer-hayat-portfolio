import { LinkButton } from "./ui";
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

const WORDMARK = "Khizer Hayat";

const SOCIAL_LINKS = [
  { label: "Email", href: "/contact", icon: mailIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/khizerdesigner/", icon: linkedinIcon },
  { label: "Behance", href: "https://www.behance.net/khizerhayat8743", icon: behanceIcon },
  { label: "Download CV", href: "/khizer-hayat-cv.pdf", icon: downloadIcon, download: true },
];

function FooterWordmark() {
  return (
    <h2
      className="group/wordmark flex select-none flex-wrap justify-center gap-x-[0.08em] py-5 text-center font-display font-semibold leading-[0.9] tracking-normal text-white/18 transition-colors duration-300 hover:text-white/28 sm:flex-nowrap lg:py-7"
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
    <footer className="bg-[#090706] text-white transition-colors duration-300">
      <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-10 sm:px-10 sm:pb-24 sm:pt-12 lg:px-16 lg:pb-14 lg:pr-28">
        <div className="mx-auto max-w-[1120px] text-center">
          <FooterWordmark />

          <p className="mx-auto max-w-[48ch] text-sm font-normal leading-[1.7] text-white/64">
            UI/UX designer for mobile apps, web apps, SaaS dashboards, AI products, healthcare platforms, systems, and handoff.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <LinkButton href="/contact" className="bg-white text-black hover:bg-flame hover:text-white">
              Contact Khizer
            </LinkButton>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/44">
              40+ Products Shipped <span className="mx-2 text-flame">/</span> 10M+ App Downloads
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                download={link.download ? true : undefined}
                className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/68 transition-all duration-200 hover:-translate-y-0.5 hover:border-flame hover:bg-flame hover:text-white"
              >
                <img src={link.icon} alt="" className="h-4 w-4 invert opacity-78 transition duration-200 group-hover:opacity-100" aria-hidden="true" />
                {link.label}
              </a>
            ))}
          </div>

          <nav aria-label="Footer" className="mt-10 border-t border-white/10 pt-6">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
              {SITEMAP.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="font-medium text-white/62 transition-colors duration-200 hover:text-flame">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-7 flex flex-col gap-2 text-xs font-medium uppercase tracking-[0.14em] text-white/38 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-5">
            <p>(c) 2026 Khizer Hayat</p>
            <p>Lahore, Pakistan</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

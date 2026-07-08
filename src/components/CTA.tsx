import Reveal from "./Reveal";
import behanceIcon from "../assets/icons/behance.svg";
import downloadIcon from "../assets/icons/download.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import mailIcon from "../assets/icons/mail.svg";

const CONTACT_LINKS = [
  { label: "Email", href: "/contact", icon: mailIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/khizerdesigner/", icon: linkedinIcon },
  { label: "Behance", href: "https://www.behance.net/khizerhayat8743", icon: behanceIcon },
  { label: "Download CV", href: "/khizer-hayat-cv.pdf", icon: downloadIcon, download: true },
];

export default function CTA() {
  return (
    <section id="contact" className="scroll-mt-28 bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1240px] px-6 py-16 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <Reveal>
          <div className="grid gap-8 rounded-[32px] border border-black/10 bg-white p-7 shadow-[0_24px_80px_rgba(20,10,0,0.10)] dark:border-white/10 dark:bg-coal dark:shadow-none sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:p-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-flame">Contact</p>
              <h2 className="mt-5 max-w-[13ch] font-display text-4xl font-bold leading-[0.98] tracking-normal text-ink dark:text-white sm:text-6xl">
                Let&apos;s design a product that feels ready to ship.
              </h2>
              <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-ink/65 dark:text-white/65">
                I&apos;m open to UI/UX roles, mobile app design projects, redesigns, design systems, prototypes, and developer handoff.
              </p>
            </div>

            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    download={link.download ? true : undefined}
                    className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-black/10 bg-paper px-5 py-3 text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-flame hover:bg-flame hover:text-white active:translate-y-0 dark:border-white/10 dark:bg-ink dark:text-white dark:hover:border-flame dark:hover:bg-flame dark:hover:text-white"
                  >
                    <img src={link.icon} alt="" className="h-4 w-4 shrink-0 transition duration-200 group-hover:invert dark:invert" aria-hidden="true" />
                    {link.label}
                  </a>
                ))}
              </div>
              <a href="/contact" className="mt-6 inline-flex text-sm font-semibold text-flame underline-offset-4 hover:underline">
                Open Contact Page
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

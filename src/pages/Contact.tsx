import Reveal from "../components/Reveal";
import behanceIcon from "../assets/icons/behance.svg";
import downloadIcon from "../assets/icons/download.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import mailIcon from "../assets/icons/mail.svg";

const CONTACT_LINKS = [
  { label: "Email", href: "mailto:khizer8743@gmail.com", icon: mailIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/khizerdesigner/", icon: linkedinIcon },
  { label: "Behance", href: "https://www.behance.net/khizerhayat8743", icon: behanceIcon },
  { label: "Download CV", href: "/khizer-hayat-cv.pdf", icon: downloadIcon, download: true },
];

const fieldClass =
  "min-h-13 rounded-2xl border border-black/10 bg-paper px-4 py-3 text-ink outline-none transition-all duration-200 placeholder:text-ink/35 focus:border-flame focus:bg-white focus:ring-4 focus:ring-flame/10 dark:border-white/10 dark:bg-ink dark:text-white dark:placeholder:text-white/35 dark:focus:border-flame dark:focus:bg-ink";

export default function Contact() {
  return (
    <main className="min-h-screen bg-paper pt-32 text-ink transition-colors duration-300 dark:bg-ink dark:text-white">
      <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:px-10 lg:px-16">
        <Reveal>
          <div className="overflow-hidden rounded-[36px] border border-black/10 bg-white shadow-[0_28px_90px_rgba(20,10,0,0.10)] dark:border-white/10 dark:bg-coal dark:shadow-none">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative flex min-h-[620px] flex-col justify-between bg-gradient-to-br from-accent via-flame to-[#8f1b08] p-7 text-white sm:p-10 lg:p-12">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Contact</p>
                  <h1 className="mt-6 max-w-[11ch] font-display text-5xl font-bold leading-[0.94] tracking-normal sm:text-6xl lg:text-[76px]">
                    Let&apos;s design a product that feels ready to ship.
                  </h1>
                  <p className="mt-7 max-w-[58ch] text-base leading-relaxed text-white/75 sm:text-lg">
                    I&apos;m open to UI/UX roles, mobile app design projects, redesigns, design systems, prototypes, and developer handoff.
                  </p>
                </div>

                <div className="mt-12">
                  <p className="border-t border-white/20 pt-6 text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
                    Quick links
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {CONTACT_LINKS.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        download={link.download ? true : undefined}
                        className="group inline-flex min-h-14 items-center justify-between gap-4 rounded-2xl border border-white/18 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-ink active:translate-y-0"
                      >
                        <span className="inline-flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-colors duration-200 group-hover:bg-ink group-hover:text-white">
                            <img src={link.icon} alt="" className="h-4 w-4" aria-hidden="true" />
                          </span>
                          {link.label}
                        </span>
                        <span aria-hidden="true" className="text-lg leading-none">&rarr;</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <form
                action="mailto:khizer8743@gmail.com"
                method="post"
                encType="text/plain"
                className="bg-white p-7 dark:bg-coal sm:p-10 lg:p-12"
              >
                <div className="mb-8 flex flex-col gap-4 border-b border-black/10 pb-7 dark:border-white/10 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame">Project note</p>
                    <h2 className="mt-3 font-display text-3xl font-bold leading-none text-ink dark:text-white sm:text-4xl">
                      Tell me what you&apos;re building.
                    </h2>
                  </div>
                  <p className="max-w-[24ch] text-sm leading-relaxed text-ink/55 dark:text-white/55">
                    A short note is enough to start.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold text-ink/70 dark:text-white/70">
                    Name
                    <input name="name" placeholder="Your name" className={fieldClass} />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-ink/70 dark:text-white/70">
                    Email
                    <input name="email" type="email" placeholder="you@example.com" className={fieldClass} />
                  </label>
                </div>

                <label className="mt-5 grid gap-2 text-sm font-semibold text-ink/70 dark:text-white/70">
                  Project or role
                  <input name="subject" placeholder="Mobile app, redesign, UI/UX role..." className={fieldClass} />
                </label>

                <label className="mt-5 grid gap-2 text-sm font-semibold text-ink/70 dark:text-white/70">
                  Message
                  <textarea
                    name="message"
                    rows={8}
                    placeholder="Share the goal, timeline, role, or product challenge."
                    className={`${fieldClass} resize-none leading-relaxed`}
                  />
                </label>

                <button
                  type="submit"
                  className="mt-7 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-accent px-6 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(216,72,15,0.24)] transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:bg-flame active:translate-y-0"
                >
                  Send Email
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

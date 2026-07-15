import Reveal from "./Reveal";
import MixedText from "./MixedText";

export default function CTA() {
  return (
    <section id="contact" className="scroll-mt-28 bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1240px] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-[#fbf7f1] shadow-[0_22px_70px_rgba(20,10,0,0.08)] transition-colors duration-300 dark:border-white/10 dark:bg-[#100d0b] dark:shadow-none">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,98,10,0.16),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.66),rgba(244,98,10,0.07)_42%,rgba(255,255,255,0.32))] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(244,98,10,0.24),transparent_34%),radial-gradient(circle_at_84%_82%,rgba(172,32,10,0.22),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-flame/40 to-transparent dark:via-flame/55"
            />

            <div className="relative mx-auto flex max-w-[820px] flex-col items-center px-5 py-10 text-center sm:px-8 sm:py-12 lg:py-14">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame sm:text-sm">Start a conversation</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.65rem)] font-bold leading-[1.03] tracking-normal text-ink dark:text-white">
                <MixedText text="Ready to design a product that feels ready to ship?" accent="ship" />
              </h2>
              <p className="mt-4 max-w-[64ch] text-[15px] leading-[1.7] text-ink/64 dark:text-white/64 sm:text-base">
                Get clear UI/UX direction for mobile apps, redesigns, design systems, prototypes, and developer-ready handoff.
              </p>

              <div className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <a
                  href="/contact"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_42px_rgba(20,10,0,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame active:translate-y-0 dark:bg-white dark:text-black dark:hover:bg-flame dark:hover:text-white sm:w-auto"
                >
                  Let&apos;s Talk
                </a>
                <a
                  href="/work"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-black/10 bg-white/70 px-6 py-3 text-sm font-semibold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-flame hover:text-flame active:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:border-flame dark:hover:text-flame sm:w-auto"
                >
                  View Work
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Reveal from "./Reveal";
import MixedText from "./MixedText";

export default function CTA() {
  return (
    <section id="contact" className="scroll-mt-28 bg-paper dark:bg-ink">
      <div className="mx-auto max-w-[1240px] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[26px] border border-black/10 bg-[#fbf7f1] shadow-[0_16px_48px_rgba(20,10,0,0.06)] transition-colors duration-300 dark:border-white/10 dark:bg-[#100d0b] dark:shadow-none">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.62),rgba(244,98,10,0.045)_46%,rgba(255,255,255,0.28))] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))]" />

            <div className="relative mx-auto flex max-w-[760px] flex-col items-center px-5 py-10 text-center sm:px-8 sm:py-12 lg:py-14">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-flame">Start a conversation</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.45rem)] font-bold leading-[1.04] tracking-normal text-ink dark:text-white">
                <MixedText text="Ready to shape the next product?" accent="shape" />
              </h2>
              <p className="mt-4 max-w-[46ch] text-[15px] font-normal leading-[1.7] text-ink/62 dark:text-white/62">
                Clear UI/UX direction for mobile apps, web apps, SaaS dashboards, systems, and handoff.
              </p>

              <div className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <a
                  href="/contact"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-white shadow-[0_14px_34px_rgba(20,10,0,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame active:translate-y-0 dark:bg-white dark:text-black dark:hover:bg-flame dark:hover:text-white sm:w-auto"
                >
                  Let&apos;s Talk
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
